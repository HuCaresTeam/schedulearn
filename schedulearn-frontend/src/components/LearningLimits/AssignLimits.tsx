import React from "react";
import { Limit } from "src/api-services/api-contract/Limit";


export interface AssignLimitProps {
  limits: Limit[];
  onLimitUpdate: (limitId: number | undefined) => void;
  undefinedLimitEnabled?: boolean;
}


export interface AssignLimitState {
  limitId?: number;
}

export class AssignLimits extends React.Component<AssignLimitProps, AssignLimitState> {
  state: AssignLimitState = {}
  
  public constructor(props: AssignLimitProps) {
    super(props);
  }

  handleSubmit = (): void => {
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
              <option value = {undefined} label = "No Limit" selected disabled={!this.props.undefinedLimitEnabled}/>
              {this.props.limits.map((limit): React.ReactNode => {
                return (<option value = {limit.id} 
                  key = {limit.id} 
                  label = {`${limit.name ? `${limit.name} `: "" }`
                    + `CD: ${limit.limitOfConsecutiveLearningDays} ` 
                    + `M: ${limit.limitOfLearningDaysPerMonth} `
                    + `Q: ${limit.limitOfLearningDaysPerQuarter} `
                    + `Y: ${limit.limitOfLearningDaysPerYear} `
                  }
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
