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
    console.log("Paspaude " + teamId);
  }

  render(): React.ReactNode {
    const teamTopics = (<FlatTopicList topics={this.state.topics ?? []} />);

    return (
      <div>
        <ManagedTeamsSelect onTeamChange={this.handleTeamClick}/>
        {teamTopics}
      </div>
    );
  }
}
