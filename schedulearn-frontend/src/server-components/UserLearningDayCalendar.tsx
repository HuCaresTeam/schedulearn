import React from "react";
import { LearningDayCalendar } from "src/components/Calendar/LearningDayCalendar";
import UserContext from "src/UserContext";
import FlatLearningDay from "src/api-contract/FlatLearningDay";
import { LearningDayEvent } from "src/components/Calendar/EventAddForm";

export interface LearningDayState {
  userLearningDays?: LearningDayEvent[];
}

export class UserLearningDayCalendar extends React.Component<{}, LearningDayState> {
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

  private eventToLearningDay(learningDay: LearningDayEvent): FlatLearningDay {
    return {
      title: learningDay.title,
      dateFrom: learningDay.start.toISOString(),
      dateTo: learningDay.end.toISOString(),
      topicId: learningDay.topicId,
      description: learningDay.description,
      userId: learningDay.userId,
    };
  }

  fetchUserLearningDays(): void {
    if (!UserContext.user)
      throw new Error("Should never reach this calendar when not logged in");

    UserContext
      .fetch(`api/learningDay/user/${UserContext.user.id}`)
      .then((response) => {
        if (!response.ok)
          return;

        return response.json();
      })
      .then((learningDays: FlatLearningDay[]) => {
        const learninDayEvents = learningDays.map(this.learningDayToEvent);
        this.setState({ userLearningDays: learninDayEvents });
      });
  }

  componentDidMount(): void {
    this.fetchUserLearningDays();
  }

  handleEventSubmit = (learningDayEvent: LearningDayEvent): void => {
    const learningDay = this.eventToLearningDay(learningDayEvent);

    UserContext
      .fetch("api/learningDay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(learningDay),
      })
      .then((response) => {
        console.log("Trying post", response);
        if (!response.ok)
          return;

        this.fetchUserLearningDays();
      });
  }

  render(): React.ReactNode {
    if (!UserContext.user || !this.state.userLearningDays) {
      return (
        <LearningDayCalendar
          learningDayEvents={[]}
          disabled={true}
        />
      );
    }

    return (
      <LearningDayCalendar
        learningDayEvents={this.state.userLearningDays}
        handleEventSubmit={(event): void => this.handleEventSubmit(event)}
        currentUserId={UserContext.user.id}
      />
    );
  }
}
