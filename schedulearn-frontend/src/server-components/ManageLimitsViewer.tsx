import React from "react";
//import { CreateUser, CreateUserState } from "src/components/ManagedTeam/CreateUser";
import UserContext from "src/api-services/UserContext";
import { CreateLimits, CreateLimitState } from "src/components/LearningLimits/CreateLimits";


// export interface LimitInfo {
//   name: string;
//   limitOfConsecutiveLearningDays: number;
//   limitOfLearningDaysPerMonth: number;
//   limitOfLearningDaysPerQuarter: number;
//   limitOfLearningDaysPerYear: number;
// }
export interface LimitInfoState {
  limitInfo?: CreateLimitState[];
}

export default class ManageLimitsViewer extends React.Component<{}, LimitInfoState> {
  state: LimitInfoState = {}

  // getLimits(): void {
  //   if (!UserContext.user)
  //     throw new Error("Should never reach Manage Limits view when not logged in");

  //   UserContext
  //     .fetch("api/Limit")
  //     .then((data: CreateLimitState[]) => this.setState({ limitInfo: data }));
  // }

  componentDidMount(): void {
    //this.getLimits();
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
      });
    //.then(() => this.getLimits());
  }


  render(): React.ReactNode {
    
    return (
      <CreateLimits
        onLimitSubmit={this.handleLimitSubmit}
      />
    );
  }
}
