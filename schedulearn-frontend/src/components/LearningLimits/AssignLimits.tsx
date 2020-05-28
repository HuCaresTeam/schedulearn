import React from "react";
import { Limit } from "src/api-services/api-contract/Limit";
import { Form, Button } from "react-bootstrap";

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
      <Form onSubmit={this.handleSubmit}>
        <Form.Control style={{width: "300px", marginBottom: "20px"}}
          as="select"
          onChange={this.onLimitChange}
        >
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
        </Form.Control>
        <Button style={{width: "100px"}}
          type="submit" 
          disabled={!this.props.undefinedLimitEnabled && !this.state.limitId}
        > Assign</Button>
      </Form>
    );
  }
}
