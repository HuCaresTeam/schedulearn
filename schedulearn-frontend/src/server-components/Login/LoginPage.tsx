import React from "react";
import UserContext from "src/api-services/UserContext";
import { BrowserHistory } from "src/api-services/History";

interface LoginPageState {
  email: string;
  password: string;
}

export default class LoginPage extends React.Component<{}, LoginPageState> {
  state = { email: "", password: "" };

  componentDidMount(): void {
    UserContext
      .pingServer()
      .then(() => (this.handleResponse));
  }

  handleResponse(): void {
    console.log(`Logged in as ${UserContext.user?.name}`);
    BrowserHistory.push("/");
  }

  handleEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ email: event.target.value });
  }

  handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ password: event.target.value });
  }

  handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const email = this.state.email;
    const password = this.state.password;

    await UserContext.login(email, password);
    this.handleResponse();
  }

  render(): React.ReactNode {
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <div>
            <label>Email: </label>
            <input type="email" placeholder="name@domain.com" value={this.state.email} onChange={this.handleEmail} />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" value={this.state.password} onChange={this.handlePassword} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
