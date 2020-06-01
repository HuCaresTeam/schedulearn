import React from "react";
import User from "src/api-services/api-contract/User";
import { Form } from "react-bootstrap";

interface TeamListProps {
  users: User[];
  onChange(user: User | undefined): void;
  required?: boolean;
  defaultItem?: string;
  undefinedUserDisabled?: boolean;
}

export default class UserList extends React.Component<TeamListProps, {}>{
  handleSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.currentTarget.value) {
      this.props.onChange(undefined);
      return;
    }

    const index = parseInt(e.currentTarget.value);
    this.props.onChange(this.props.users[index]);
  }

  render(): JSX.Element {
    const teamOptionsList = this.props.users.map((user, index): React.ReactNode =>
      (<option key={user.id} label={`${user.name} ${user.surname}`} value={index} />),
    );

    return <Form.Control style={{width: "300px", marginBottom: "20px"}} as="select" onChange={this.handleSelect} required={this.props.required}>
      <option label={this.props.defaultItem ?? "--Team View--"} selected disabled={this.props.undefinedUserDisabled}/>
      {teamOptionsList};
    </Form.Control>;
  }
}