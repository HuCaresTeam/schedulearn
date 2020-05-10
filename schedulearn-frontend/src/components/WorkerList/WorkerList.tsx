import React from "react";
import "./WorkerList.css";

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
      <table className="worker-table" style={{ width: this.props.width }}>
        <tr>
          <th>Full Name</th>
          <th>Job Title</th>
          <th>Date From</th>
          <th>Date To</th>
        </tr>
        {this.props.items.map((item: WorkerListItem, index: number) => (
          <tr key={index}>
            <td>{item.name} {item.surname}</td>
            <td>{item.jobTitle}</td>
            <td>{new Date(item.dateFrom).toLocaleString()}</td>
            <td>{new Date(item.dateTo).toLocaleString()}</td>
          </tr>
        ))}
      </table>
    );
  }
}
