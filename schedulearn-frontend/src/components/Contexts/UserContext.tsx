import React from "react";
import { Component } from "react";
import { User } from "../Login/LoginPage";

interface UserProps {
  children: React.ReactNode;
}

export interface UserState {
  user?: User;
  setUser: (user: User) => void;
}

export const UserContext = React.createContext<UserState>({
  user: { Id: 0, Name: "name", Surname: "surname", JobTitleId: 0 },
  setUser: (user: User) => {
    throw ReferenceError("setUser should be defined in UsernameContext. Provided user: " + user);
  },
});

export class UserProvider extends Component<UserProps> {
  state = {
    user: { Id: 0, Name: "name", Surname: "surname", JobTitleId: 0 },
  }

  setUser = (user: User): void => {
    this.setState({
      user: user,
    });
  }

  render(): React.ReactNode{
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