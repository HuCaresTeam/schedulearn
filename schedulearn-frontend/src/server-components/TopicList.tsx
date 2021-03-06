import React from "react";
import { ListItem } from "src/components/NestedList/NestedListItem";
import { NestedList } from "src/components/NestedList/NestedList";
import UserContext from "src/api-services/UserContext";
import { Topic } from "src/api-services/api-contract/Topic";
import { TopicForm } from "../components/NestedList/TopicAddForm";

interface TopicListProps {
  onItemClick?(item: TopicListItem): void;
  width?: number;
  disabled?: boolean;
  selectedItemId?: number;
  maxHeight?: number;
  displayAddOption?: boolean;
}

export interface TopicListItem extends ListItem<TopicListItem> {
  parentTopicId?: number;
}

export interface TopicListState {
  rootTopic?: TopicListItem;
}

export default class TopicList extends React.Component<TopicListProps, TopicListState> {
  state: TopicListState = {}

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
      .then((rootTopic: Topic) => {
        const listItem = this.topicToListItem(rootTopic);
        this.setState({ rootTopic: listItem });
      });
  }

  handleTopicSubmit = (topic: TopicForm): void => {
    UserContext.fetch("api/topic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topic),
    }).then(() => {
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
        displayAddOption={this.props.displayAddOption ?? true}
        onAddOptionSubmit={this.handleTopicSubmit}
        selectedItemId={this.props.selectedItemId}
        maxHeight={this.props.maxHeight}
      />
    );
  }
}
