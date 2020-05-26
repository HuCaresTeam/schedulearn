import React from "react";
import { CreateUser, CreateUserState } from "src/components/ManagedTeam/CreateUser";
import UserContext from "src/api-services/UserContext";
import { Redirect } from "react-router-dom";


export interface JobTitle {
  id: number;
  title: string;
}
export interface JobTitleState {
  jobTitle?: JobTitle[];
  redirectHome: boolean;
}

export default class CreateUserForm extends React.Component<{}, JobTitleState> {
  state: JobTitleState = { redirectHome: false }

  getJobTitles(): void {
    if (!UserContext.user)
      throw new Error("Should never reach Managed Team view when not logged in");

    UserContext
      .fetch("api/JobTitle")
      .then((data: JobTitle[]) => this.setState({ jobTitle: data }));
  }

  componentDidMount(): void {
    this.getJobTitles();
  }

  handleUserSubmit = (user: CreateUserState): void => {
    if (!UserContext.user)
      throw new Error("Should never reach this User Form when not logged in");
    UserContext
      .fetch("api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user, managingUserId: UserContext.user.id }),
      })
      .then(() => this.setState({redirectHome: true}));
  }


  render(): React.ReactNode {
    if (!this.state.jobTitle)
      return <></>;
    if (this.state.redirectHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <CreateUser
        jobTitles={this.state.jobTitle}
        onUserSubmit={this.handleUserSubmit}
      />
    );
  }
}
