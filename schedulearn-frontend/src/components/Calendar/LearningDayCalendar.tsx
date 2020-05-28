import React from "react";
import { WeekViewCalendar } from "./WeekViewCalendar";
import { SlotInfo } from "react-big-calendar";
import { EventModal } from "./EventModal";
import { LearningDayEvent, EventForm } from "./EventForm";
import AtLeast from "src/utils/AtLeast";

export interface LearningDayCalendarPropsBase {
  learningDayEvents: ColoredLearningDayEvent[];
}

export interface LearningDayCalendarPropsDisabled extends LearningDayCalendarPropsBase {
  disabled: true;
}

export interface LearningDayCalendarPropsEnabled extends LearningDayCalendarPropsBase {
  disabled: false | undefined;
  currentUserId: number;
  handleEventSubmit: (learningDay: LearningDayEvent) => void;
  handleEventModify: (learningDay: LearningDayEvent) => void;
}

type LearningDayCalendarProps = LearningDayCalendarPropsEnabled | LearningDayCalendarPropsDisabled

interface LearningDayCalendarState {
  isEventModalOpen: boolean;
  isExistingEventOpened: boolean;
  currentEvent?: AtLeast<LearningDayEvent, "start" | "end" | "userId">;
}

export interface ColoredLearningDayEvent extends LearningDayEvent {
  colorId: number;
}

export class LearningDayCalendar extends React.Component<LearningDayCalendarProps, LearningDayCalendarState> {
  public state: LearningDayCalendarState = {
    isEventModalOpen: false,
    isExistingEventOpened: true,
  }

  static defaultProps = {
    disabled: false,
  }

  handleSelectSlot = (slotInfo: SlotInfo): void => {
    if (this.props.disabled)
      return;

    if (typeof slotInfo.start === "string")
      slotInfo.start = new Date(slotInfo.start);

    if (typeof slotInfo.end === "string")
      slotInfo.end = new Date(slotInfo.end);

    this.setState(
      {
        isEventModalOpen: true,
        isExistingEventOpened: false,
        currentEvent: {
          start: slotInfo.start,
          end: slotInfo.end,
          userId: this.props.currentUserId,
        },
      });
  }

  handleEventSubmit = (event: LearningDayEvent): void => {
    if (this.props.disabled)
      return;

    if (this.state.isExistingEventOpened) {
      this.props.handleEventModify(event);
    } else {
      this.props.handleEventSubmit(event);
    }

    this.setState({ isEventModalOpen: false });
  }

  handleModalClose = (): void => {
    this.setState({ isEventModalOpen: false });
  }

  handleSelectEvent = (event: LearningDayEvent): void => {
    this.setState(
      {
        isEventModalOpen: true,
        isExistingEventOpened: true,
        currentEvent: event,
      });
  }

  render(): React.ReactNode {
    const disabledForms = {
      topicPickDisabled: this.props.disabled || this.state.isExistingEventOpened,
      datePickDisabled: this.props.disabled || this.state.isExistingEventOpened,
      descriptionDisabled: this.props.disabled,
    };

    return (
      <React.Fragment>
        <EventModal
          isOpen={this.state.isEventModalOpen}
          onRequestClose={this.handleModalClose}
        >
          {(isOpen): React.ReactNode => (
            <EventForm
              isOpen={isOpen}
              onEventSubmit={this.handleEventSubmit}
              learningDayEvent={this.state.currentEvent}
              disabledForms={disabledForms}
              submitText={this.state.isExistingEventOpened ? "Modify" : "Submit"}
            />)
          }
        </EventModal>
        <WeekViewCalendar
          events={this.props.learningDayEvents}
          onSelectSlot={this.handleSelectSlot}
          onSelectEvent={this.handleSelectEvent}
          mergeEveryHalfHour={2}
          disabled={this.props.disabled}
        />
      </React.Fragment>
    );
  }
}
