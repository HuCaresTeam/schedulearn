import React from "react";
import ManagedTeamsSelect from "./ManagedTeamsSelect";
import UsersInTeamList from "./UsersInTeamList";
import { TeamListItem } from "src/components/TeamsList/TeamList";

export interface TeamUserSelectorProps {
  onSelect: (teamId?: TeamListItem, userId?: number) => void;
}

export interface TeamUserSelectorState {
  currentTeam?: TeamListItem;
  currentUserId?: number;
}

export class TeamUserSelector extends React.Component<TeamUserSelectorProps, TeamUserSelectorState> {
  state: TeamUserSelectorState = {};

  handleTeamSelect = (team: TeamListItem): void => {
    this.props.onSelect(team, undefined);
    this.setState({ currentTeam: team, currentUserId: undefined });
  }

  handleUserSelect = (userId: number): void => {
    this.props.onSelect(this.state.currentTeam, userId);
    this.setState({ currentUserId: userId });
  }

  render(): React.ReactNode {
    let usersInTeamList;
    if (this.state.currentTeam)
      usersInTeamList = <UsersInTeamList teamId={this.state.currentTeam.teamId} onUserChange={this.handleUserSelect} />;

    return (
      <React.Fragment>
        <ManagedTeamsSelect onTeamChange={this.handleTeamSelect} />
        {usersInTeamList}
      </React.Fragment>
    );
  }
}
