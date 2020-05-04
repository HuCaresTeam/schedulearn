import React from "react";
import { Item } from "src/components/NestedList/NestedListItem";
import { NestedList } from "src/components/NestedList/NestedList";
import { TopicListContext, TopicListProviderState } from "./TopicListProvider";

interface TopicListProps {
  onItemClick?(item: FullTopic): void;
  width?: number;
  disabled?: boolean;
  selectedItemIndex?: string;
}

export interface FullTopic extends Item<FullTopic> {
  Description: string;
  ParentTopicId?: number;
}

export default class TopicList extends React.Component<TopicListProps> {
  renderWithinContext = (topicContext: TopicListProviderState): React.ReactNode => {
    if (!topicContext.RootTopic) {
      return (
        <NestedList rootItem={{ Id: 0, Label: "Loading...", SubItems: [] }} />
      );
    }

    return (
      <NestedList rootItem={topicContext.RootTopic} onItemClick={this.props.onItemClick} disabled={this.props.disabled} />
    );
  }

  render(): React.ReactNode {
    return (
      <TopicListContext.Consumer>
        {this.renderWithinContext}
      </TopicListContext.Consumer>
    );
  }
}
