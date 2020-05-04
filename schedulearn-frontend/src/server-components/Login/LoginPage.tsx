import React from "react";
import dotnetify, { dotnetifyVM } from "dotnetify";
import { UserContext, UserContextValue, User } from "../../components/Contexts/UserContext";

dotnetify.hubServerUrl = "http://localhost:5000";

interface LoginPageProps {
  user: User;
}

interface LoginPageState {
  CurrentUser?: User;
  vm?: dotnetifyVM;
  userName: string;
}

export default class LoginPage extends React.Component<{}, LoginPageState> {
  constructor(props: LoginPageProps) {
    super(props);
    this.state = { userName: "" };
  }

  private userContext?: UserContextValue;

  componentDidMount(): void {
    const vm = dotnetify.react.connect("UserBaseVM", this);
    this.setState({ vm: vm });
  }

  componentWillUnmount(): void {
    if (this.state.vm !== undefined)
      this.state.vm.$destroy();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $dispatch = (iValue: any): void => {
    if (this.state.vm !== undefined)
      this.state.vm.$dispatch(iValue);
  };

  handleUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ userName: event.target.value });
  }

  handleSetUser = (): void => {
    this.$dispatch({ SetCurrentUser: { Name: this.state.userName } });
  }

  componentDidUpdate(): void {
    if (!this.userContext || !this.state.CurrentUser)
      return;

    if (!this.userContext.user) {
      this.userContext.setUser(this.state.CurrentUser);
      return;
    }

    if (this.userContext.user.Id !== this.state.CurrentUser.Id)
      this.userContext.setUser(this.state.CurrentUser);
  }

  renderWithContext = (context: UserContextValue): React.ReactNode => {
    this.userContext = context;

    return (
      <div>
        <span>Add: </span>
        <input type="text" placeholder="User Name" value={this.state.userName} onChange={this.handleUsername} />
        <button onClick={this.handleSetUser}>Send user</button>
        <p>Current user name: {context.user ? context.user.Name : "Not logged in"}</p>
      </div>
    );
  }

  render(): React.ReactNode {

    return (
      <UserContext.Consumer>
        {this.renderWithContext}
      </UserContext.Consumer>
    );
  }
}
