import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import TopicList from "./server-components/TopicList";
import TopicListProvider from "./server-components/TopicListProvider";
import { UserLearningDayCalendar } from "./server-components/UserLearningDayCalendar";
import LearningDayProvider from "./server-components/LearningDayCalendarProvider";

ReactDOM.render(
  <React.StrictMode>
    <TopicListProvider>
      <TopicList />
      <LearningDayProvider>
        <UserLearningDayCalendar />
      </LearningDayProvider>
    </TopicListProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
