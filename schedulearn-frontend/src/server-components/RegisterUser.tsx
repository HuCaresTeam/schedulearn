import React from "react";
import UserContext from "src/api-services/UserContext";
import { RegistrationForm, RegistrationFormState } from "src/components/Registration/RegistrationForm";
import SimpleUser from "src/api-services/api-contract/SimpleUser";
import { Redirect } from "react-router-dom";

export interface RegisterUserState {
  user?: SimpleUser;
  redirectHome: boolean;
}

export default class RegisterUser extends React.Component<{}, RegisterUserState> {
  state: RegisterUserState = {redirectHome: false};

  componentDidMount(): void {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const guid = params.get("id");

    if (guid === null)
      this.setState({redirectHome: true});

    UserContext
      .fetchWithoutToken(`api/User/unregistered/${guid}`)
      .then((data: SimpleUser) => this.setState({ user: data }));
  }

  handleRegisterSubmit = (user: RegistrationFormState): void => {
    if (this.state.user !== undefined) {
      UserContext
        .fetchWithoutToken(`api/User/${this.state.user.registrationGuid}/register`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: user.name, surname: user.surname, password: user.password }),
        })
        .then(() => this.setState({redirectHome: true}));
    }
  }

  render(): React.ReactNode {
    if (!this.state.user)
      return <></>;
    if (this.state.redirectHome === true) {
      return <Redirect to="/login" />;
    }
    return (
      <RegistrationForm
        name={this.state.user.name}
        surname={this.state.user.surname}
        onSubmitClick={this.handleRegisterSubmit}
      />
    );
  }
}