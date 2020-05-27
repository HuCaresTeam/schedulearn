import React from "react";


export interface CreateLimitProps {
  onLimitSubmit: (event: CreateLimitState) => void;
}

export interface CreateLimitState {
  name: string;
  limitOfConsecutiveLearningDays?: number;
  limitOfLearningDaysPerMonth?: number;
  limitOfLearningDaysPerQuarter?: number;
  limitOfLearningDaysPerYear?: number;
}


export class CreateLimits extends React.Component<CreateLimitProps, CreateLimitState> {
  state: CreateLimitState = {
    name: "",
  }
  handleSubmit = (): void => {
    this.props.onLimitSubmit({
      name: this.state.name,
      limitOfConsecutiveLearningDays: this.state.limitOfConsecutiveLearningDays,
      limitOfLearningDaysPerMonth: this.state.limitOfLearningDaysPerMonth,
      limitOfLearningDaysPerQuarter: this.state.limitOfLearningDaysPerQuarter,
      limitOfLearningDaysPerYear: this.state.limitOfLearningDaysPerYear,
    });
  }

  onNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ name: event.target.value });
  }

  onLimitOfConsecutiveLearningDaysChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ limitOfConsecutiveLearningDays: parseInt(event.target.value) });
  }

  onLimitOfLearningDaysPerMonthChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ limitOfLearningDaysPerMonth: parseInt(event.target.value) });
  }

  onLimitOfLearningDaysPerQuarterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ limitOfLearningDaysPerQuarter: parseInt(event.target.value) });
  }
  
  onLimitOfLearningDaysPerYearChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ limitOfLearningDaysPerYear: parseInt(event.target.value) });
  }

  render(): JSX.Element {
    return (
      <form onSubmit={(e): void => e.preventDefault()}>
        <div>
          <label>
            Create new limit:
          </label>
          <div>
            <label>
              Name of limit 
            </label>
            <input type="text" placeholder="Limit name" onChange={this.onNameChange} value={this.state.name} />
          </div>
          <div>
            <label>
              Limit Of Consecutive Learning Days 
            </label>
            <input type="text" placeholder="Consecutive Learning Days" onChange={this.onLimitOfConsecutiveLearningDaysChange} value={this.state.limitOfConsecutiveLearningDays} />
          </div>
          <div>
            <label>
              Limit Of Learning Days Per Month 
            </label>
            <input type="text" placeholder="Per Month" onChange={this.onLimitOfLearningDaysPerMonthChange} value={this.state.limitOfLearningDaysPerMonth} />
          </div>
          <div>
            <label>
              Limit Of Learning Days Per Quarter 
            </label>
            <input type="text" placeholder="Per Quarter" onChange={this.onLimitOfLearningDaysPerQuarterChange} value={this.state.limitOfLearningDaysPerQuarter} />
          </div>
          <div>
            <label>
              Limit Of Learning Days Per Year 
            </label>
            <input type="text" placeholder="Per Year" onChange={this.onLimitOfLearningDaysPerYearChange} value={this.state.limitOfLearningDaysPerYear} />
          </div>
        </div>
        <button type="submit" onClick={this.handleSubmit}>Create</button>
      </form>

    );
  }
}
