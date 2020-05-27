import React from "react";
import "./FlatTopicList.scss";
import { Table } from "react-bootstrap";

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
      <Table striped bordered hover style={{marginTop: "20px"}}>
        <thead>
          <tr>
            <th>Topic name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {this.props.topics.map((topic): React.ReactNode => (
            <tr key={topic.name}>
              <td>{topic.name}</td>
              <td>{topic.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}