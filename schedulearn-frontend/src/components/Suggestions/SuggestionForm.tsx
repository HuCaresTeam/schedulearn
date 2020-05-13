import React from "react";
import "./SuggestionForm.scss";
import TopicList, { TopicListItem } from "../../server-components/TopicList";
import { NewSuggestion } from "./CreateSuggestion";

export interface SuggestionFormProps {
  isOpen: boolean;
  suggestion?: NewSuggestion;
  submitText?: string;
  onEventSubmit: (topicId: number) => void;
}

export interface SuggestionFormState {
  topicId: number;
  suggesteeId: number;
}

export class SuggestionForm extends React.Component<SuggestionFormProps, SuggestionFormState> {
  public constructor(props: SuggestionFormProps) {
    super(props);
    this.state = this.getDefaultState();
  }

  private getDefaultState(): SuggestionFormState {
    return {
      topicId: this.props.suggestion?.topicId ?? 0,
      suggesteeId: this.props.suggestion?.suggesteeId ?? 0,
    };
  }

  handleSubmit = (event: React.MouseEvent<HTMLInputElement, MouseEvent>): void => {
    event.preventDefault();
    this.props.onEventSubmit(this.state.topicId);
  }

  componentDidUpdate(prevProps: SuggestionFormProps): void {
    if ((this.props.isOpen !== prevProps.isOpen && this.props.isOpen === true) ||
      this.props.suggestion?.suggesteeId !== prevProps.suggestion?.suggesteeId ||
      this.props.suggestion?.topicId !== prevProps.suggestion?.topicId) {
      this.setState(this.getDefaultState());
    }
  }

  onTopicSelectChange = (topic: TopicListItem): void => {
    if (topic.parentTopicId !== undefined)
      this.setState({ topicId: topic.parentTopicId });
    else
      throw Error("Topic must be defined!");
  }

  render(): JSX.Element {
    return (
      <form className="suggestion-form">
        <div className="suggestion-field suggestion-topic-selector">
          <label className="suggestion-label">
            Suggested topic:
          </label>
          <TopicList
            onItemClick={this.onTopicSelectChange}
            disabled={false}
            selectedItemId={this.props.suggestion?.topicId}
            maxHeight={250}
          />
        </div>
        <input type="submit" onClick={this.handleSubmit} value={this.props.submitText ?? "Submit"} />
      </form>
    );
  }
}
