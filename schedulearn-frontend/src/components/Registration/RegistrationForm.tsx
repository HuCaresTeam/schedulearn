import React from "react";

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

  static getDerivedStateFromProps(props: RegistrationFormProps): RegistrationFormState {
    return { name: props.name, surname: props.surname, password: "" };
  }
  
  handleSubmit = (): void => {
    this.props.onSubmitClick({
      name: this.state.name,
      surname: this.state.surname,
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
      <form onSubmit={(e): void => e.preventDefault()}>
        <div>
          <label>
            Register:
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
              Password:
            </label>
            <input type="password" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password} />
          </div>
        </div>
        <button type="submit" onClick={this.handleSubmit}>Register</button>
      </form>
    );
  }
}