import React from "react";
import { Limit } from "src/api-services/api-contract/Limit";

// export interface Limits extends CreateLimitState {
//   id: number;
// }

export interface AssignLimitProps {
  limits: Limit[];
  onLimitUpdate: (limitId: number | undefined) => void;
  undefinedLimitEnabled?: boolean;
}

// export interface CreateUserState {
//   name: string;
//   surname: string;
//   email: string;
//   jobTitleId: number;
// }
export interface AssignLimitState {
  limitId?: number;
  //teamId: number;
  //userId?: number;
 // onLimitUpdate: (event: CreateLimitState) => void;
}

export class AssignLimits extends React.Component<AssignLimitProps, AssignLimitState> {
  state: AssignLimitState = {}
  
  public constructor(props: AssignLimitProps) {
    super(props);
  }

  handleSubmit = (): void => {
    //if (this.state.limitId)
    this.props.onLimitUpdate(this.state.limitId);
  }

  onLimitChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (!event.target.value) {
      this.setState({limitId: undefined});
      return;
    }
    const limitId = parseInt(event.target.value);
    this.setState({ limitId });
  }
  render(): JSX.Element {
    return (
      <form onSubmit={(e): void => e.preventDefault()}>
        <div>
          <div>
            <select id="limits" onChange={this.onLimitChange}>
              <option value = {undefined} label = "Select limit" selected disabled={!this.props.undefinedLimitEnabled}/>
              {this.props.limits.map((limit): React.ReactNode => {
                if(limit.name)
                  return (<option value = {limit.id} 
                    key = {limit.id} 
                    label = {limit.name 
                      + " CD:" + limit.limitOfConsecutiveLearningDays 
                      + " M:" + limit.limitOfLearningDaysPerMonth 
                      + " Q:" + limit.limitOfLearningDaysPerQuarter 
                      + " Y:" + limit.limitOfLearningDaysPerYear} 
                  />);
                else
                  return (<option value = {limit.id} 
                    key = {limit.id} 
                    label = {"CD:" + limit.limitOfConsecutiveLearningDays
                     + " M:" + limit.limitOfLearningDaysPerMonth 
                     + " Q:" + limit.limitOfLearningDaysPerQuarter 
                     + " Y:" + limit.limitOfLearningDaysPerYear} 
                  />);
              })}
            </select>
          </div>
        </div>
        <button type="submit" onClick={this.handleSubmit} disabled={!this.props.undefinedLimitEnabled && !this.state.limitId}>Create</button>
      </form>
    );
  }
}
