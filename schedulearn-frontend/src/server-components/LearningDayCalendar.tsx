import React from "react";
import { WeekViewCalendar } from "../components/Calendar/WeekViewCalendar";
import { SlotInfo } from "react-big-calendar";
import { EventAddModal } from "../components/Calendar/EventAddModal";
import { LearningDayEvent } from "../components/Calendar/LearningDayEvent";

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

export class LearningDayCalendar extends React.Component<{}, LearningDayCalendarState> {
  // TODO: Make complete interface for learning event
  // TODO: Fetch learning day data
  // TODO: Handle making new events (Post to server, fetch)
  // TODO: Figure out how getting single user/all user data is going to look like

  public state: LearningDayCalendarState = {
    learningDayEvents: [
      {
        topicId: 1,
        start: new Date(2020, 3, 20, 10),
        end: new Date(2020, 3, 20, 12, 30),
        title: "Event 1",
      },
      {
        topicId: 2,
        start: new Date(2020, 3, 20, 15),
        end: new Date(2020, 3, 20, 20, 30),
        title: "Event 2",
      },
    ],
    isEventModalOpen: false,
  }

  handleSelectSlot = (slotInfo: SlotInfo): void => {
    console.log(JSON.stringify(slotInfo));
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
    console.log(JSON.stringify(event));
    const events = [...this.state.learningDayEvents, event];
    this.setState({ isEventModalOpen: false, learningDayEvents: events });
  }

  handleModalClose = (): void => {
    this.setState({ isEventModalOpen: false });
  }

  handleSelectEvent = (event: LearningDayEvent): void => {
    alert(`Event clicked: ${event.title}`);
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
