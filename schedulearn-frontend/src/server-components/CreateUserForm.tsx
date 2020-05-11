import React from "react";
import UserContext from "src/UserContext";
import { CreateUser, CreateUserState } from "src/components/ManagedTeam/CreateUser";


export interface JobTitle {
  id: number;
  title: string;
}
export interface JobTitleState {
  jobTitle?: JobTitle[];
}

export default class CreateUserForm extends React.Component<{}, JobTitleState> {
  state: JobTitleState = {}
  
  getJobTitles(): void {
    if (!UserContext.user)
      throw new Error("Should never reach Managed Team view when not logged in");

    UserContext
      .fetch("api/JobTitle")
      .then((response) => {
        if (!response.ok) {
          //set error
          return;
        }
        
        return response.json();
      })
      .then(
        (data: JobTitle[]) => {
          this.setState({jobTitle: data}); 
        },
      );
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
        body: JSON.stringify({...user, managingUserId: UserContext.user.id}),
      })
      .then((response) => {
        console.log("Trying post", response);
        if (!response.ok)
          return;

        this.getJobTitles();
      });
  }


  render(): React.ReactNode {   
    if(!this.state.jobTitle)
      return <></>;
    return (
      <CreateUser
        jobTitles = {this.state.jobTitle}
        onUserSubmit = {this.handleUserSubmit}
      />
    );
  }
}
