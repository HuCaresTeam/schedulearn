import React from "react";
import CreateUserForm from "src/server-components/CreateUserForm";

export default class NewUserPage extends React.Component<{}> {
  render(): JSX.Element {
    return <CreateUserForm/>;
  }
}