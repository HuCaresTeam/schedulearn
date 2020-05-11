import React from "react";
import { TopicListItem } from "../TopicList";
import LearningDaysByTopic from "../LearningDaysByTopic";
import TopicListNoAdd from "../TopicListNoAddNew";

interface UserLearningDaysByTopicViewState {
  topicId?: number;
}

export default class UserLearningDaysByTopicView extends React.Component<{}, UserLearningDaysByTopicViewState> {
  state: UserLearningDaysByTopicViewState = {};

  handleItemClick = (item: TopicListItem): void => {
    this.setState({ topicId: item.id });
  }

  render(): React.ReactNode {
    const workerList = this.state.topicId !== undefined ?
      (<LearningDaysByTopic topicId={this.state.topicId} />) : undefined;

    return (
      <React.Fragment>
        <h1>People in your team, that have or will learn selected topic</h1>
        <TopicListNoAdd onItemClick={this.handleItemClick} maxHeight={250} />
        {workerList}
      </React.Fragment>
    );
  }
}
