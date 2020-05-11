import React from "react";
import UserContext from "src/UserContext";
import User from "src/api-contract/User";
import { Team } from "src/api-contract/Team";
import UserList from "src/components/Calendar/UserList/UserList";

interface UsersInTeamListProps {
  teamId: number;
  onUserChange(userId: number): void;
}

interface UsersInTeamListState {
  users?: User[];
}

export default class UsersInTeamList extends React.Component<UsersInTeamListProps, UsersInTeamListState> {
  state: UsersInTeamListState = { users: [] }

  fetchUsersInTeam(): void {
    UserContext
      .fetch(`api/Team/${this.props.teamId}`)
      .then((response) => {
        if (!response.ok)
          return;

        return response.json();
      })
      .then((team: Team) => this.setState({ users: team.members }));
  }

  componentDidMount(): void {
    this.fetchUsersInTeam();
  }

  componentDidUpdate(prevProps: UsersInTeamListProps): void {
    if (prevProps.teamId !== this.props.teamId) {
      this.fetchUsersInTeam();
    }
  }

  render(): React.ReactNode {
    return (
      <UserList users={this.state.users ?? []} onChange={this.props.onUserChange} />
    );
  }
}
