import React from "react";
import UserContext from "src/api-services/UserContext";
import TeamList, { TeamListItem } from "src/components/TeamsList/TeamList";

interface ManagedTeamsSelectProps {
  onTeamChange(team: TeamListItem): void;
  hidden?: boolean;
}

interface ManagedTeamsSelectState {
  teams?: TeamListItem[];
}

export default class ManagedTeamsSelect extends React.Component<ManagedTeamsSelectProps, ManagedTeamsSelectState> {
  state: ManagedTeamsSelectState = { teams: [] }

  componentDidMount(): void {
    if (UserContext.user?.id !== undefined) {
      UserContext
        .fetch(`api/Team/manager/${UserContext.user.id}/accessible`)
        .then((accessibleTeams: TeamListItem[]) => {
          this.setState({ teams: accessibleTeams });
        });
    }
  }

  render(): React.ReactNode {
    if (!this.state.teams) {
      return (
        <p>Loading</p>
      );
    }

    if (this.props.hidden) {
      return <></>;
    }
    
    return (
      <TeamList teams={this.state.teams} onChange={this.props.onTeamChange} />
    );
  }
}
