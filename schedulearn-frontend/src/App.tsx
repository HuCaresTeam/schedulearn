
import React from "react";
import TopicList from "./server-components/TopicList";

import { UserLearningDayCalendar } from "./server-components/UserLearningDayCalendar";
import WorkerListByTopicView from "./server-components/UserLearningDaysByTopicView";
import LoginPage from "./server-components/Login/LoginPage";
import { UserProvider } from "./components/Contexts/UserContext";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { AllUserLearningDayCalendar } from "./server-components/AllUserLearningDayCalendar";
import { PrivateRoute } from "./PrivateRoute";

export default class App extends React.Component {
  render(): React.ReactNode {
    return (
      <UserProvider>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/list_example">Nested List</Link>
                </li>
                <li>
                  <Link to="/calendar">Calendar</Link>
                </li>
                <li>
                  <Link to="/calendar_all">All Calendar</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <PrivateRoute path="/list_example">
                <TopicList />
                <WorkerListByTopicView />
              </PrivateRoute>
              <PrivateRoute path="/calendar">
                <UserLearningDayCalendar />
              </PrivateRoute>
              <PrivateRoute path="/calendar_all">
                <AllUserLearningDayCalendar />
              </PrivateRoute>
            </Switch>
          </div>
        </Router>
      </UserProvider>
    );
  }
}