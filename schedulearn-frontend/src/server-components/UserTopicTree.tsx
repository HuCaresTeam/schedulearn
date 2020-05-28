import React from "react";
import UserContext from "src/api-services/UserContext";
import { Topic } from "src/api-services/api-contract/Topic";
import TopicTree from "src/components/TopicTree/TopicTree";
import LearningDayWithUser from "src/api-services/api-contract/LearningDayWithUser";

export interface RootTopicTreeState {
  rootTopic?: Topic;
  learnedTopicIds: number[];
  height: number;
}

export default class UserTopicTree extends React.Component<{}, RootTopicTreeState> {
  state: RootTopicTreeState = {
    learnedTopicIds: [],
    height: window.innerHeight,
  }

  updateDimensions = (): void => {
    this.setState({height: window.innerHeight });
  };

  getTopicsFromRoot = (): void => {
    if (!UserContext.user) 
      return;

    UserContext
      .fetch("api/topic")
      .then((rootTopic: Topic) => {
        this.setState({ rootTopic });
      });

    UserContext
      .fetch(`api/LearningDay/User/${UserContext.user.id}`)
      .then((learningDays: LearningDayWithUser[]) => {
        let learnedTopicIds = learningDays
          .map((learningDay) => learningDay.topicId);
        learnedTopicIds = [...new Set(learnedTopicIds)];

        this.setState({ learnedTopicIds });
      });
  }

  componentDidMount(): void {
    window.addEventListener("resize", this.updateDimensions);
    this.getTopicsFromRoot();
  }

  componentWillUnmount = (): void => {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render(): React.ReactNode {
    if (!this.state.rootTopic) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div style={{maxHeight: (this.state.height - 100), overflow: "auto"}}>
        <TopicTree 
          rootTopic={this.state.rootTopic}
          learnedTopicIds={this.state.learnedTopicIds}
        />
      </div>
    );
  }
}
