import React from "react";
import { LearningDayContext, LearningDayContextValue } from "./LearningDayCalendarProvider";
import { LearningDayCalendar } from "src/components/Calendar/LearningDayCalendar";

export class AllUserLearningDayCalendar extends React.Component {
  renderWithinContext = (context: LearningDayContextValue): React.ReactNode => {
    return (
      <LearningDayCalendar
        learningDayEvents={context.AllLearningDays || []}
        disabled={true}
      />
    );
  }

  render(): React.ReactNode {
    return (
      <LearningDayContext.Consumer>
        {this.renderWithinContext}
      </LearningDayContext.Consumer>
    );
  }
}
