import React from "react";
import TopicList, { TopicListItem } from "../TopicList";
import TeamsByTopicList from "../TeamsByTopicList/TeamsByTopicList";
import TeamByTopic from "src/api-services/api-contract/TeamByTopic";

interface TeamsByTopicViewState {
  teams?: TeamByTopic[];
  topicId?: number;
}

export default class TeamsByTopicView extends React.Component<{}, TeamsByTopicViewState> {
  state: TeamsByTopicViewState = {};

  handleItemClick = (item: TopicListItem): void => {
    this.setState({ topicId: item.id });
  }

  render(): React.ReactNode {
    const teamsByTopic = this.state.topicId !== undefined ?
      (<TeamsByTopicList topicId={this.state.topicId} />) : undefined;

    return (
      <React.Fragment>
        <legend className="border-bottom mb-4">Teams, that have or will learn a selected topic</legend>
        <TopicList onItemClick={this.handleItemClick} maxHeight={250} displayAddOption={false} />
        {teamsByTopic}
      </React.Fragment>
    );
  }
}