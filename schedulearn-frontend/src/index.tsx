import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import TopicList from "./server-components/TopicList";
import { LearningDayCalendar } from "./server-components/LearningDayCalendar";
import LoginPage from "./components/Login/LoginPage";
import { UsernameProvider } from "./components/Contexts/UsernameContext";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <UsernameProvider>
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
              <TopicList />
            </Route>
            <Route path="/calendar">
              <LearningDayCalendar />
            </Route>
          </Switch>
        </div>
      </Router>
    </UsernameProvider> 
  </React.StrictMode>,
  document.getElementById("root"),
);

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Users() {
//   return <h2>Users</h2>;
// }


// ReactDOM.render(
//   <React.StrictMode>
//     {/* <HelloWorld /> */}
//     <NestedListExample />
//     <LearningDayCalendar />
//   </React.StrictMode>,
//   document.getElementById("root"),
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
