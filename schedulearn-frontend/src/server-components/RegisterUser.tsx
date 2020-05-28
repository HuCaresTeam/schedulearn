import React from "react";
import UserContext from "src/api-services/UserContext";
import { RegistrationForm, RegistrationFormState } from "src/components/Registration/RegistrationForm";
import SimpleUser from "src/api-services/api-contract/SimpleUser";
import { BrowserHistory } from "src/api-services/History";

export interface RegisterUserState {
  user?: SimpleUser;
}

export default class RegisterUser extends React.Component<{}, RegisterUserState> {
  state: RegisterUserState = {};

  componentDidMount(): void {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const guid = params.get("id");

    if (guid === null) {
      BrowserHistory.push("/login");
      return;
    }

    UserContext
      .fetchWithoutToken(`api/User/${guid}/unregistered`)
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
        .then(() => BrowserHistory.push("/login"));
    }
  }

  render(): React.ReactNode {
    return (
      <RegistrationForm
        name={this.state.user?.name ?? ""}
        surname={this.state.user?.surname ?? ""}
        onSubmitClick={this.handleRegisterSubmit}
      />
    );
  }
}