import React from 'react';
import dotnetify from 'dotnetify';

dotnetify.hubServerUrl = 'http://localhost:5000';

interface State {
  Greetings: string;
  ServerTime: string;
  CurrentUser: User;
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
    dotnetify.react.connect('HelloWorld', this);
    this.state = { Greetings: 'The server might be currently offline', ServerTime: '', CurrentUser: { Id: 0, Name: "name", Surname: "surname", JobTitleId: 0 } };
  }

  render(): React.ReactNode {
    return (
      <div>
        <p>{this.state.Greetings}</p>
        <p>Server time is: {this.state.ServerTime}</p>
        <p>Current user name: {this.state.CurrentUser.Name}</p>
      </div>
    );
  }
}
