import React from "react";
import UserContext from "src/api-services/UserContext";
import User from "src/api-services/api-contract/User";
import { Team } from "src/api-services/api-contract/Team";
import UserList from "src/components/Calendar/UserList/UserList";

interface UsersInTeamListProps {
  teamId: number;
  onUserChange(userId: number | undefined): void;
}

interface UsersInTeamListState {
  users?: User[];
}

export default class UsersInTeamList extends React.Component<UsersInTeamListProps, UsersInTeamListState> {
  state: UsersInTeamListState = { users: [] }

  fetchUsersInTeam(): void {
    UserContext
      .fetch(`api/Team/${this.props.teamId}`)
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
