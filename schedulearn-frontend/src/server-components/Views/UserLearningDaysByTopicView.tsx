import React from "react";
import TopicList, { TopicListItem } from "../TopicList";
import LearningDaysByTopic from "../LearningDaysByTopic";
import ManagedTeamsSelect from "../ManagedTeamsSelect";
import { TeamListItem } from "src/components/TeamsList/TeamList";

interface UserLearningDaysByTopicViewState {
  topicId?: number;
  team?: TeamListItem;
}

export default class UserLearningDaysByTopicView extends React.Component<{}, UserLearningDaysByTopicViewState> {
  state: UserLearningDaysByTopicViewState = {};

  handleItemClick = (item: TopicListItem): void => {
    this.setState({ topicId: item.id });
  }

  handleTeamChange = (team: TeamListItem): void => {
    this.setState({team});
  }

  render(): React.ReactNode {
    const workerList = this.state.topicId !== undefined ?
      (<LearningDaysByTopic topicId={this.state.topicId} managerId={this.state.team?.managerId} />) : undefined;

    return (
      <React.Fragment>
        <legend className="border-bottom mb-4">People in your team, that have or will learn selected topic</legend>
        <ManagedTeamsSelect onTeamChange={this.handleTeamChange}/>
        <TopicList onItemClick={this.handleItemClick} maxHeight={250} displayAddOption={false} />
        {workerList}
      </React.Fragment>
    );
  }
}
