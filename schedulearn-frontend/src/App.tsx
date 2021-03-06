
import React from "react";
import LoginPage from "./server-components/Login/LoginPage";

import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import "./App.scss";

import UserContext, { AuthUser } from "./api-services/UserContext";
import { BrowserHistory } from "./api-services/History";
import HomePage from "./pages/HomePage";
import AppNav from "./navigation-components/AppNav";
import AppError from "./navigation-components/AppError";
import NewUserPage from "./pages/NewUserPage";
import TeamCalendarPage from "./pages/TeamCalendarPage";
import LimitsPage from "./pages/LimitsPage";
import SuggestionsPage from "./pages/SuggestionsPage";
import UserLearningDaysByTopicView from "./server-components/Views/UserLearningDaysByTopicView";
import TeamsByTopicView from "./server-components/Views/TeamsByTopicView";
import TopicsByManagerView from "./server-components/Views/TopicsByManagerView";
import ManageLimitsPage from "./pages/ManageLimitsPage";
import NewSuggestion from "./server-components/Suggestion/NewSuggestions";
import UserTopicTree from "./server-components/UserTopicTree";
import RegisterUser from "./server-components/RegisterUser";
import "bootstrap/dist/css/bootstrap.min.css";
import TeamTopicTree from "./server-components/TeamTopicTree";
import { TransferUser } from "./server-components/ManagedTeam/TransferUser";

interface AppState {
  currentUser?: AuthUser;
  currentError?: string;
}

export default class App extends React.Component<{}, AppState> {
  state: AppState = {}

  componentDidMount(): void {
    UserContext.userObservable.subscribe((user) => this.setState({ currentUser: user }));
    UserContext.errorObservable.subscribe((error) => this.setState({ currentError: error }));
    BrowserHistory.listen(() => UserContext.setError(undefined));
  }

  logout(): void {
    UserContext.logout();
    BrowserHistory.push("/login");
  }

  render(): React.ReactNode {
    const { currentUser, currentError } = this.state;

    return (
      <Router history={BrowserHistory}>
        <AppNav currentUser={currentUser} />
        <AppError currentError={currentError} />
        <div className="page-content">
          <Switch>
            <Route path="/login"><LoginPage /></Route>
            <Route path="/register"><RegisterUser /></Route>
            <PrivateRoute exact path="/"><HomePage /></PrivateRoute>
            <PrivateRoute path="/my-learning-tree"><UserTopicTree/></PrivateRoute>
            <PrivateRoute path="/team-learning-tree"><TeamTopicTree/></PrivateRoute>
            <PrivateRoute path="/new-user"><NewUserPage /></PrivateRoute>
            <PrivateRoute path="/transfer-user"><TransferUser/></PrivateRoute>
            <PrivateRoute path="/team-calendar"><TeamCalendarPage /></PrivateRoute>
            <PrivateRoute path="/my-limits"><LimitsPage /></PrivateRoute>
            <PrivateRoute path="/my-suggestions"><SuggestionsPage /></PrivateRoute>
            <PrivateRoute path="/subordinate-learning-days"><UserLearningDaysByTopicView /></PrivateRoute>
            <PrivateRoute path="/teams-by-topic"><TeamsByTopicView /></PrivateRoute>
            <PrivateRoute path="/team-learned-topics"><TopicsByManagerView /></PrivateRoute>
            <PrivateRoute path="/manage-limits"><ManageLimitsPage /></PrivateRoute>
            <PrivateRoute path="/make-suggestions"><NewSuggestion/></PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }
}