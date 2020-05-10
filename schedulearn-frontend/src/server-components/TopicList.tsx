import React from "react";
import { ListItem } from "src/components/NestedList/NestedListItem";
import { NestedList } from "src/components/NestedList/NestedList";
import UserContext from "src/UserContext";
import { Topic } from "src/api-contract/Topic";

interface TopicListProps {
  onItemClick?(item: TopicListItem): void;
  width?: number;
  disabled?: boolean;
  selectedItemId?: number;
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

  componentDidMount(): void {
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

  render(): React.ReactNode {
    if (!this.state.rootTopic) {
      return (
        <NestedList rootItem={{ id: 0, label: "Loading...", subItems: [], description: "" }} />
      );
    }

    return (
      <NestedList
        rootItem={this.state.rootTopic}
        onItemClick={this.props.onItemClick}
        disabled={this.props.disabled}
        selectedItemId={this.props.selectedItemId}
      />
    );
  }
}
