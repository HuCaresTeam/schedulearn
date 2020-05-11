
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
import { TeamLearningDayCalendar } from "./server-components/TeamLearningDayCalendar";
import ColorTest from "./ColorTest";
import "./App.scss";
import HomePage from "./pages/HomePage";

export default class App extends React.Component {

  render(): React.ReactNode {
    return (
      <UserProvider>
        <Router>
          <div>
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
                  <Link to="/color-test">Color Test</Link>
                </li>
                <li>
                  <Link to="/views">Views</Link>
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
              <Route path="/home">
                <HomePage/>
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/color-test">
                <ColorTest />
              </Route>
              <PrivateRoute path="/views">
                <TopicsByManagerView />
                <UserLearningDaysByTopicView />
              </PrivateRoute>
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