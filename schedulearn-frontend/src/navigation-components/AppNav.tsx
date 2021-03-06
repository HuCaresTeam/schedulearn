
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
              <NavDropdown.Item href="/transfer-user">Transfer User</NavDropdown.Item>
              <NavDropdown.Item href="/manage-limits">Manage Limits</NavDropdown.Item>
              <NavDropdown.Item href="/team-calendar">Calendar</NavDropdown.Item>
              <NavDropdown.Item href="/team-learning-tree">Learning Tree</NavDropdown.Item>
              <NavDropdown.Item href="/make-suggestions">Make Suggestions</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/subordinate-learning-days">Subordinate Learning Days</NavDropdown.Item>
              <NavDropdown.Item href="/teams-by-topic">Teams That Learned a Topic</NavDropdown.Item>
              <NavDropdown.Item href="/team-learned-topics">Team Learned Topics</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <DropdownButton alignRight
            id="dropdown-menu-align-right"
            title={`${UserContext.user?.name}
           ${UserContext.user?.surname}`}
          >
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