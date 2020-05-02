import React from "react";
import dotnetify, { dotnetifyVM } from "dotnetify";
import { UserContext } from "../Contexts/UserContext";
import { UserState } from "../Contexts/UserContext";

dotnetify.hubServerUrl = "http://localhost:5000";

interface LoginPageProps {
  user: User;
}

interface State {
  CurrentUser?: User;
  VM?: dotnetifyVM;
  UserName: string;
}

export interface User {
  Id: number;
  Name: string;
  Surname: string;
  JobTitleId: number;
}

export default class LoginPage extends React.Component<{}, State> {
  constructor(props: LoginPageProps) {
    super(props);
    this.state = { CurrentUser: { Id: 0, Name: "name", Surname: "surname", JobTitleId: 0 }, UserName: "User name" };
  }

  private userContext?: UserState;

  componentDidMount(): void {
    const vm = dotnetify.react.connect("UserBaseVM", this);
    this.setState({ VM: vm });
  }

  componentWillUnmount(): void {
    if (this.state.VM !== undefined)
      this.state.VM.$destroy();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $dispatch = (iValue: any): void => {
    if (this.state.VM !== undefined)
      this.state.VM.$dispatch(iValue);
  };

  handleUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ UserName: event.target.value });
  }

  handleSetUser = (): void => {
    this.$dispatch({ SetCurrentUser: { Name: this.state.UserName } });
  }

  componentDidUpdate(_: LoginPageProps, prevState: State): void {
    if(this.state.CurrentUser === undefined) 
      return;
    if(prevState.CurrentUser === undefined)
      return;
    if(this.userContext === undefined)
      return;

    if(prevState.CurrentUser.Id !== this.state.CurrentUser.Id) {
      this.userContext.setUser(this.state.CurrentUser);
    }
  }

  renderWithContext = (context: UserState): React.ReactNode => {
    this.userContext = context;

    return (
      <React.Fragment>
        <button onClick={(): void => {this.handleSetUser();}}>Send user</button>  
        <p>Data from context: {context.user?.Name}</p>
      </React.Fragment>
    );
  }

  render(): React.ReactNode {
    if (this.state.CurrentUser === undefined)
      return (<div>Fetching data from database</div>);

    return (
      <div>
        <span>Add:</span>
        
        <input type="text" value={this.state.UserName} onChange={this.handleUsername} />

        <UserContext.Consumer>
          {this.renderWithContext}
        </UserContext.Consumer>
        
        <p>Current user name: {this.state.CurrentUser.Name}</p>
      </div>
    );
  }
}
