import React from "react";
import "./TopicAddForm.scss";
import { Form, Button, Row, Col } from "react-bootstrap";

export interface TopicAddFormProps {
  isOpen: boolean;
  disabled: boolean;
  newTopic?: TopicForm;
  onEventSubmit: (event: TopicForm) => void;
}

export interface TopicForm {
  name?: string;
  description?: string;
  parentTopicId?: number;
}

export type TopicAddFormState = TopicForm;

export class TopicAddForm extends React.Component<TopicAddFormProps, TopicAddFormState> {
  public constructor(props: TopicAddFormProps) {
    super(props);
    this.state = this.getDefaultState();
  }

  private getDefaultState(): TopicAddFormState {
    return {
      name: this.props.newTopic?.name ?? "",
      description: this.props.newTopic?.description ?? "",
      parentTopicId: this.props.newTopic?.parentTopicId,
    };
  }

  handleSubmit = (): void => {
    this.props.onEventSubmit({
      name: this.state.name,
      description: this.state.description,
      parentTopicId: this.state.parentTopicId,
    });
  }

  componentDidUpdate(prevProps: TopicAddFormProps): void {
    if ((this.props.isOpen !== prevProps.isOpen && this.props.isOpen === true) ||
      this.props.newTopic?.name !== prevProps.newTopic?.name ||
      this.props.newTopic?.description !== prevProps.newTopic?.description ||
      this.props.newTopic?.parentTopicId !== prevProps.newTopic?.parentTopicId) {
      this.setState(this.getDefaultState());
    }
  }

  onNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ name: event.target.value });
  }

  onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ description: event.target.value });
  }

  render(): JSX.Element {
    return (
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
          Name:
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text"
              disabled={this.props.disabled}
              placeholder="Name of the topic"
              onChange={this.onNameChange}
              value={this.state.name}
              required={true}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
          Description:
          </Form.Label>
          <Col sm="10">
            <Form.Control style={{minHeight: "100px", maxHeight: "300px"}}
              as="textarea"
              rows={3}
              value={this.state.description}
              onChange={this.onDescriptionChange}
              disabled={this.props.disabled}
              placeholder="Please describe the topic in detail to avoid any fatal confusion"
            />
          </Col>
        </Form.Group>
        <div style={{textAlign: "center"}}>
          <Button style={{width: "150px"}}
            variant="primary"
            type="button"
            onClick={this.handleSubmit}
          >Submit</Button>
        </div>
      </Form>
    );
  }
}
