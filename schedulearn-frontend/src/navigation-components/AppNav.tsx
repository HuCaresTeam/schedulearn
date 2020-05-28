
import React from "react";
import { BrowserHistory } from "../api-services/History";
import UserContext, { AuthUser } from "../api-services/UserContext";
import "./AppNav.scss";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

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
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="/login">Silicone Valley Inc.</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }

    return (
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="/">Silicone Valley Inc.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="My Team" id="team-dropdown">
              <NavDropdown.Item href="/new-user">Create User</NavDropdown.Item>
              <NavDropdown.Item href="/team-calandar">Calandar</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/topics-by-team">Topics By Team</NavDropdown.Item>
              <NavDropdown.Item href="/members-by-topic">Team members By Topic</NavDropdown.Item>
              <NavDropdown.Item href="/teams-by-topic">Teams By Topic</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="User" id="user-dropdown">
              <NavDropdown.Item href="/my-limits">My Limits</NavDropdown.Item>
              <NavDropdown.Item href="/my-learning-tree">My Learning Tree</NavDropdown.Item>
              <NavDropdown.Item href="/my-suggestions">Suggestions</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/" onClick={this.logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}