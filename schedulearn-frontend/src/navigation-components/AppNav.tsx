
import React from "react";
import { BrowserHistory } from "../api-services/History";
import UserContext, { AuthUser } from "../api-services/UserContext";
import "./AppNav.scss";
import { Navbar, Nav, NavDropdown, DropdownButton, Dropdown } from "react-bootstrap";

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
          <Navbar.Brand href="/login">Schedulearn</Navbar.Brand>
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
        <Navbar.Brand href="/">Schedulearn</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="My Team" id="team-dropdown">
              <NavDropdown.Item href="/new-user">Create User</NavDropdown.Item>
              <NavDropdown.Item href="/manage-limits">Manage Limits</NavDropdown.Item>
              <NavDropdown.Item href="/team-calandar">Calandar</NavDropdown.Item>
              <NavDropdown.Item href="/team-learning-tree">Learning Tree</NavDropdown.Item>
              <NavDropdown.Item href="/make-suggestions">Make Suggestions</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/topics-by-team">Topics By Team</NavDropdown.Item>
              <NavDropdown.Item href="/members-by-topic">Team members By Topic</NavDropdown.Item>
              <NavDropdown.Item href="/teams-by-topic">Teams By Topic</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <DropdownButton alignRight id="dropdown-menu-align-right" title="User">
            <Dropdown.Item href="/my-limits">My Limits</Dropdown.Item>
            <Dropdown.Item href="/my-learning-tree">My Learning Tree</Dropdown.Item>
            <Dropdown.Item href="/my-suggestions">Suggestions</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/" onClick={this.logout}>Logout</Dropdown.Item>
          </DropdownButton>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}