import React from "react";
import { WeekViewCalendar } from "./WeekViewCalendar";
import { SlotInfo } from "react-big-calendar";
import { EventAddModal } from "./EventAddModal";
import { LearningDayEvent } from "./EventAddForm";
import AtLeast from "src/util-types/AtLeast";

export interface LearningDayCalendarPropsBase {
  learningDayEvents: LearningDayEvent[];
}

export interface LearningDayCalendarPropsDisabled extends LearningDayCalendarPropsBase {
  disabled: true;
}

export interface LearningDayCalendarPropsEnabled extends LearningDayCalendarPropsBase {
  disabled: false | undefined;
  currentUserId: number;
  handleEventSubmit: (learningDay: LearningDayEvent) => void;
}

type LearningDayCalendarProps = LearningDayCalendarPropsEnabled | LearningDayCalendarPropsDisabled

interface LearningDayCalendarState {
  isEventModalOpen: boolean;
  isEventModalDisabled: boolean;
  currentEvent?: AtLeast<LearningDayEvent, "start" | "end" | "userId">;
}

export class LearningDayCalendar extends React.Component<LearningDayCalendarProps, LearningDayCalendarState> {
  public state: LearningDayCalendarState = {
    isEventModalOpen: false,
    isEventModalDisabled: true,
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
        isEventModalDisabled: false,
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

    this.props.handleEventSubmit(event);
    this.setState({ isEventModalOpen: false });
  }

  handleModalClose = (): void => {
    this.setState({ isEventModalOpen: false });
  }

  handleSelectEvent = (event: LearningDayEvent): void => {
    this.setState(
      {
        isEventModalOpen: true,
        isEventModalDisabled: true,
        currentEvent: event,
      });
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <EventAddModal
          isOpen={this.state.isEventModalOpen}
          disabled={this.state.isEventModalDisabled}
          learningDayEvent={this.state.currentEvent}
          onRequestClose={this.handleModalClose}
          onEventSubmit={this.handleEventSubmit}
        />
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
