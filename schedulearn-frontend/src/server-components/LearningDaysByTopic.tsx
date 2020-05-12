import React from "react";
import WorkerList from "../components/WorkerList/WorkerList";
import UserContext from "src/api-services/UserContext";
import LearningDayWithUser from "src/api-services/api-contract/LearningDayWithUser";

interface LearningDaysByTopicProps {
  topicId: number;
}

interface LearningDaysByTopicState {
  learningDaysByTopic: LearningDayWithUser[];
}

export default class LearningDaysByTopic extends React.Component<LearningDaysByTopicProps, LearningDaysByTopicState> {
  constructor(props: LearningDaysByTopicProps) {
    super(props);
    this.state = {
      learningDaysByTopic: [],
    };
  }

  fetchLearningDaysByTopic(): void {
    if (!UserContext.user)
      throw new Error("Should never reach this calendar when not logged in");

    UserContext
      .fetch(`api/learningDay/topic/${this.props.topicId}/manager/${UserContext.user.id}`)
      .then((learningDays: LearningDayWithUser[]) => {
        this.setState({ learningDaysByTopic: learningDays });
      });
  }

  componentDidMount(): void {
    this.fetchLearningDaysByTopic();
  }

  componentDidUpdate(prevProps: LearningDaysByTopicProps): void {
    if (prevProps.topicId !== this.props.topicId) {
      this.fetchLearningDaysByTopic();
    }
  }

  render(): JSX.Element {
    return (
      <WorkerList items={this.state.learningDaysByTopic}></WorkerList>
    );
  }
}
