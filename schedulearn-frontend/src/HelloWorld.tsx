import React from 'react';
import dotnetify, { dotnetifyVM } from 'dotnetify';

dotnetify.hubServerUrl = 'http://localhost:5000';

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

export default class HelloWorld extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { CurrentUser: { Id: 0, Name: "name", Surname: "surname", JobTitleId: 0 }, UserName: "User name" }
  }

  componentDidMount() {
    const vm = dotnetify.react.connect('UserBaseVM', this);
    this.setState({ VM: vm });
  }

  componentWillUnmount() {
    if (this.state.VM !== undefined) {
      this.state.VM.$destroy();
    }
  }

  $dispatch = (iValue: any): void => {
    if (this.state.VM !== undefined) {
      this.state.VM.$dispatch(iValue);
    }
  };

  handleUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ UserName: event.target.value })
  }

  render(): React.ReactNode {
    if (this.state.CurrentUser === undefined) {
      return (<div>Fetching data from database</div>);
    }

    return (
      <div>
        <span>Add:</span>
        <input type="text" value={this.state.UserName} onChange={this.handleUsername} />
        <button onClick={
          () => this.$dispatch({ SetCurrentUser: { Name: this.state.UserName } })
        }>
          Send user
        </button>
        <p>Current user name: {this.state.CurrentUser.Name}</p>
      </div>
    );
  }
}
