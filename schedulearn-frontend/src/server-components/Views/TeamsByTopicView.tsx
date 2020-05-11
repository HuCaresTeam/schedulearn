import React from "react";
import TopicList, { TopicListItem } from "../TopicList";
import TeamsByTopicList from "../TeamsByTopicList";
import TeamByTopic from "src/api-contract/TeamByTopic";

interface TeamsByTopicViewState {
  teams?: TeamByTopic[];
  topicId?: number;
}

export default class TeamsByTopicView extends React.Component<{}, TeamsByTopicViewState> {
  state: TeamsByTopicViewState = {};

  handleItemClick = (item: TopicListItem): void => {
    this.setState({ topicId: item.id });
    console.log(item.id);
  }

  render(): React.ReactNode {
    const teamsByTopic = this.state.topicId !== undefined ?
      (<TeamsByTopicList topicId={this.state.topicId} />) : undefined;

    return (
      <React.Fragment>
        {/* TODO: change disabled to some other way to disable Create new topic item */}
        <TopicList onItemClick={this.handleItemClick} maxHeight={250} disabled={true} />
        {teamsByTopic}
      </React.Fragment>
    );
  }
}