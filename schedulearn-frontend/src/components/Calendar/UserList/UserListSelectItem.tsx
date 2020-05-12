import React from "react";
import User from "src/api-services/api-contract/User";

export interface UserListSelectItemProps {
  item: User;
}

export class UserListSelectItem extends React.Component<UserListSelectItemProps, {}> {
  render(): JSX.Element {
    return (
      <option label={`${this.props.item.name} ${this.props.item.surname}`} value={this.props.item.id} />
    );
  }
}