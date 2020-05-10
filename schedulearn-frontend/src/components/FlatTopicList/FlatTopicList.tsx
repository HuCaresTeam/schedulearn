import React from "react";
import "./FlatTopicList.scss";

export interface FlatTopicListItem {
  name: string;
  description: string;
}

interface FlatTopicListProps {
  topics: FlatTopicListItem[];
}

export default class FlatTopicList extends React.Component<FlatTopicListProps, {}> {
  render(): JSX.Element {
    return (
      <table className="flat-topic-table">
        <tbody>
          <tr>
            <th>Topic name</th>
            <th>Description</th>
          </tr>
          {this.props.topics.map((topic): React.ReactNode => (
            <tr key={topic.name}>
              <td>{topic.name}</td>
              <td>{topic.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}