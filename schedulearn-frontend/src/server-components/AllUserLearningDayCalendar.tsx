import React from "react";
import { dotnetifyVM } from "dotnetify";
import { LearningDayContext, LearningDayContextValue } from "./LearningDayCalendarProvider";
import { LearningDayCalendar, LearningDay } from "src/components/Calendar/LearningDayCalendar";

export class AllUserLearningDayCalendar extends React.Component {
  $dispatch = (iValue: unknown, vm?: dotnetifyVM): void => {
    if (vm !== undefined)
      vm.$dispatch(iValue);
  };

  handleEventSubmit = (learningDay: LearningDay, vm?: dotnetifyVM): void => {
    this.$dispatch({ CreateLearningDay: learningDay }, vm);
  }

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
