import React from "react";
import { UserLearningDayCalendar } from "src/server-components/UserLearningDayCalendar";

export default class HomePage extends React.Component<{}> {
  render(): JSX.Element {
    return <UserLearningDayCalendar/>;
  }
}