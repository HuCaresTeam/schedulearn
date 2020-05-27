import React from "react";
import { Button, Form } from "react-bootstrap";

export interface JobTitle {
  id: number;
  title: string;
}
export interface CreateUserProps {
  jobTitles: JobTitle[];
  onUserSubmit: (event: CreateUserState) => void;
}

export interface CreateUserState {
  name: string;
  surname: string;
  email: string;
  jobTitleId: number;
  registerAddress: string;
}

export class CreateUser extends React.Component<CreateUserProps, CreateUserState> {
  state: CreateUserState = {
    name: "",
    surname: "",
    email: "",
    jobTitleId: 0,
    registerAddress: "",
  }
  public constructor(props: CreateUserProps) {
    super(props);
  }

  handleSubmit = (): void => {
    this.props.onUserSubmit({
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      jobTitleId: this.state.jobTitleId,
      registerAddress: "http://localhost:3000/register?id={GUID}",
    });
  }

  onNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ name: event.target.value });
  }

  onSurnameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ surname: event.target.value });
  }

  onEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ email: event.target.value });
  }
  onJobTitleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ jobTitleId: parseInt(event.target.value) });
  }
  render(): JSX.Element {
    return (<div>
      <legend className="border-bottom mb-4">Create new user:</legend>
      <Form style={{ width: "50%"}}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="Enter your name" onChange={this.onNameChange} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Surname</Form.Label>
          <Form.Control placeholder="Enter your surname" onChange={this.onSurnameChange} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" onChange={this.onEmailChange} required/>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Select job title</Form.Label>
          <Form.Control as="select" required>
            <option value = {"test"} label = "Select job title" selected disabled/>
            {this.props.jobTitles.map((title): React.ReactNode => {
              return (<option value = {title.id} key = {title.id} label = {title.title} />);
            })}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.handleSubmit}>Create</Button>
      </Form>
    </div>);
  }
}
