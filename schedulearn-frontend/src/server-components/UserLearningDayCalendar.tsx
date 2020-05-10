import React from "react";
import { LearningDayCalendar } from "src/components/Calendar/LearningDayCalendar";
import UserContext from "src/UserContext";
import LearningDayWithUser from "src/api-contract/LearningDayWithUser";
import { LearningDayEvent } from "src/components/Calendar/EventForm";
import CreateNewLearningDay from "src/api-contract/CreateNewLearningDay";

export interface LearningDayState {
  userLearningDays?: LearningDayEvent[];
}

export class UserLearningDayCalendar extends React.Component<{}, LearningDayState> {
  state: LearningDayState = {};

  private learningDayToEvent(learningDay: LearningDayWithUser): LearningDayEvent {
    return {
      id: learningDay.id,
      title: learningDay.topicTilte,
      start: new Date(learningDay.dateFrom),
      end: new Date(learningDay.dateTo),
      topicId: learningDay.topicId,
      description: learningDay.description,
      userId: learningDay.userId,
    };
  }

  private eventToNewLearningDay(learningDay: LearningDayEvent): CreateNewLearningDay {
    return {
      userId: learningDay.userId,
      topicId: learningDay.topicId,
      description: learningDay.description,
      dateFrom: learningDay.start.toISOString(),
      dateTo: learningDay.end.toISOString(),
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
      .then((learningDays: LearningDayWithUser[]) => {
        const learningDayEvents = learningDays.map(this.learningDayToEvent);
        this.setState({ userLearningDays: learningDayEvents });
      });
  }

  componentDidMount(): void {
    this.fetchUserLearningDays();
  }

  handleEventSubmit = (learningDayEvent: LearningDayEvent): void => {
    const learningDay = this.eventToNewLearningDay(learningDayEvent);

    UserContext
      .fetch("api/learningDay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(learningDay),
      })
      .then((response) => {
        if (!response.ok)
          return;

        this.fetchUserLearningDays();
      });
  }

  handleEventModify = (learningDayEvent: LearningDayEvent): void => {
    const learningDay = this.eventToNewLearningDay(learningDayEvent);
    if (!learningDayEvent.id) {
      // Cannot modify without id. Set error.
      return;
    }

    UserContext
      .fetch(`api/learningDay/${learningDayEvent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: learningDay.description }),
      })
      .then((response) => {
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
        handleEventSubmit={this.handleEventSubmit}
        handleEventModify={this.handleEventModify}
        currentUserId={UserContext.user.id}
      />
    );
  }
}
