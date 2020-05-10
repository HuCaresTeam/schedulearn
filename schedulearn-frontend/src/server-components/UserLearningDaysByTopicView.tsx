import React from "react";
import TopicList, { TopicListItem } from "./TopicList";
import LearningDaysByTopic from "./LearningDaysByTopic";

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
        <TopicList onItemClick={this.handleItemClick} />
        {workerList}
      </React.Fragment>
    );
  }
}
