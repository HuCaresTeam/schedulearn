import React from "react";
import { WeekViewCalendar } from "./Calendar/WeekViewCalendar";
import { SlotInfo } from "react-big-calendar";
import { EventAddModal } from "./Calendar/EventAddModal";
import { LearningDayEventInfo } from "./Calendar/EventAddForm";
import AtLeast from "src/util-types/AtLeast";

export interface LearningDay {
  Title: string;
  DateFrom: string;
  DateTo: string;
  Description: string;
  TopicId: number;
  UserId: number;
}

export interface LearningDayCalendarPropsBase {
  learningDayEvents: LearningDay[];
}

export interface LearningDayCalendarPropsDisabled extends LearningDayCalendarPropsBase {
  disabled: true;
}

export interface LearningDayCalendarPropsEnabled extends LearningDayCalendarPropsBase {
  disabled: false | undefined;
  currentUserId: number;
  handleEventSubmit: (learningDay: LearningDay) => void;
}

type LearningDayCalendarProps = LearningDayCalendarPropsEnabled | LearningDayCalendarPropsDisabled

interface LearningDayCalendarState {
  learningDayEvents: LearningDayEventInfo[];
  isEventModalOpen: boolean;
  isEventModalDisabled: boolean;
  currentEvent?: AtLeast<LearningDayEventInfo, "start" | "end" | "userId">;
}

export class LearningDayCalendar extends React.Component<LearningDayCalendarProps, LearningDayCalendarState> {
  public state: LearningDayCalendarState = {
    learningDayEvents: [],
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

  handleEventSubmit = (event: LearningDayEventInfo): void => {
    if (this.props.disabled)
      return;

    this.props.handleEventSubmit(LearningDayCalendar.eventToLearningDay(event));
    this.setState({ isEventModalOpen: false });
  }

  handleModalClose = (): void => {
    this.setState({ isEventModalOpen: false });
  }

  handleSelectEvent = (event: LearningDayEventInfo): void => {
    this.setState(
      {
        isEventModalOpen: true,
        isEventModalDisabled: true,
        currentEvent: event,
      });
  }

  private static learningDayToEvent = (learningDay: LearningDay): LearningDayEventInfo => {
    return {
      title: learningDay.Title,
      start: new Date(Date.parse(learningDay.DateFrom)),
      end: new Date(Date.parse(learningDay.DateTo)),
      topicId: learningDay.TopicId,
      description: learningDay.Description,
      userId: learningDay.UserId,
    };
  }

  private static eventToLearningDay = (learningDay: LearningDayEventInfo): LearningDay => {
    return {
      Title: learningDay.title,
      DateFrom: learningDay.start.toISOString(),
      DateTo: learningDay.end.toISOString(),
      TopicId: learningDay.topicId,
      Description: learningDay.description,
      UserId: learningDay.userId,
    };
  }

  static getDerivedStateFromProps(props: LearningDayCalendarProps, state: LearningDayCalendarState): LearningDayCalendarState {
    return {
      isEventModalOpen: state.isEventModalOpen,
      isEventModalDisabled: state.isEventModalDisabled,
      learningDayEvents: props.learningDayEvents.map(LearningDayCalendar.learningDayToEvent),
    };
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
          events={this.state.learningDayEvents}
          onSelectSlot={this.handleSelectSlot}
          onSelectEvent={this.handleSelectEvent}
          mergeEveryHalfHour={2}
          disabled={this.props.disabled}
        />
      </React.Fragment>
    );
  }
}
