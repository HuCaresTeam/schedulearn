import React from "react";
import dotnetify from "dotnetify";
import { Item } from "src/components/NestedList/NestedListItem";
import { NestedList } from "src/components/NestedList/NestedList";
dotnetify.hubServerUrl = "http://localhost:5000";

interface State {
  RootTopic?: FullTopic;
}

export interface FullTopic extends Item<FullTopic>{
  Id: number;
  Description: string;
  ParentTopicId: number;
}

export default class TopicList extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    dotnetify.react.connect("TopicList", this);
    this.state = { };
  }

  render(): React.ReactNode {
    if(this.state.RootTopic === undefined)
    {
      return(
        <div>Loading stuff</div>      
      );
    }
    return (
      <NestedList item={this.state.RootTopic} />
    );
  }
}
