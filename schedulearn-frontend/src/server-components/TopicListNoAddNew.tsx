import React from "react";
import { NestedList } from "src/components/NestedList/NestedList";
import UserContext from "src/UserContext";
import { Topic } from "src/api-contract/Topic";
import { TopicForm } from "../components/NestedList/TopicAddForm";
import { TopicListItem } from "./TopicList";

interface TopicListNoAddProps {
  onItemClick?(item: TopicListItem): void;
  width?: number;
  disabled?: boolean;
  selectedItemId?: number;
  maxHeight?: number;
}

export interface TopicListNoAddState {
  rootTopic?: TopicListItem;
}

export default class TopicListNoAdd extends React.Component<TopicListNoAddProps, TopicListNoAddState> {
  state: TopicListNoAddState = {}

  topicToListItem = (topic: Topic): TopicListItem => {
    return {
      id: topic.id,
      label: topic.name,
      description: topic.description,
      parentTopicId: topic.parentTopicId,
      subItems: topic.subTopics.map((t) => this.topicToListItem(t)),
    };
  }

  getTopicsFromRoot = (): void => {
    UserContext
      .fetch("api/topic")
      .then((response) => {
        if (!response.ok) {
          //set error
          return;
        }

        return response.json();
      })
      .then((rootTopic: Topic) => {
        const listItem = this.topicToListItem(rootTopic);
        this.setState({ rootTopic: listItem });
      });
  }

  handleTopicSubmit = (topic: TopicForm): void => {
    UserContext
      .fetch("api/topic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(topic),
      })
      .then((response) => {
        if (!response.ok)
          return;

        this.getTopicsFromRoot();
      });
  }

  componentDidMount(): void {
    this.getTopicsFromRoot();
  }

  render(): React.ReactNode {
    if (!this.state.rootTopic) {
      return (
        <NestedList rootItem={{ id: 0, label: "Loading...", subItems: [], description: "" }} displayAddOption={false} />
      );
    }

    return (
      <NestedList 
        rootItem={this.state.rootTopic} 
        onItemClick={this.props.onItemClick} 
        disabled={this.props.disabled}
        displayAddOption={false}
        onAddOptionSubmit={this.handleTopicSubmit}
        selectedItemId={this.props.selectedItemId}
        maxHeight={this.props.maxHeight}
      />
    );
  }
}
