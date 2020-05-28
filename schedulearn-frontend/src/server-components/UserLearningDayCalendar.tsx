import React from "react";
import { LearningDayCalendar, ColoredLearningDayEvent } from "src/components/Calendar/LearningDayCalendar";
import UserContext from "src/api-services/UserContext";
import LearningDayWithUser from "src/api-services/api-contract/LearningDayWithUser";
import { LearningDayEvent } from "src/components/Calendar/EventForm";
import CreateNewLearningDay from "src/api-services/api-contract/CreateNewLearningDay";

export interface LearningDayState {
  userLearningDays?: ColoredLearningDayEvent[];
}

export class UserLearningDayCalendar extends React.Component<{}, LearningDayState> {
  state: LearningDayState = {};

  private learningDayToEvent(learningDay: LearningDayWithUser): ColoredLearningDayEvent {
    return {
      id: learningDay.id,
      rowVersion: learningDay.rowVersion,
      title: learningDay.topicTitle,
      start: new Date(learningDay.dateFrom),
      end: new Date(learningDay.dateTo),
      topicId: learningDay.topicId,
      description: learningDay.description,
      userId: learningDay.userId,
      colorId: learningDay.userId,
    };
  }

  private eventToNewLearningDay(learningDay: LearningDayEvent): CreateNewLearningDay {
    return {
      rowVersion: learningDay.rowVersion ?? "",
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

    UserContext.fetch("api/learningDay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(learningDay),
    }).then(() => {
      this.fetchUserLearningDays();
    });
  }

  handleEventModify = (learningDayEvent: LearningDayEvent): void => {
    const learningDay = this.eventToNewLearningDay(learningDayEvent);
    if (!learningDayEvent.id || !learningDayEvent.rowVersion) {
      // Cannot modify without id. Set error.
      return;
    }

    UserContext.fetch(`api/learningDay/${learningDayEvent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rowVersion: learningDay.rowVersion, description: learningDay.description }),
    }).then(
      () => {
        this.fetchUserLearningDays();
      },
      () => {
        
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
