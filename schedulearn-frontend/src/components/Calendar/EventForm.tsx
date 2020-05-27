import React from "react";
import TimeManipulator from "./TimeManipulator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EventForm.scss";
import TopicList, { TopicListItem } from "src/server-components/TopicList";
import AtLeast from "src/utils/AtLeast";
import { Form, Row, Col, Button } from "react-bootstrap";

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
      <div>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="2">Title:</Form.Label>
            <Col sm="8"><Form.Control disabled placeholder="Event title" value={this.state.title} /></Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">Start Time:</Form.Label>
            <Col sm="8"><DatePicker 
              className={disabledForms?.datePickDisabled ? "event-start-timer-picker-off" : "event-start-timer-picker-on" }
              selected={this.state.start}
              onChange={this.onStartDateChange}
              showTimeSelect
              dateFormat="Pp"
              disabled={disabledForms?.datePickDisabled}
            /></Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">End Time:</Form.Label>
            <Col sm="8"><DatePicker 
              className={disabledForms?.datePickDisabled ? "event-start-timer-picker-off" : "event-start-timer-picker-on"}
              selected={this.state.end}
              onChange={this.onEndDateChange}
              showTimeSelect
              dateFormat="Pp"
              disabled={disabledForms?.datePickDisabled}
            /></Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">Learning topic:</Form.Label>
            <Col sm="8"><TopicList
              onItemClick={this.onTopicSelectChange}
              disabled={disabledForms?.topicPickDisabled}
              selectedItemId={this.props.learningDayEvent?.topicId}
              maxHeight={250}
            /></Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">Description:</Form.Label>
            <Col sm="8"><Form.Control as="textarea"
              rows={3}
              style={{minHeight: "100px"}}
              value={this.state.description}
              onChange={this.onDescriptionChange}
              disabled={disabledForms?.descriptionDisabled}
            /></Col>
          </Form.Group>
          <div style={{textAlign: "center"}}>
            {submitDisabled ? undefined :
              <Button style={{width: "150px"}}variant="primary" type="submit" onClick={this.handleSubmit} >
                {this.props.submitText ?? "Submit"}
              </Button>
            }
          </div>
        </Form>
      </div>
    );
  }
}
