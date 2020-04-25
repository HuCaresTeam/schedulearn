import React from "react";
import { LearningDayEvent } from "./LearningDayEvent";
import TimeManipulator from "./TimeManipulator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Item } from "../NestedList/NestedListItem";
import { NestedList } from "../NestedList/NestedList";
import "./EventAddForm.scss";

export interface EventAddFormProps {
  isOpen: boolean;
  start?: Date;
  end?: Date;
  onEventSubmit: (event: LearningDayEvent) => void;
}

export interface EventAddFormState {
  title: string;
  start: Date;
  end: Date;
  learningDayId: number;
}

export interface Topic extends Item<Topic> {
  topicId: number;
}

const tempItem: Topic = {
  topicId: 5,
  label: "title",
  subItems: [
    {
      topicId: 57,
      label: "first",
      subItems: [
        {
          topicId: 100,
          label: "first1",
          subItems: [
            {
              topicId: 5400,
              label: "first11",
              subItems: [
                {
                  topicId: 5700,
                  label: "first111",
                  subItems: [],
                },
                {
                  topicId: 5800,
                  label: "first111",
                  subItems: [],
                },
                {
                  topicId: 5900,
                  label: "first111",
                  subItems: [],
                },
              ],
            },
          ],
        },
        {
          topicId: 101,
          label: "first2",
          subItems: [],
        },
        {
          topicId: 102,
          label: "first111",
          subItems: [],
        },
        {
          topicId: 103,
          label: "first1117",
          subItems: [],
        },
      ],
    },
    {
      topicId: 6,
      label: "second",
      subItems: [],
    },
    {
      topicId: 7,
      label: "third",
      subItems: [],
    },
  ],
};

export class EventAddForm extends React.Component<EventAddFormProps, EventAddFormState> {
  public constructor(props: EventAddFormProps) {
    super(props);
    this.state = this.getDefaultState();
  }

  private getDefaultState(): EventAddFormState {
    const currentDate = new Date(Date.now());
    const startEndRange = TimeManipulator.getNearestThirtyMinuteInterval(currentDate);
    return {
      title: "",
      start: this.props.start || startEndRange.start,
      end: this.props.end || startEndRange.end,
      learningDayId: 0,
    };
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.props.onEventSubmit({
      start: this.state.start,
      end: this.state.end,
      title: this.state.title,
      learningDayId: this.state.learningDayId,
    });
  }

  componentDidUpdate(prevProps: EventAddFormProps): void {
    if ((this.props.isOpen !== prevProps.isOpen && this.props.isOpen === true) ||
      this.props.start !== prevProps.start ||
      this.props.end !== prevProps.end) {
      this.setState(this.getDefaultState());
    }
  }

  onTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ title: event.target.value });
  }

  onStartDateChange = (date: Date): void => {
    const range = this.state.end.getTime() - this.state.start.getTime();
    const endDate = new Date(date.getTime() + range);
    this.setState({ start: date, end: endDate });
  }

  onEndDateChange = (date: Date): void => {
    if (this.state.start.getTime() >= date.getTime())
      return;

    this.setState({ end: date });
  }

  onTopicSelectChange = (topic: Topic): void => {
    this.setState({ learningDayId: topic.topicId });
  }

  render(): JSX.Element {
    return (
      <form className="eventForm" onSubmit={this.handleSubmit}>
        <div className="eventField eventTitle">
          <label className="eventLabel">
            Name:
          </label>
          <input type="text" value={this.state.title} onChange={this.onTitleChange} />
        </div>
        <div className="eventField eventStartTime">
          <label className="eventLabel">
            Start Time:
          </label>
          <DatePicker className="eventStartTimerPicker"
            selected={this.state.start}
            onChange={this.onStartDateChange}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div className="eventField eventEndTime">
          <label className="eventLabel">
            End Time:
          </label>
          <DatePicker className="eventStartTimerPicker"
            selected={this.state.end}
            onChange={this.onEndDateChange}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div className="eventField eventTopicSelector">
          <label className="eventLabel">
            Learning topic:
          </label>
          <NestedList item={tempItem} onItemClick={this.onTopicSelectChange} />
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
