import React from "react";
import "./TopicAddForm.scss";

export interface TopicAddFormProps {
  isOpen: boolean;
  disabled: boolean;
  topic?: TopicForm;
  onEventSubmit: (event: TopicForm) => void;
}

export interface TopicForm {
  id?: number; // New topic has to get id from the database
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
      name: this.props.topic?.name ??  "I am not set, but I'm open to new things",
      description: this.props.topic?.description ?? "Describe me, in very fine detail ;)",
      parentTopicId: this.props.topic?.parentTopicId,
    };
  }

  handleSubmit = (topic: React.FormEvent<HTMLFormElement>): void => {
    topic.preventDefault();
    this.props.onEventSubmit({
      name: this.state.name,
      description: this.state.description,
      parentTopicId: this.state.parentTopicId,
    });
  }

  componentDidUpdate(prevProps: TopicAddFormProps): void {
    if ((this.props.isOpen !== prevProps.isOpen && this.props.isOpen === true) ||
      this.props.topic?.name !== prevProps.topic?.name ||
      this.props.topic?.description !== prevProps.topic?.description ||
      this.props.topic?.parentTopicId !== prevProps.topic?.parentTopicId) {
      this.setState(this.getDefaultState());
    }
  }

  onNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ name: event.target.value });
  }

  onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ description: event.target.value });
  }

  render(): JSX.Element {
    return (
      <form className="topic-form" onSubmit={this.handleSubmit}>
        <div className="topic-field">
          <label className="topic-name">
            Name:
          </label>
          <input type="text" disabled={this.props.disabled} placeholder="Topic name" value={this.state.name} />
        </div>
        <div className="topic-field topic-description">
          <label className="topic-label">
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
