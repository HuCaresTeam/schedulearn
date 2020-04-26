import React from "react";
import dotnetify, { dotnetifyVM } from "dotnetify";
import { UsernameContext } from "../Contexts/UsernameContext";
import { UsernameState } from "../Contexts/UsernameContext";

dotnetify.hubServerUrl = "http://localhost:5000";

interface State {
  CurrentUser?: User;
  VM?: dotnetifyVM;
  UserName: string;
}

interface User {
  Id: number;
  Name: string;
  Surname: string;
  JobTitleId: number;
}

export default class LoginPage extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { CurrentUser: { Id: 0, Name: "name", Surname: "surname", JobTitleId: 0 }, UserName: "User name" };
  }

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

  handleSetUsername = (context: UsernameState): void => {
    this.$dispatch({ SetCurrentUser: { Name: this.state.UserName } });
    context.setUsername(this.state.UserName);
  }

  render(): React.ReactNode {
    if (this.state.CurrentUser === undefined)
      return (<div>Fetching data from database</div>);

    return (
      <div>
        <span>Add:</span>
        
        <input type="text" value={this.state.UserName} onChange={this.handleUsername} />

        <UsernameContext.Consumer>
          {(context): React.ReactNode => (
            <React.Fragment>
              <button onClick={(): void => {this.handleSetUsername(context);}}>Send user</button>  
              <p>Data from context: {context.username}</p>
            </React.Fragment>
          )}
        </UsernameContext.Consumer>
        
        <p>Current user name: {this.state.CurrentUser.Name}</p>
      </div>
    );
  }
}
