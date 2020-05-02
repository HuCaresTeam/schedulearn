import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import TopicList from "./server-components/TopicList";

import TopicListProvider from "./server-components/TopicListProvider";
import { UserLearningDayCalendar } from "./server-components/UserLearningDayCalendar";
import LearningDayProvider from "./server-components/LearningDayCalendarProvider";
import AnalyzeData from "./server-components/AnalyzeData";
import LoginPage from "./components/Login/LoginPage";
import { UserProvider } from "./components/Contexts/UserContext";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
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
            </ul>
          </nav>

          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/list_example">
              <TopicListProvider>
                <TopicList />
                <AnalyzeData/>
              </TopicListProvider>
            </Route>
            <Route path="/calendar">
              <LearningDayProvider>
                <UserLearningDayCalendar />
              </LearningDayProvider>
            </Route>
          </Switch>
        </div>
      </Router>
    </UserProvider> 
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
