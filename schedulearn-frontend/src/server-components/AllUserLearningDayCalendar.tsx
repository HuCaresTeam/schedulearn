import React from "react";
import { LearningDayCalendar } from "src/components/Calendar/LearningDayCalendar";
import UserContext from "src/UserContext";
import FlatLearningDay from "src/api-contract/FlatLearningDay";
import { LearningDayEvent } from "src/components/Calendar/EventForm";

export interface LearningDayState {
  allLearningDays?: LearningDayEvent[];
}


/** 
 * NOTE: This is a temporary component for debug purposes, hence it is copy pasted and has code duplication with UserLearningDayCalendar
 * @see UserLearningDayCalendar
 * 
 * This component will be deleted in the near future, once its replaced with Team/User viewing calendar.
*/

export class AllUserLearningDayCalendar extends React.Component<{}, LearningDayState> {
  state: LearningDayState = {};

  private learningDayToEvent(learningDay: FlatLearningDay): LearningDayEvent {
    return {
      title: learningDay.title,
      start: new Date(learningDay.dateFrom),
      end: new Date(learningDay.dateTo),
      topicId: learningDay.topicId,
      description: learningDay.description,
      userId: learningDay.userId,
    };
  }

  fetchUserLearningDays(): void {
    if (!UserContext.user)
      throw new Error("Should never reach this calendar when not logged in");

    UserContext
      .fetch("api/learningDay")
      .then((response) => {
        if (!response.ok)
          return;

        return response.json();
      })
      .then((learningDays: FlatLearningDay[]) => {
        const learninDayEvents = learningDays.map(this.learningDayToEvent);
        this.setState({ allLearningDays: learninDayEvents });
      });
  }

  componentDidMount(): void {
    this.fetchUserLearningDays();
  }

  render(): React.ReactNode {
    if (!UserContext.user || !this.state.allLearningDays) {
      return (
        <LearningDayCalendar
          learningDayEvents={[]}
          disabled={true}
        />
      );
    }

    return (
      <LearningDayCalendar
        learningDayEvents={this.state.allLearningDays}
        disabled={true}
      />
    );
  }
}
