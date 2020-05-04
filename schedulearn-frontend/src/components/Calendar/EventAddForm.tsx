import React from "react";
import TimeManipulator from "./TimeManipulator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EventAddForm.scss";
import TopicList, { FullTopic } from "src/server-components/TopicList";
import AtLeast from "src/util-types/AtLeast";

export interface EventAddFormProps {
  isOpen: boolean;
  disabled: boolean;
  learningDayEvent?: AtLeast<LearningDayEventInfo, "userId">;
  onEventSubmit: (event: LearningDayEventInfo) => void;
}

export interface LearningDayEventInfo {
  start: Date;
  end: Date;
  title: string;
  description: string;
  topicId: number;
  userId: number;
}

export type EventAddFormState = LearningDayEventInfo;

export class EventAddForm extends React.Component<EventAddFormProps, EventAddFormState> {
  public constructor(props: EventAddFormProps) {
    super(props);
    this.state = this.getDefaultState();
  }

  private getDefaultState(): EventAddFormState {
    const currentDate = new Date(Date.now());
    const startEndRange = TimeManipulator.getNearestThirtyMinuteInterval(currentDate);
    return {
      title: this.props.learningDayEvent?.title ?? "",
      start: this.props.learningDayEvent?.start ?? startEndRange.start,
      end: this.props.learningDayEvent?.end ?? startEndRange.end,
      topicId: this.props.learningDayEvent?.topicId ?? 0,
      description: this.props.learningDayEvent?.description ?? "",
      userId: this.props.learningDayEvent?.userId ?? 0,
    };
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.props.onEventSubmit({
      start: this.state.start,
      end: this.state.end,
      title: this.state.title,
      topicId: this.state.topicId,
      description: this.state.description,
      userId: this.state.userId,
    });
  }

  componentDidUpdate(prevProps: EventAddFormProps): void {
    if ((this.props.isOpen !== prevProps.isOpen && this.props.isOpen === true) ||
      this.props.learningDayEvent?.start !== this.props.learningDayEvent?.start ||
      this.props.learningDayEvent?.end !== this.props.learningDayEvent?.end ||
      this.props.learningDayEvent?.userId !== this.props.learningDayEvent?.userId) {
      this.setState(this.getDefaultState());
    }
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

  onTopicSelectChange = (topic: FullTopic): void => {
    this.setState({ topicId: topic.Id, title: topic.Label });
  }

  onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ description: event.target.value });
  }

  render(): JSX.Element {
    return (
      <form className="event-form" onSubmit={this.handleSubmit}>
        <div className="event-field event-title">
          <label className="eventLabel">
            Title:
          </label>
          <input type="text" disabled={true} placeholder="Event title" value={this.state.title} />
        </div>
        <div className="event-field event-topic-selector">
          <label className="event-label">
            Learning topic:
          </label>
          <TopicList
            onItemClick={this.onTopicSelectChange}
            disabled={this.props.disabled}
          />
        </div>
        <div className="event-field event-start-time">
          <label className="event-label">
            Start Time:
          </label>
          <DatePicker className="event-start-timer-picker"
            selected={this.state.start}
            onChange={this.onStartDateChange}
            showTimeSelect
            dateFormat="Pp"
            disabled={this.props.disabled}
          />
        </div>
        <div className="event-field event-end-time">
          <label className="event-label">
            End Time:
          </label>
          <DatePicker className="event-start-timer-picker"
            selected={this.state.end}
            onChange={this.onEndDateChange}
            showTimeSelect
            dateFormat="Pp"
            disabled={this.props.disabled}
          />
        </div>
        <div className="event-field event-description">
          <label className="event-label">
            Description:
          </label>
          <textarea
            value={this.state.description}
            onChange={this.onDescriptionChange}
            disabled={this.props.disabled}
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
