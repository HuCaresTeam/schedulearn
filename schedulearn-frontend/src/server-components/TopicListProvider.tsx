import React from "react";
import dotnetify, { dotnetifyVM } from "dotnetify";
import { Item } from "src/components/NestedList/NestedListItem";
dotnetify.hubServerUrl = "http://localhost:5000";

export interface TopicListProviderState {
  RootTopic?: FullTopic;
  vm?: dotnetifyVM;
}

interface TopicListProviderProps {
  children: React.ReactNode;
}

export interface FullTopic extends Item<FullTopic> {
  Description: string;
  ParentTopicId?: number;
}

export const TopicListContext = React.createContext<TopicListProviderState>({});

export default class TopicListProvider extends React.Component<TopicListProviderProps, TopicListProviderState> {
  constructor(props: TopicListProviderProps) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
    const vm = dotnetify.react.connect("TopicList", this);
    this.setState({ vm });
  }

  componentWillUnmount(): void {
    if (this.state.vm !== undefined)
      this.state.vm.$destroy();
  }

  render(): React.ReactNode {
    return (
      <TopicListContext.Provider value={this.state}>
        {this.props.children}
      </TopicListContext.Provider>
    );
  }
}
