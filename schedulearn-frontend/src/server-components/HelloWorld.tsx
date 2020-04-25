import React from "react";
import dotnetify from "dotnetify";

dotnetify.hubServerUrl = "http://localhost:5000";

interface State {
  Greetings: string;
  ServerTime: string;
  RootTopic?: FullTopic;
}
export interface FullTopic{
  Id: number;
  Name: string;
  Description: string;
  ParentTopicId: number;
  SubTopics: FullTopic[];
}
// export interface Topic extends Item<Topic> {
//   topicId: number;

// }
export default class HelloWorld extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    dotnetify.react.connect("HelloWorld", this);
    this.state = { Greetings: "The server might be currently offline", ServerTime: "" };
  }

  render(): React.ReactNode {
    return (
      <div>
        <p>{this.state.Greetings}</p>
        <p>Server time is: {this.state.ServerTime}</p>
        <p>Server time is: {JSON.stringify(this.state.RootTopic)}</p>
      </div>
    );
  }
}
