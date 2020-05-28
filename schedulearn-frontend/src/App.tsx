
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
import TeamCalandarPage from "./pages/TeamCalandarPage";
import LimitsPage from "./pages/LimitsPage";
import SuggestionsPage from "./pages/SuggestionsPage";
import UserLearningDaysByTopicView from "./server-components/Views/UserLearningDaysByTopicView";
import TeamsByTopicView from "./server-components/Views/TeamsByTopicView";
import TopicsByManagerView from "./server-components/Views/TopicsByManagerView";
import NewSuggestion from "./server-components/Suggestion/NewSuggestions";
import UserTopicTree from "./server-components/UserTopicTree";
import RegisterUser from "./server-components/RegisterUser";
import TeamTopicTree from "./server-components/TeamTopicTree";

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
            <PrivateRoute path="/team-calandar"><TeamCalandarPage /></PrivateRoute>
            <PrivateRoute path="/my-limits"><LimitsPage /></PrivateRoute>
            <PrivateRoute path="/my-suggestions"><SuggestionsPage /></PrivateRoute>
            <PrivateRoute path="/members-by-topic"><UserLearningDaysByTopicView /></PrivateRoute>
            <PrivateRoute path="/teams-by-topic"><TeamsByTopicView /></PrivateRoute>
            <PrivateRoute path="/topics-by-team"><TopicsByManagerView /></PrivateRoute>
            <PrivateRoute path="/make-suggestions"><NewSuggestion/></PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }
}