import React from 'react';
import { WeekViewCalendar, SlotInfo } from '../components/Calendar/WeekViewCalendar';
import { Event } from 'react-big-calendar';

export class LearningDayCalendar extends React.Component {
  // TODO: Make complete interface for learning event
  // TODO: Fetch learning day data
  // TODO: Handle making new events (Post to server, fetch)
  // TODO: Figure out how getting single user/all user data is going to look like

  handleSelectSlot = (slotInfo: SlotInfo): void => {
    window.prompt(`Event clicked at: ${slotInfo.start} ${slotInfo.end}`);
  }

  handleSelectEvent = (event: Event): void => {
    alert(`Event clicked: ${event.title}`);
  }

  render(): React.ReactNode {
    return (
      <WeekViewCalendar
        events={[{ start: new Date(2020, 3, 20, 10), end: new Date(2020, 3, 20, 12, 30), title: 'Event' }]}
        onSelectSlot={this.handleSelectSlot}
        onSelectEvent={this.handleSelectEvent}
        mergeEveryHalfHour={2}
      />
    );
  }
}
