import React from "react";
//import { CreateUser, CreateUserState } from "src/components/ManagedTeam/CreateUser";
import UserContext from "src/api-services/UserContext";
import { CreateLimits, CreateLimitState } from "src/components/LearningLimits/CreateLimits";
import ManagedTeamsSelect from "./ManagedTeamsSelect";
import UsersInTeamList from "./UsersInTeamList";
import { AssignLimits, Limits } from "src/components/LearningLimits/AssignLimits";

// export interface LimitInfo {
//   name: string;
//   limitOfConsecutiveLearningDays: number;
//   limitOfLearningDaysPerMonth: number;
//   limitOfLearningDaysPerQuarter: number;
//   limitOfLearningDaysPerYear: number;
// }


export interface LimitInfoState {
  limitInfo?: Limits[];
  currentTeamId?: number;
  currentUserId?: number;
}


export default class ManageLimitsViewer extends React.Component<{}, LimitInfoState> {
  state: LimitInfoState = {}

  getLimits(): void {
    if (!UserContext.user)
      throw new Error("Should never reach Manage Limits view when not logged in");

    UserContext
      .fetch("api/Limit")
      .then((data: Limits[]) => this.setState({ limitInfo: data }));
  }

  handleTeamSelect = (teamId: number): void => {
    this.setState({ currentTeamId: teamId, currentUserId: undefined });
  }

  handleUserSelect = (userId?: number): void => {
    this.setState({ currentUserId: userId });
  }


  componentDidMount(): void {
    this.getLimits();

  }

  handleLimitSubmit = (limit: CreateLimitState): void => {
    if (!UserContext.user)
      throw new Error("Should never reach this User Form when not logged in");
    UserContext
      .fetch("api/limit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(limit),
      })
      .then(() => this.getLimits());
  }

  handleLimitUpdate = (limit: LimitInfoState): void => {
    if (!UserContext.user)
      throw new Error("Should never reach this User Form when not logged in");
    UserContext
      .fetch("api/limit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(limit),
      })
      .then(() => this.getLimits());
  }


  render(): React.ReactNode {
    let usersInTeamList;
    if (this.state.currentTeamId)
      usersInTeamList = <UsersInTeamList teamId={this.state.currentTeamId} onUserChange={this.handleUserSelect} />;
    if(this.state.limitInfo)
      return (
        
        <React.Fragment>
          <CreateLimits
            onLimitSubmit={this.handleLimitSubmit}
          />
          
          <ManagedTeamsSelect onTeamChange={this.handleTeamSelect} />
          {usersInTeamList}
          
          <AssignLimits
            limits={this.state.limitInfo}
            // onLimitUpdate={this.handleLimitUpdate}
          />
        </React.Fragment>
      );
    else
      return <></>;
  }
}
