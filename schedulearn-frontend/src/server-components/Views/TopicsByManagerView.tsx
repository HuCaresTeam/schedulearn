import React from "react";
import ManagedTeamsSelect from "../ManagedTeamsSelect";
import FlatTopicList, { FlatTopicListItem } from "src/components/FlatTopicList/FlatTopicList";
import UserContext from "src/UserContext";

interface TopicsByManagerViewState {
  topics?: FlatTopicListItem[];
}

export default class TopicsByManagerView extends React.Component<{}, TopicsByManagerViewState> {
  state: TopicsByManagerViewState = {}

  handleTeamClick = (teamId: number): void => {
    UserContext
      .fetch(`api/Topic/team/${teamId}`)
      .then((response) => {
        if (!response.ok) {
          //set error
          return;
        }

        return response.json();
      })
      .then((teamsTopics: FlatTopicListItem[]) => {
        this.setState({ topics: teamsTopics });
      });
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <h1>Topics that were and will be learned by a selected team</h1>
        <ManagedTeamsSelect onTeamChange={this.handleTeamClick}/>
        <FlatTopicList topics={this.state.topics ?? []} />
      </React.Fragment>
    );
  }
}
