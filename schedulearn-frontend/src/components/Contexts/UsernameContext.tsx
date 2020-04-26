import React from "react";
import { Component } from "react";

interface UsernameProps {
  children: React.ReactNode;
}

export interface UsernameState {
  username: string;
  setUsername: (username: string) => void;
}

export const UsernameContext = React.createContext<UsernameState>({
  username: "not-from-state", 
  setUsername: (username: string) => {console.log("Username context has not been set yet!", username);},
});

export class UsernameProvider extends Component<UsernameProps> {
  state = {
    username: "not-yet-set",
  }

  setUsername = (username: string): void => {
    this.setState({
      username: username,
    });
  }

  render(): React.ReactNode{
    return (
      <UsernameContext.Provider value={{
        username: this.state.username,
        setUsername: this.setUsername,
      }}
      >
        {this.props.children}
      </UsernameContext.Provider>
    );
  }
}