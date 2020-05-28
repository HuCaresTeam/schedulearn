import React from "react";
import { Table } from "react-bootstrap";

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
        <legend className="border-bottom mb-4">{this.props.limitOrigin}</legend>
        <Table striped bordered hover style={{width: "auto"}}>
          <tbody>
            <tr>
              <td>Limit of consecutive learning days</td>
              <td>{this.props.limitOfConsecutiveLearningDays}</td>
            </tr>
            <tr>
              <td>Limit of learning days per month</td>
              <td>{this.props.limitOfLearningDaysPerMonth}</td>
            </tr>
            <tr>
              <td>Limit of learning days per quarter</td>
              <td>{this.props.limitOfLearningDaysPerQuarter}</td>
            </tr>
            <tr>
              <td>Limit of learning days per year</td>
              <td>{this.props.limitOfLearningDaysPerYear}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
