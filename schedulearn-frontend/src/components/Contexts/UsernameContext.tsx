import React from "react";
import { Component } from "react";
import { User } from "../Login/LoginPage";

interface UsernameProps {
  children: React.ReactNode;
}

export interface UsernameState {
  user?: User;
  setUsername: (username: string) => void;
  setUser: (user: User) => void;
}

export const UsernameContext = React.createContext<UsernameState>({
  user: { Id: 0, Name: "name", Surname: "surname", JobTitleId: 0 },
  setUsername: (username: string) => {
    throw ReferenceError("setUsername should be defined in UsernameContext. Provided username: " + username);
  },
  setUser: (user: User) => {
    throw ReferenceError("setUser should be defined in UsernameContext. Provided user: " + user);
  },
});

export class UsernameProvider extends Component<UsernameProps> {
  state = {
    user: { Id: 0, Name: "name", Surname: "surname", JobTitleId: 0 },
  }

  setUsername = (username: string): void => {
    const user = this.state.user;
    user.Name = username;
    this.setState({
      user: user,
    });
  }

  setUser = (user: User): void => {
    this.setState({
      user: user,
    });
  }

  render(): React.ReactNode{
    return (
      <UsernameContext.Provider value={{
        user: this.state.user,
        setUsername: this.setUsername,
        setUser: this.setUser,
      }}
      >
        {this.props.children}
      </UsernameContext.Provider>
    );
  }
}