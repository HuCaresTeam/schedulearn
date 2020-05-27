import React from "react";

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
    return (
      <form onSubmit={(e): void => e.preventDefault()}>
        <div>
          <label>
            Create new user:
          </label>
          <div>
            <label>
              Name:
            </label>
            <input type="text" placeholder="Name" onChange={this.onNameChange} value={this.state.name} />
          </div>
          <div>
            <label>
              Surname:
            </label>
            <input type="text" placeholder="Surname" onChange={this.onSurnameChange} value={this.state.surname} />
          </div>
          <div>
            <label>
              Email:
            </label>
            <input type="email" placeholder="Email" onChange={this.onEmailChange} value={this.state.email} />
          </div>
          <div>
            <select id="jobs" onChange={this.onJobTitleChange}>
              <option value = {"test"} label = "Select job title" selected disabled/>
              {this.props.jobTitles.map((title): React.ReactNode => {
                return (<option value = {title.id} key = {title.id} label = {title.title} />);
              })}
            </select>
          </div>
        </div>
        <button type="submit" onClick={this.handleSubmit}>Create</button>
      </form>
    );
  }
}
