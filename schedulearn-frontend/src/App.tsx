
import React from "react";
import TopicList from "./server-components/TopicList";

import TopicListProvider from "./server-components/TopicListProvider";
import { UserLearningDayCalendar } from "./server-components/UserLearningDayCalendar";
import LearningDayProvider from "./server-components/LearningDayCalendarProvider";
import AnalyzeData from "./server-components/AnalyzeData";
import LoginPage from "./server-components/Login/LoginPage";
import { UserProvider } from "./components/Contexts/UserContext";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { AllUserLearningDayCalendar } from "./server-components/AllUserLearningDayCalendar";

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
            <TopicListProvider>
              <LearningDayProvider>
                <Switch>
                  <Route path="/login">
                    <LoginPage />
                  </Route>
                  <Route path="/list_example">
                    <TopicList />
                    <AnalyzeData />
                  </Route>
                  <Route path="/calendar">
                    <UserLearningDayCalendar />
                  </Route>
                  <Route path="/calendar_all">
                    <AllUserLearningDayCalendar />
                  </Route>
                </Switch>
              </LearningDayProvider>
            </TopicListProvider>
          </div>
        </Router>
      </UserProvider>
    );
  }
}