import React from "react";
import { UserListSelectItem } from "./UserListSelectItem";
import User from "src/api-services/api-contract/User";

interface TeamListProps {
  users: User[];
  onChange(userId: number | undefined): void;
}

export default class UserList extends React.Component<TeamListProps, {}>{
  handleSelect = (e: React.FormEvent<HTMLSelectElement>): void => {
    if (!e.currentTarget.value) {
      this.props.onChange(undefined);
      return;
    }

    this.props.onChange(parseInt(e.currentTarget.value));
  }

  render(): JSX.Element {
    const teamOptionsList = this.props.users.map((user): React.ReactNode =>
      (<UserListSelectItem item={user} key={user.id} />),
    );

    return (
      <select onChange={this.handleSelect}>
        <option label="-- Team View --" selected />
        {teamOptionsList};
      </select>
    );
  }
}