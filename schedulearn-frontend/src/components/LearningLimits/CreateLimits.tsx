import React from "react";


export interface CreateLimitProps {
  onLimitSubmit: (event: CreateLimitState) => void;
}

export interface CreateLimitState {
  name?: string;
  limitOfConsecutiveLearningDays?: number;
  limitOfLearningDaysPerMonth?: number;
  limitOfLearningDaysPerQuarter?: number;
  limitOfLearningDaysPerYear?: number;
}


export class CreateLimits extends React.Component<CreateLimitProps, CreateLimitState> {
  state: CreateLimitState = {
    name: "",
  }
  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
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

  getNumberOrUndefined = (value: string): number | undefined => {
    if(!value)
      return undefined;
    return parseInt(value);
  }

  onLimitOfConsecutiveLearningDaysChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ limitOfConsecutiveLearningDays: this.getNumberOrUndefined(event.target.value) });
  }

  onLimitOfLearningDaysPerMonthChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ limitOfLearningDaysPerMonth: this.getNumberOrUndefined(event.target.value) });
  }

  onLimitOfLearningDaysPerQuarterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ limitOfLearningDaysPerQuarter: this.getNumberOrUndefined(event.target.value) });
  }
  
  onLimitOfLearningDaysPerYearChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ limitOfLearningDaysPerYear: this.getNumberOrUndefined(event.target.value) });
  }

  render(): JSX.Element {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Create new limit:
          </label>
          <div>
            <label>
              Name of limit 
            </label>
            <input type="text" 
              placeholder="Limit name" 
              onChange={this.onNameChange} 
              value={this.state.name} 
            />
          </div>
          <div>
            <label>
              Limit Of Consecutive Learning Days 
            </label>
            <input type="text" 
              placeholder="Consecutive Learning Days" 
              onChange={this.onLimitOfConsecutiveLearningDaysChange} 
              value={this.state.limitOfConsecutiveLearningDays} 
              required
            />
          </div>
          <div>
            <label>
              Limit Of Learning Days Per Month 
            </label>
            <input type="text" 
              placeholder="Per Month" 
              onChange={this.onLimitOfLearningDaysPerMonthChange} 
              value={this.state.limitOfLearningDaysPerMonth} 
              required
            />
          </div>
          <div>
            <label>
              Limit Of Learning Days Per Quarter 
            </label>
            <input type="text" 
              placeholder="Per Quarter" 
              onChange={this.onLimitOfLearningDaysPerQuarterChange} 
              value={this.state.limitOfLearningDaysPerQuarter} 
              required
            />
          </div>
          <div>
            <label>
              Limit Of Learning Days Per Year 
            </label>
            <input type="text" 
              placeholder="Per Year" 
              onChange={this.onLimitOfLearningDaysPerYearChange} 
              value={this.state.limitOfLearningDaysPerYear}
              required 
            />
          </div>
        </div>
        <button type="submit">Create</button>
      </form>

    );
  }
}
