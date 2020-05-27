import React from "react";
import { CreateLimitState } from "./CreateLimits";

export interface Limits extends CreateLimitState {
  limitId: number;
}

export interface AssignLimitProps {
  limits: Limits[];
  //onLimitUpdate: (event: AssignLimitState) => void;
}

// export interface CreateUserState {
//   name: string;
//   surname: string;
//   email: string;
//   jobTitleId: number;
// }
interface AssignLimitState {
  limitId: number;
  teamId: number;
  userId?: number;
 // onLimitUpdate: (event: CreateLimitState) => void;
}

export class AssignLimits extends React.Component<AssignLimitProps, AssignLimitState> {
  state: AssignLimitState = {
    limitId: 0,
    teamId: 0,
    // name: "",
    // surname: "",
    // email: "",
    // jobTitleId: 0,
  }
  public constructor(props: AssignLimitProps) {
    super(props);
  }

  handleSubmit = (): void => {
    // this.props.onLimitUpdate({
    //   limitId: this.state.limitId,
    //   teamId: this.state.teamId,
    //   userId: this.state.userId,
    // });
  }

  onLimitChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ limitId: parseInt(event.target.value) });
  }
  render(): JSX.Element {
    return (
      <form onSubmit={(e): void => e.preventDefault()}>
        <div>
          <div>
            <select id="limits" onChange={this.onLimitChange}>
              <option value = {"test"} label = "Select limit" selected disabled/>
              {this.props.limits.map((limit): React.ReactNode => {
                if(limit.name)
                  return (<option value = {limit.limitId} 
                    key = {limit.limitId} 
                    label = {limit.name + " CD:" + limit.limitOfConsecutiveLearningDays 
                  + " M:" + limit.limitOfLearningDaysPerMonth 
                  + " Q:" + limit.limitOfLearningDaysPerQuarter 
                  + " Y:" + limit.limitOfLearningDaysPerYear} 
                  />);
                else
                  return (<option value = {limit.limitId} 
                    key = {limit.limitId} 
                    label = {"CD:" + limit.limitOfConsecutiveLearningDays
                     + " M:" + limit.limitOfLearningDaysPerMonth 
                     + " Q:" + limit.limitOfLearningDaysPerQuarter 
                     + " Y:" + limit.limitOfLearningDaysPerYear} 
                  />);
              })}
            </select>
          </div>
        </div>
        <button type="submit" onClick={this.handleSubmit}>Create</button>
      </form>
    );
  }
}
