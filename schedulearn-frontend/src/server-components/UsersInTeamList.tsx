import React from "react";
import UserContext from "src/api-services/UserContext";
import User from "src/api-services/api-contract/User";
import { Team } from "src/api-services/api-contract/Team";
import UserList from "src/components/UserList/UserList";

interface UsersInTeamListProps {
  teamId: number;
  onUserChange(user: User | undefined): void;
  required?: boolean;
  defaultItem?: string;
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
      <UserList defaultItem={this.props.defaultItem} users={this.state.users ?? []} onChange={this.props.onUserChange} required={this.props.required} />
    );
  }
}
