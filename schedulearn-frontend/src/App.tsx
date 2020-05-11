
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
import { PrivateRoute } from "./PrivateRoute";
import TopicsByManagerView from "./server-components/Views/TopicsByManagerView";
import LimitViewer from "./server-components/LimitViewer";
import TeamsByTopicView from "./server-components/Views/TeamsByTopicView";
import { TeamLearningDayCalendar } from "./server-components/TeamLearningDayCalendar";
import ColorTest from "./ColorTest";

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
                  <Link to="/topics_by_team">Topics by team view</Link>
                </li>
                <li>
                  <Link to="/members_by_topic">Your team members by topic view</Link>
                </li>
                <li>
                  <Link to="/teams_by_topic">Teams by topic view</Link>
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
                  <Link to="/my-limits">My Limits</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <PrivateRoute path="/topics_by_team">
                <TopicsByManagerView />
              </PrivateRoute>
              <PrivateRoute path="/members_by_topic">
                <UserLearningDaysByTopicView />
              </PrivateRoute>
              <PrivateRoute path="/teams_by_topic">
                <TeamsByTopicView/>
              </PrivateRoute>
              <Route path="/color-test">
                <ColorTest />
              </Route>
              <PrivateRoute path="/calendar">
                <UserLearningDayCalendar />
              </PrivateRoute>
              <PrivateRoute path="/my-limits">
                <LimitViewer />
              </PrivateRoute>
              <PrivateRoute path="/team-calendar">
                <TeamLearningDayCalendar />
              </PrivateRoute>
            </Switch>
          </div>
        </Router>
      </UserProvider>
    );
  }
}