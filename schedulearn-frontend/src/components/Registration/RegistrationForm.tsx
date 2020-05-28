import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

export interface RegistrationFormState {
  name: string;
  surname: string;
  password: string;
}

export interface RegistrationFormProps {
  name: string;
  surname: string;
  onSubmitClick(item: RegistrationFormState): void;
}

export class RegistrationForm extends React.Component<RegistrationFormProps, RegistrationFormState> {
  state: RegistrationFormState = {name: this.props.name, surname: this.props.surname, password: ""}
  
  handleSubmit = (): void => {
    this.props.onSubmitClick({
      name: this.state.name || this.props.name,
      surname: this.state.surname || this.props.surname,
      password: this.state.password,
    });
  }

  onNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ name: event.target.value });
  }

  onSurnameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ surname: event.target.value });
  }

  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ password: event.target.value });
  }

  render(): JSX.Element {
    return (
      <div>
        <legend className="border-bottom mb-4">Register</legend>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column sm="2">Name</Form.Label>
            <Col sm="10">
              <Form.Control type="text"
                placeholder={this.props.name}
                onChange={this.onNameChange}
                value={this.state.name}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">Surname</Form.Label>
            <Col sm="10">
              <Form.Control type="text"
                placeholder={this.props.surname}
                onChange={this.onSurnameChange} 
                value={this.state.surname}
                autoComplete="off"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">Password</Form.Label>
            <Col sm="10">
              <Form.Control type="password"
                placeholder="Password"
                onChange={this.onPasswordChange} 
                value={this.state.password}
                autoComplete="new-password"
                required={true}
              />
            </Col>
          </Form.Group>
          <Button style={{width: "100px"}}type="submit">Register</Button>
        </Form>
      </div>
    );
  }
}