import React from "react";
import { TeamListItem } from "src/components/TeamsList/TeamListSelectItem";
import UserContext from "src/UserContext";
import TeamList from "src/components/TeamsList/TeamList";

interface ManagedTeamsSelectProps {
  onTeamChange(teamId: number): void;
}

interface ManagedTeamsSelectState {
  teamId?: number;
  teams?: TeamListItem[];
}

export default class ManagedTeamsSelect extends React.Component<ManagedTeamsSelectProps, ManagedTeamsSelectState> {
  state: ManagedTeamsSelectState = {teamId: 0, teams: []}
  componentDidMount(): void {
    if (UserContext.user?.id !== undefined) {
      UserContext
        .fetch(`api/Team/manager/${UserContext.user.id}/accessible`)
        .then((response) => {
          if (!response.ok) {
          //set error
            return;
          }

          return response.json();
        })
        .then((accessibleTeams: TeamListItem[]) => {
          this.setState({teams: accessibleTeams});
        });
    }
  }
  
  handleTeamClick = (teamId: number): void => {
    this.setState({ teamId: teamId});
  }

  render(): React.ReactNode {
    if (!this.state.teams) {
      return (
        <p>Loading</p>
      );
    }
    const teamList = (<TeamList teams={this.state.teams} onChange={this.props.onTeamChange} />);

    return (
      <React.Fragment>
        {teamList}
      </React.Fragment>
    );
  }
}
