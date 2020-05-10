import React from "react";
import WorkerList from "../components/WorkerList/WorkerList";
import UserContext from "src/UserContext";
import LearningDayWithUser from "src/api-contract/LearningDayWithUser";

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
      .fetch(`api/learningDay/topic/${this.props.topicId}`)
      .then((response) => {
        if (!response.ok) {
          //set error
          return;
        }

        return response.json();
      })
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
