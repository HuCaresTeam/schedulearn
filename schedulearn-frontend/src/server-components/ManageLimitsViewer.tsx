import React from "react";
//import { CreateUser, CreateUserState } from "src/components/ManagedTeam/CreateUser";
import UserContext from "src/api-services/UserContext";
import { CreateLimits, CreateLimitState } from "src/components/LearningLimits/CreateLimits";
import ManagedTeamsSelect from "./ManagedTeamsSelect";
import UsersInTeamList from "./UsersInTeamList";
import { AssignLimits} from "src/components/LearningLimits/AssignLimits";
import { Limit } from "src/api-services/api-contract/Limit";

// export interface LimitInfo {
//   name: string;
//   limitOfConsecutiveLearningDays: number;
//   limitOfLearningDaysPerMonth: number;
//   limitOfLearningDaysPerQuarter: number;
//   limitOfLearningDaysPerYear: number;
// }


export interface LimitInfoState {
  limits?: Limit[];
  limitId?: number;
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
      .then((data: Limit[]) => this.setState({ limits: data }));
  }

  getLimit(): void {
    if (!UserContext.user)
      throw new Error("Should never reach Manage Limits view when not logged in");

    UserContext
      .fetch(`api/user/${this.state.limitId}`)
      .then((data: Limit[]) => this.setState({ limits: data }));
    
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

  // handleLimit = (limit: AssignLimitState): void => {
  //   if (!UserContext.user)
  //     throw new Error("Should never reach this User Form when not logged in");
  //   this.setState({ limitId: limit.limitId});
  //   if(this.state.currentUserId)
  //   {
  //     UserContext
  //       .fetch(`api/User/${this.state.currentUserId}/limits`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(limit),
  //       })
  //       .then(() => this.getLimits());
  //   }
    
  // }

  handleLimitUpdate = (limitId: number | undefined): void => {
    if (!UserContext.user)
      throw new Error("Should never reach this User Form when not logged in");
    //console.log(this.state.currentUserId);
    if(this.state.currentUserId === undefined)
    {
      UserContext
        .fetch(`api/Team/${this.state.currentTeamId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({limitId}),
        })
        .then(() => this.getLimits());
    }
    else
    {
      UserContext
        .fetch(`api/User/${this.state.currentUserId}/limits`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({limitId}),
        })
        .then(() => this.getLimits());
    }
    
  }


  render(): React.ReactNode {
    let usersInTeamList;
    if (this.state.currentTeamId)
      usersInTeamList = <UsersInTeamList teamId={this.state.currentTeamId} onUserChange={this.handleUserSelect} />;
    if(this.state.limits)
      return (
        
        <React.Fragment>
          <CreateLimits
            onLimitSubmit={this.handleLimitSubmit}
          />
          
          <ManagedTeamsSelect onTeamChange={this.handleTeamSelect} />
          {usersInTeamList}
          
          <AssignLimits
            limits={this.state.limits}
            onLimitUpdate={this.handleLimitUpdate}
            undefinedLimitEnabled={!!this.state.currentUserId}
          />
        </React.Fragment>
      );
    else
      return <></>;
  }
}
