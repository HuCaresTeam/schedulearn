import React from "react";
import "./WorkerList.scss";
import { Table } from "react-bootstrap";

export interface WorkerListItem {
  userId: number;
  name: string;
  surname: string;
  jobTitle: string;
  dateFrom: string;
  dateTo: string;
}

interface WorkerListProps {
  items: WorkerListItem[];
  width?: number;
}

export default class WorkerList extends React.Component<WorkerListProps, {}> {
  render(): JSX.Element {
    return (
      <Table striped bordered hover style={{marginTop: "20px", width: this.props.width}}>
        <thead>
          <tr>
            <th style={{width: "25%"}}>Full Name</th>
            <th style={{width: "25%"}}>Job Title</th>
            <th style={{width: "25%"}}>Date From</th>
            <th style={{width: "25%"}}>Date To</th>
          </tr>
        </thead>
        <tbody>
          {this.props.items.map((item: WorkerListItem, index: number) => (
            <tr key={index}>
              <td>{item.name} {item.surname}</td>
              <td>{item.jobTitle}</td>
              <td>{new Date(item.dateFrom).toLocaleString()}</td>
              <td>{new Date(item.dateTo).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
