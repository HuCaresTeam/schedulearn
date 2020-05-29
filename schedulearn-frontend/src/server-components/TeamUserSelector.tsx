import React from "react";
import ManagedTeamsSelect from "./ManagedTeamsSelect";
import UsersInTeamList from "./UsersInTeamList";
import { TeamListItem } from "src/components/TeamsList/TeamList";
import User from "src/api-services/api-contract/User";

export interface TeamUserSelectorProps {
  onSelect: (team?: TeamListItem, user?: User) => void;
  required?: boolean;
  userDefaultItem?: string;
  teamDefaultItem?: string;
}

export interface TeamUserSelectorState {
  currentTeam?: TeamListItem;
}

export class TeamUserSelector extends React.Component<TeamUserSelectorProps, TeamUserSelectorState> {
  state: TeamUserSelectorState = {};

  handleTeamSelect = (team: TeamListItem): void => {
    this.props.onSelect(team, undefined);
    this.setState({ currentTeam: team });
  }

  handleUserSelect = (user: User | undefined): void => {
    this.props.onSelect(this.state.currentTeam, user);
  }

  render(): React.ReactNode {
    let usersInTeamList;
    if (this.state.currentTeam)
      usersInTeamList = <UsersInTeamList
        defaultItem={this.props.userDefaultItem} 
        teamId={this.state.currentTeam.teamId}
        onUserChange={this.handleUserSelect}
        required={this.props.required}
      />;

    return (
      <React.Fragment>
        <ManagedTeamsSelect defaultItem={this.props.teamDefaultItem} 
          onTeamChange={this.handleTeamSelect}
          required={this.props.required}
        />
        {usersInTeamList}
      </React.Fragment>
    );
  }
}
