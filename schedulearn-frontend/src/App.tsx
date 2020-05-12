
import React from "react";
import { UserLearningDayCalendar } from "./server-components/UserLearningDayCalendar";
import UserLearningDaysByTopicView from "./server-components/Views/UserLearningDaysByTopicView";
import LoginPage from "./server-components/Login/LoginPage";

import {
  Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import TopicsByManagerView from "./server-components/Views/TopicsByManagerView";
import LimitViewer from "./server-components/LimitViewer";
import TeamsByTopicView from "./server-components/Views/TeamsByTopicView";
import { TeamLearningDayCalendar } from "./server-components/TeamLearningDayCalendar";
import Suggestions from "./server-components/Suggestions";
import ColorTest from "./ColorTest";
import "./App.scss";

import UserContext, { AuthUser } from "./api-services/UserContext";
import { BrowserHistory } from "./api-services/History";
import HomePage from "./pages/HomePage";
import CreateUserForm from "./server-components/CreateUserForm";

interface AppState {
  currentUser?: AuthUser;
}

export default class App extends React.Component<{}, AppState> {
  state = {}

  componentDidMount(): void {
    UserContext.userObservable.subscribe((user) => this.setState({ currentUser: user }));
  }

  logout(): void {
    UserContext.logout();
    BrowserHistory.push("/login");
  }

  render(): React.ReactNode {
    return (
      <Router history={BrowserHistory}>
        <nav className="nav-bar">
          <ul className="menu">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li className="dropdown">
              <Link to="">My Team</Link>
              <ul className="submenu">
                <li>
                  <Link to="">Create user</Link>
                </li>
                <li>
                  <Link to="">Calendar</Link>
                </li>
                <li className="dropdown">
                  <Link to="">Views</Link>
                  <ul className="submenu">
                    <li className="dropdown">
                      <Link to="">View 1</Link>
                    </li>
                    <li>
                      <Link to="">View 2</Link>
                    </li>
                    <li>
                      <Link to="">View3</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/topics-by-team">Topics by team view</Link>
            </li>
            <li>
              <Link to="/members-by-topic">Your team members by topic view</Link>
            </li>
            <li>
              <Link to="/teams-by-topic">Teams by topic view</Link>
            </li>
            <li>
              <Link to="/color-test">Color Test</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
            <li>
              <Link to="/team-calendar">Team Calendar</Link>
            </li>
            <li>
              <Link to="/user-creation">Create User</Link>
            </li>
            <li>
              <Link to="/my-limits">My Limits</Link>
            </li>
            <li>
              <Link to="/my-suggestions">My Suggestions</Link>
            </li>
            <li>
              <a onClick={this.logout} className="nav-item nav-link">Logout</a>
            </li>
          </ul>
        </nav>
        <div className="page-content">
          <Switch>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/color-test">
              <ColorTest />
            </Route>
            <PrivateRoute path="/members-by-topic">
              <UserLearningDaysByTopicView />
            </PrivateRoute>
            <PrivateRoute path="/teams-by-topic">
              <TeamsByTopicView />
            </PrivateRoute>
            <PrivateRoute path="/topics-by-team">
              <TopicsByManagerView />
            </PrivateRoute>
            <PrivateRoute path="/calendar">
              <UserLearningDayCalendar />
            </PrivateRoute>
            <PrivateRoute path="/user-creation">
              <CreateUserForm />
            </PrivateRoute>
            <PrivateRoute path="/my-limits">
              <LimitViewer />
            </PrivateRoute>
            <PrivateRoute path="/team-calendar">
              <TeamLearningDayCalendar />
            </PrivateRoute>
            <PrivateRoute path="/my-suggestions">
              <Suggestions />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }
}