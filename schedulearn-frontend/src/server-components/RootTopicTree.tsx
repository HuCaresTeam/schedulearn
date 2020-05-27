import React from "react";
import UserContext from "src/api-services/UserContext";
import { Topic } from "src/api-services/api-contract/Topic";
import TopicTree from "src/components/TopicTree/TopicTree";

export interface RootTopicTreeState {
  rootTopic?: Topic;
}

export default class RootTopicTree extends React.Component<{}, RootTopicTreeState> {
  state: RootTopicTreeState = {}

  getTopicsFromRoot = (): void => {
    UserContext
      .fetch("api/topic")
      .then((rootTopic: Topic) => {
        this.setState({ rootTopic });
      });
  }

  componentDidMount(): void {
    this.getTopicsFromRoot();
  }

  render(): React.ReactNode {
    if (!this.state.rootTopic) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <TopicTree rootTopic={this.state.rootTopic}/>
    );
  }
}
