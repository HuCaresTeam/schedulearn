import React from 'react';
import './WorkerList.css';

export interface WorkerListItem {
  UserId: number;
  FullName: string;
  JobTitle: string;
  DateFrom: string;
  DateTo: string;
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
            <td>{item.FullName}</td>
            <td>{item.JobTitle}</td>
            <td>{item.DateFrom}</td>
            <td>{item.DateTo}</td>
          </tr>
        ))}
      </table>
    );
  }
}
