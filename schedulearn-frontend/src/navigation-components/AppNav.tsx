
import React from "react";
import { BrowserHistory } from "../api-services/History";
import UserContext, { AuthUser } from "../api-services/UserContext";
import NavItem from "./NavItem";
import "./AppNav.scss";

export interface AppProps {
  currentUser?: AuthUser;
}

export default class AppNav extends React.Component<AppProps> {
  logout(): void {
    UserContext.logout();
    BrowserHistory.push("/login");
  }

  render(): React.ReactNode {
    if (!this.props.currentUser) {
      return (
        <nav className="nav-bar">
          <ul className="menu">
            <NavItem to="/login">Login</NavItem>
          </ul>
        </nav>
      );
    }

    return (
      <nav className="nav-bar">
        <ul className="menu">
          <NavItem to="/">Home</NavItem>
          <li className="dropdown">
            <NavItem to="">My Team</NavItem>
            <ul className="submenu">
              <NavItem to="/new-user">Create User</NavItem>
              <NavItem to="/team-calandar">Calendar</NavItem>
              <li className="dropdown">
                <NavItem to="">Views</NavItem>
                <ul className="submenu">
                  <NavItem to="">View 1</NavItem>
                  <NavItem to="">View 2</NavItem>
                  <NavItem to="">View 3</NavItem>
                </ul>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <NavItem to="">User</NavItem>
            <ul className="submenu">
              <NavItem to="/my-limits">My Limits</NavItem>
              <NavItem to="/my-suggestions">Suggestions</NavItem>
              <NavItem to="/">Logout</NavItem>
            </ul>
          </li>
          <NavItem to="/topics-by-team">Topics by team view</NavItem>
          <NavItem to="/members-by-topic">Your team members by topic view</NavItem>
          <NavItem to="/teams-by-topic">Teams by topic view</NavItem>
          <NavItem to="/color-test">Color Test</NavItem>
          <NavItem to="/calendar">Calendar</NavItem>
          <NavItem to="/team-calendar">Team Calendar</NavItem>
          <NavItem to="/user-creation">Create User</NavItem>
          <NavItem to="/my-limits">My Limits</NavItem>
          <NavItem to="/my-suggestions">My Suggestions</NavItem>
          <NavItem to="/" onClick={this.logout}>Logout</NavItem>
        </ul>
      </nav>
    );
  }
}