import React from "react";
import { LearningDayCalendar, ColoredLearningDayEvent } from "src/components/Calendar/LearningDayCalendar";
import UserContext from "src/api-services/UserContext";
import LearningDayWithUser from "src/api-services/api-contract/LearningDayWithUser";
import { LearningDayEvent } from "src/components/Calendar/EventForm";
import CreateNewLearningDay from "src/api-services/api-contract/CreateNewLearningDay";
import { CustomModal } from "src/components/Modal/CustomModal";
import { Button } from "react-bootstrap";

export interface LearningDayState {
  userLearningDays?: ColoredLearningDayEvent[];
  learningDayForConcurency?: LearningDayEvent;
  isConcurencyResolverOpen: boolean;
}

export class UserLearningDayCalendar extends React.Component<{}, LearningDayState> {
  state: LearningDayState = {
    isConcurencyResolverOpen: false,
  };

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
      timezoneMinutes: learningDay.start.getTimezoneOffset() * -1,
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

  handleEventDelete = (learningDayEvent: LearningDayEvent): void => {
    UserContext.fetch(`api/learningDay/${learningDayEvent.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      this.fetchUserLearningDays();
    });
  }

  modifylearningDay = (learningDayEvent: LearningDayEvent, forceWrite: boolean): void => {
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
      body: JSON.stringify({ rowVersion: learningDay.rowVersion, description: learningDay.description, forceWrite }),
    }).then(
      () => this.fetchUserLearningDays(), 
      (reject: {statusCode: number}) => this.handleReject(learningDayEvent, reject.statusCode),
    );
  }

  handleReject = (learningDayEvent: LearningDayEvent, statusCode: number): void => {
    // Handle Optimistic Lock Conflict
    if(statusCode === 409) {
      this.openConcurencyResolver(learningDayEvent);
    }
  }

  handleEventModify = (learningDayEvent: LearningDayEvent): void => {
    this.modifylearningDay(learningDayEvent, false);
  }

  openConcurencyResolver = (learningDay: LearningDayEvent): void => {
    this.setState({isConcurencyResolverOpen: true, learningDayForConcurency: learningDay});
  }

  onConcurencyResolverClose = (): void => {
    this.setState({isConcurencyResolverOpen: false});
  }

  onRefresh = (): void => {
    this.fetchUserLearningDays();
    this.onConcurencyResolverClose();
  }
  
  onOverride = (): void => {
    if (!this.state.learningDayForConcurency)
      return;

    this.modifylearningDay(this.state.learningDayForConcurency, true);
    this.onConcurencyResolverClose();
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
      <React.Fragment>
        <CustomModal
          title="Concurency Resolver"
          isOpen={this.state.isConcurencyResolverOpen}
          onRequestClose={this.onConcurencyResolverClose}
        >
          {(): React.ReactNode => (
            <div className="text-center">
              <Button className="mr-3"
                size="lg"
                variant="primary"
                type="button"
                onClick={this.onRefresh}
              >
                Refresh
              </Button>
              <Button className="ml-3"
                size="lg"
                variant="warning"
                type="button"
                onClick={this.onOverride}
              >
                Override
              </Button>
            </div>
          )}
        </CustomModal>
  
        <LearningDayCalendar
          learningDayEvents={this.state.userLearningDays}
          handleEventSubmit={this.handleEventSubmit}
          handleEventModify={this.handleEventModify}
          handleEventDelete={this.handleEventDelete}
          currentUserId={UserContext.user.id}
        />
      </React.Fragment>
    );
  }
}
