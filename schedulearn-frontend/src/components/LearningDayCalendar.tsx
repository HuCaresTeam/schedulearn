import React from "react";
import { WeekViewCalendar } from "./Calendar/WeekViewCalendar";
import { SlotInfo } from "react-big-calendar";
import { EventAddModal } from "./Calendar/EventAddModal";
import { LearningDayEvent } from "./Calendar/LearningDayEvent";

export interface LearningDay {
  Title: string;
  DateFrom: string;
  DateTo: string;
  Description: string;
  TopicId: number;
}

export interface LearningDayCalendarProps {
  learningDayEvents: LearningDay[];
  handleEventSubmit: (learningDay: LearningDay) => void;
}

interface LearningDayCalendarState {
  learningDayEvents: LearningDayEvent[];
  isEventModalOpen: boolean;
  currentlySelectedSlot?: {
    start: Date;
    end: Date;
    slots: Date[] | string[];
    action: "select" | "click" | "doubleClick";
  };
}

export class LearningDayCalendar extends React.Component<LearningDayCalendarProps, LearningDayCalendarState> {
  public state: LearningDayCalendarState = {
    learningDayEvents: [],
    isEventModalOpen: false,
  }

  handleSelectSlot = (slotInfo: SlotInfo): void => {
    if (typeof slotInfo.start === "string")
      slotInfo.start = new Date(slotInfo.start);

    if (typeof slotInfo.end === "string")
      slotInfo.end = new Date(slotInfo.end);

    this.setState(
      {
        isEventModalOpen: true,
        currentlySelectedSlot: {
          start: slotInfo.start,
          end: slotInfo.end,
          slots: slotInfo.slots,
          action: slotInfo.action,
        },
      });
  }

  handleEventSubmit = (event: LearningDayEvent): void => {
    this.props.handleEventSubmit(this.eventToLearningDay(event));
    this.setState({ isEventModalOpen: false });
  }

  handleModalClose = (): void => {
    this.setState({ isEventModalOpen: false });
  }

  handleSelectEvent = (event: LearningDayEvent): void => {
    alert(`Event clicked: ${event.title}`);
  }

  learningDayToEvent = (learningDay: LearningDay): LearningDayEvent => {
    return {
      title: learningDay.Title,
      start: new Date(Date.parse(learningDay.DateFrom)),
      end: new Date(Date.parse(learningDay.DateTo)),
      topicId: learningDay.TopicId,
      description: learningDay.Description,
    };
  }

  eventToLearningDay = (learningDay: LearningDayEvent): LearningDay => {
    return {
      Title: learningDay.title,
      DateFrom: learningDay.start.toISOString(),
      DateTo: learningDay.end.toISOString(),
      TopicId: learningDay.topicId,
      Description: learningDay.description,
    };
  }

  componentDidUpdate(prevProps: LearningDayCalendarProps): void {
    if (prevProps.learningDayEvents !== this.props.learningDayEvents) {
      const learningDayEvents = this.props.learningDayEvents.map(this.learningDayToEvent);
      this.setState({ learningDayEvents });
    }
  }

  render(): React.ReactNode {
    return (
      <div>
        <EventAddModal
          isOpen={this.state.isEventModalOpen}
          start={this.state.currentlySelectedSlot?.start}
          end={this.state.currentlySelectedSlot?.end}
          onRequestClose={this.handleModalClose}
          onEventSubmit={this.handleEventSubmit}
        />
        <WeekViewCalendar
          events={this.state.learningDayEvents}
          onSelectSlot={this.handleSelectSlot}
          onSelectEvent={this.handleSelectEvent}
          mergeEveryHalfHour={2}
        />
      </div>
    );
  }
}
