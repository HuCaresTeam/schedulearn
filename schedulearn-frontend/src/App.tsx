
import React from "react";
import { UserLearningDayCalendar } from "./server-components/UserLearningDayCalendar";
import UserLearningDaysByTopicView from "./server-components/Views/UserLearningDaysByTopicView";
import LoginPage from "./server-components/Login/LoginPage";

import {
  Router,
  Switch,
  Route,
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
import AppNav from "./navigation-components/AppNav";

interface AppState {
  currentUser?: AuthUser;
}

export default class App extends React.Component<{}, AppState> {
  state: AppState = {}

  componentDidMount(): void {
    UserContext.userObservable.subscribe((user) => this.setState({ currentUser: user }));
  }

  logout(): void {
    UserContext.logout();
    BrowserHistory.push("/login");
  }

  render(): React.ReactNode {
    const { currentUser } = this.state;

    return (
      <Router history={BrowserHistory}>
        <AppNav currentUser={currentUser} />
        <div className="page-content">
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute exact path="/">
              <HomePage />
            </PrivateRoute>
            <PrivateRoute path="/color-test">
              <ColorTest />
            </PrivateRoute>
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