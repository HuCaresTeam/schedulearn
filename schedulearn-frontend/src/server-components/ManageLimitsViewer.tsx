import React from "react";
//import { CreateUser, CreateUserState } from "src/components/ManagedTeam/CreateUser";
import UserContext from "src/api-services/UserContext";
import { CreateLimits, CreateLimitState } from "src/components/LearningLimits/CreateLimits";
import ManagedTeamsSelect from "./ManagedTeamsSelect";
import UsersInTeamList from "./UsersInTeamList";
import { AssignLimits} from "src/components/LearningLimits/AssignLimits";
import { Limit } from "src/api-services/api-contract/Limit";
import { TeamListItem } from "src/components/TeamsList/TeamList";
import User from "src/api-services/api-contract/User";


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


  handleTeamSelect = (team: TeamListItem): void => {
    this.setState({ currentTeamId: team.teamId, currentUserId: undefined });
  }

  handleUserSelect = (user?: User): void => {
    this.setState({ currentUserId: user?.id });
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


  handleLimitUpdate = (limitId: number | undefined): void => {
    if (!UserContext.user)
      throw new Error("Should never reach this User Form when not logged in");
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

          <legend className="border-bottom mb-4">Assign Limit</legend>
          <ManagedTeamsSelect onTeamChange={this.handleTeamSelect} />
          {usersInTeamList}
          
          <AssignLimits
            limits={this.state.limits}
            onLimitUpdate={this.handleLimitUpdate}
            undefinedLimitEnabled={!!this.state.currentUserId}
            disabled={!this.state.currentTeamId}
          />
        </React.Fragment>
      );
    else
      return <></>;
  }
}
