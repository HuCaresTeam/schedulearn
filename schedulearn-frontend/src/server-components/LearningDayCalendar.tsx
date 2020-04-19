import React from 'react';
import { WeekViewCalendar, SlotInfo } from '../components/Calendar/WeekViewCalendar';
import { Event } from 'react-big-calendar';

export class LearningDayCalendar extends React.Component {
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
