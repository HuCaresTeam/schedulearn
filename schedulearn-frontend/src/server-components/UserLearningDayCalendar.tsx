import React from "react";
import { dotnetifyVM } from "dotnetify";
import { LearningDayContext, LearningDayProviderState } from "./LearningDayCalendarProvider";
import { LearningDayCalendar, LearningDay } from "src/components/LearningDayCalendar";

export class UserLearningDayCalendar extends React.Component {
  $dispatch = (iValue: unknown, vm?: dotnetifyVM): void => {
    if (vm !== undefined)
      vm.$dispatch(iValue);
  };

  handleEventSubmit = (learningDay: LearningDay, vm?: dotnetifyVM): void => {
    this.$dispatch({ CreateLearningDay: learningDay }, vm);
  }

  renderWithinContext = (context: LearningDayProviderState): React.ReactNode => {
    return (
      <LearningDayCalendar
        learningDayEvents={context.UserLearningDays || []}
        handleEventSubmit={(event): void => this.handleEventSubmit(event, context.vm)}
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
