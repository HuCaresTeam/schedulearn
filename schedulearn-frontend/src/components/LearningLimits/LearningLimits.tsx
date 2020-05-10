import React from "react";


interface LearningLimitsProps {
  limitOrigin: string;
  limitOfConsecutiveLearningDays: number;
  limitOfLearningDaysPerMonth: number;
  limitOfLearningDaysPerQuarter: number;
  limitOfLearningDaysPerYear: number;
}

export class LearningLimits extends React.Component<LearningLimitsProps> {
  public constructor(props: LearningLimitsProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="user-limits">
        <div>{this.props.limitOrigin}</div>
        <div>Limit of consecutive learning days</div><div>{this.props.limitOfConsecutiveLearningDays}</div>
        <div>Limit of learning days per month</div><div>{this.props.limitOfLearningDaysPerMonth}</div>
        <div>Limit of learning days per quarter</div><div>{this.props.limitOfLearningDaysPerQuarter}</div>
        <div>Limit of learning days per year</div><div>{this.props.limitOfLearningDaysPerYear}</div>
      </div>

    );
  }
}
