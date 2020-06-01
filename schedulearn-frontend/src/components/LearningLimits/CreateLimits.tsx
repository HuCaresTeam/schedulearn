import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

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
      <Form onSubmit={this.handleSubmit} style={{marginBottom: "20px"}}>
        <legend className="border-bottom mb-4">Create new limit</legend>
        <Form.Group as={Row}>
          <Form.Label column sm="2">Name of limit</Form.Label>
          <Col sm="10">
            <Form.Control type="text" 
              placeholder="Limit name" 
              onChange={this.onNameChange} 
              value={this.state.name}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">Limit Of Consecutive Learning Days</Form.Label>
          <Col sm="10">
            <Form.Control type="number" 
              placeholder="Consecutive Learning Days" 
              onChange={this.onLimitOfConsecutiveLearningDaysChange} 
              value={this.state.limitOfConsecutiveLearningDays} 
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">Limit Of Learning Days Per Month</Form.Label>
          <Col sm="10">
            <Form.Control type="number" 
              placeholder="Per Month" 
              onChange={this.onLimitOfLearningDaysPerMonthChange} 
              value={this.state.limitOfLearningDaysPerMonth} 
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">Limit Of Learning Days Per Quarter</Form.Label>
          <Col sm="10">
            <Form.Control type="number" 
              placeholder="Per Quarter" 
              onChange={this.onLimitOfLearningDaysPerQuarterChange} 
              value={this.state.limitOfLearningDaysPerQuarter} 
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">Limit Of Learning Days Per Year</Form.Label>
          <Col sm="10">
            <Form.Control type="number" 
              placeholder="Per Year" 
              onChange={this.onLimitOfLearningDaysPerYearChange} 
              value={this.state.limitOfLearningDaysPerYear}
              required 
            />
          </Col>
        </Form.Group>
        <Button style={{width: "100px"}} type="submit">Create</Button>
      </Form>
    );
  }
}
