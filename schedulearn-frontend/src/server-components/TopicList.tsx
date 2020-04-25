import React from "react";
import dotnetify from "dotnetify";
import { Item } from "src/components/NestedList/NestedListItem";
import { NestedList } from "src/components/NestedList/NestedList";
dotnetify.hubServerUrl = "http://localhost:5000";

interface TopicListState {
  RootTopic?: FullTopic;
}
interface TopicListProps {
  onItemClick?(item: FullTopic, itemIndex: string): void;
  width?: number;
  selectedItemIndex?: string;
}

export interface FullTopic extends Item<FullTopic>{
  Id?: number;
  Description: string;
  ParentTopicId: number;
}

export default class TopicList extends React.Component<TopicListProps, TopicListState> {
  constructor(props: TopicListProps) {
    super(props);
    dotnetify.react.connect("TopicList", this);
    this.state = { };
  }

  render(): React.ReactNode {
    if(this.state.RootTopic === undefined)
    {
      return (
        <NestedList item={{Label: "Loading...", SubItems: []}}/>
      );
    }
    return (
      <NestedList item={this.state.RootTopic} onItemClick={this.props.onItemClick}/>
    );
  }
}
