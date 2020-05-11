import React from "react";
import { Calendar, momentLocalizer, Event, SlotInfo } from "react-big-calendar";
import "./WeekViewCalendar.scss";
import moment from "moment";
import "moment/locale/en-gb";
import { ColorMapper } from "src/utils/ColorMapper";

const localizer = momentLocalizer(moment);

export interface ColoredEvent extends Event {
  colorId: number;
}

export interface WeekViewCalendarProps<TEvent extends ColoredEvent> {
  events: TEvent[];
  onSelectSlot: (slotInfo: SlotInfo) => void;
  onSelectEvent: (event: TEvent, e?: React.SyntheticEvent<HTMLElement>) => void;
  mergeEveryHalfHour: number;
  disabled?: boolean;
}

export class WeekViewCalendar<TEvent extends ColoredEvent>
  extends React.PureComponent<WeekViewCalendarProps<TEvent>> {
  private readonly halfHoursInHour = 48;

  constructor(props: WeekViewCalendarProps<TEvent>) {
    super(props);

    if (props.mergeEveryHalfHour < 1 || this.halfHoursInHour % props.mergeEveryHalfHour !== 0) {
      throw new Error("mergeEveryHalfHour must be a common diviser of 48 (number of half hours in hour)");
    }
  }

  assignColorById = (event: ColoredEvent): React.HTMLAttributes<HTMLDivElement> => {
    const color = ColorMapper.generateColorFromId(event.colorId, "#dddddd");
    const borderColor = ColorMapper.generateColorFromId(event.colorId, "#222222");
    const fontColor = ColorMapper.getFontColorByBackgroud(color);

    return {
      style: { backgroundColor: color, color: fontColor, border: `1px solid ${borderColor}` },
    };
  }

  render(): JSX.Element {
    return (
      <div>
        <Calendar
          selectable={!this.props.disabled}
          localizer={localizer}
          culture='en-gb'
          defaultView={"week"}
          timeslots={this.props.mergeEveryHalfHour}
          views={{ week: true }}
          events={this.props.events}
          onSelectSlot={this.props.onSelectSlot}
          onSelectEvent={this.props.onSelectEvent}
          eventPropGetter={this.assignColorById}
        />
      </div>
    );
  }
}
