import React from "react";
import { Component } from "react";

interface UserProps {
  children: React.ReactNode;
}

export interface User {
  Id: number;
  Name: string;
  Surname: string;
  JobTitleId: number;
}

export interface UserState {
  user?: User;
}

export interface UserContextValue extends UserState {
  setUser: (user: User) => void;
}

export const UserContext = React.createContext<UserContextValue>({
  setUser: (user: User) => {
    throw ReferenceError("setUser should be defined in UsernameContext. Provided user: " + user);
  },
});

export class UserProvider extends Component<UserProps, UserState> {
  state: UserState = {}

  setUser = (user: User): void => {
    this.setState({
      user: user,
    });
  }

  render(): React.ReactNode {
    return (
      <UserContext.Provider value={{
        user: this.state.user,
        setUser: this.setUser,
      }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}