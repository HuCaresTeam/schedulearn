import React from "react";
import TimeManipulator from "./TimeManipulator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EventForm.scss";
import TopicList, { TopicListItem } from "src/server-components/TopicList";
import AtLeast from "src/utils/AtLeast";

export interface EventFormProps {
  isOpen: boolean;
  disabledForms?: {
    topicPickDisabled?: boolean;
    datePickDisabled?: boolean;
    descriptionDisabled?: boolean;
  };
  learningDayEvent?: AtLeast<LearningDayEvent, "userId">;
  submitText?: string;
  onEventSubmit: (event: LearningDayEvent) => void;
}

export interface LearningDayEvent {
  id?: number;
  rowVersion?: string;
  start: Date;
  end: Date;
  title: string;
  description: string;
  topicId: number;
  userId: number;
}

export type EventFormState = LearningDayEvent;

export class EventForm extends React.Component<EventFormProps, EventFormState> {
  public constructor(props: EventFormProps) {
    super(props);
    this.state = this.getDefaultState();
  }

  private getDefaultState(): EventFormState {
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

  handleSubmit = (): void => {
    this.props.onEventSubmit({
      id: this.props.learningDayEvent?.id,
      rowVersion: this.props.learningDayEvent?.rowVersion,
      start: this.state.start,
      end: this.state.end,
      title: this.state.title,
      topicId: this.state.topicId,
      description: this.state.description,
      userId: this.state.userId,
    });
  }

  componentDidUpdate(prevProps: EventFormProps): void {
    if ((this.props.isOpen !== prevProps.isOpen && this.props.isOpen === true) ||
      this.props.learningDayEvent?.rowVersion !== prevProps.learningDayEvent?.rowVersion ||
      this.props.learningDayEvent?.start !== prevProps.learningDayEvent?.start ||
      this.props.learningDayEvent?.end !== prevProps.learningDayEvent?.end ||
      this.props.learningDayEvent?.userId !== prevProps.learningDayEvent?.userId ||
      this.props.learningDayEvent?.description !== prevProps.learningDayEvent?.description ||
      this.props.learningDayEvent?.topicId !== prevProps.learningDayEvent?.topicId) {
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

  onTopicSelectChange = (topic: TopicListItem): void => {
    this.setState({ topicId: topic.id, title: topic.label });
  }

  onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ description: event.target.value });
  }

  render(): JSX.Element {
    const disabledForms = this.props.disabledForms;
    const submitDisabled = disabledForms?.datePickDisabled && disabledForms.descriptionDisabled && disabledForms.topicPickDisabled;

    return (
      <form className="event-form">
        <div className="event-field event-title">
          <label className="eventLabel">
            Title:
          </label>
          <input type="text" disabled={true} placeholder="Event title" value={this.state.title} />
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
            disabled={disabledForms?.datePickDisabled}
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
            disabled={disabledForms?.datePickDisabled}
          />
        </div>
        <div className="event-field event-topic-selector">
          <label className="event-label">
            Learning topic:
          </label>
          <TopicList
            onItemClick={this.onTopicSelectChange}
            disabled={disabledForms?.topicPickDisabled}
            selectedItemId={this.props.learningDayEvent?.topicId}
            maxHeight={250}
          />
        </div>
        <div className="event-field event-description">
          <label className="event-label">
            Description:
          </label>
          <textarea
            value={this.state.description}
            onChange={this.onDescriptionChange}
            disabled={disabledForms?.descriptionDisabled}
          />
        </div>
        {submitDisabled ? undefined : <input type="submit" onClick={this.handleSubmit} value={this.props.submitText ?? "Submit"} />}
      </form>
    );
  }
}
