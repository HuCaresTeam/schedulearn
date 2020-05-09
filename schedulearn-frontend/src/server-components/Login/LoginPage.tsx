import React from "react";
import UserContext from "src/UserContext";
import { isOkStatus, HttpStatusCode } from "src/HttpStatusCode";

interface LoginPageState {
  email: string;
  password: string;
}

export default class LoginPage extends React.Component<{}, LoginPageState> {
  state = { email: "", password: "" };

  componentDidMount(): void {
    UserContext.pingServer()
      .then(this.handleResponse);
  }

  handleResponse(status: HttpStatusCode): void {
    if (!isOkStatus(status)) {
      // Auth failed. Stay in login page.
      console.log(`Need to log in ${HttpStatusCode[status]}`);
      return;
    }

    // Redirect to home page.
    console.log(`Logged in as ${UserContext.user?.name}`);
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

    const status = await UserContext.login(email, password);
    this.handleResponse(status);
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
