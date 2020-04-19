import React from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import './WeekViewCalendar.scss';
import moment from 'moment';
import 'moment/locale/en-gb';

const localizer = momentLocalizer(moment);

export interface WeekViewCalendarProps<TEvent extends Event> {
  events: TEvent[];
  onSelectSlot: (slotInfo: SlotInfo) => void;
  onSelectEvent: (event: TEvent) => void;
  mergeEveryHalfHour: number;
}

export interface SlotInfo {
  start: string | Date;
  end: string | Date;
  slots: Date[] | string[];
  action: 'select' | 'click' | 'doubleClick';
}

export class WeekViewCalendar<TEvent extends Event>
  extends React.PureComponent<WeekViewCalendarProps<TEvent>> {
  private readonly halfHoursInHour = 48;

  constructor(props: WeekViewCalendarProps<TEvent>) {
    super(props);

    if (props.mergeEveryHalfHour < 1 || this.halfHoursInHour % props.mergeEveryHalfHour !== 0) {
      throw new Error('mergeEveryHalfHour must be a common diviser of 48 (number of half hours in hour)');
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <Calendar selectable={true}
          localizer={localizer}
          culture='en-gb'
          defaultView={'week'}
          timeslots={this.props.mergeEveryHalfHour}
          views={{ week: true }}
          events={this.props.events}
          onSelectSlot={this.props.onSelectSlot}
          onSelectEvent={this.props.onSelectEvent}
        />
      </div>
    );
  }
}
