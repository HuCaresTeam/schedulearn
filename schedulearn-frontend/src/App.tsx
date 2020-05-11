
import React from "react";
import { UserLearningDayCalendar } from "./server-components/UserLearningDayCalendar";
import UserLearningDaysByTopicView from "./server-components/Views/UserLearningDaysByTopicView";
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
import TopicsByManagerView from "./server-components/Views/TopicsByManagerView";
import LimitViewer from "./server-components/LimitViewer";
import TeamsByTopicView from "./server-components/Views/TeamsByTopicView";

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
                <li>
                  <Link to="/my_limits">My Limits</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <PrivateRoute path="/list_example">
                <TopicsByManagerView />
                <UserLearningDaysByTopicView />
                <TeamsByTopicView/>
              </PrivateRoute>
              <PrivateRoute path="/calendar">
                <UserLearningDayCalendar />
              </PrivateRoute>
              <PrivateRoute path="/calendar_all">
                <AllUserLearningDayCalendar />
              </PrivateRoute>
              <PrivateRoute path="/my_limits">
                <LimitViewer />
              </PrivateRoute>
            </Switch>
          </div>
        </Router>


      </UserProvider>
    );
  }
}