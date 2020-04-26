import React from 'react';
import './WorkerList.css';

export interface WorkerListItem {
  userId: number;
  fullName: string;
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
            <td>{item.fullName}</td>
            <td>{item.jobTitle}</td>
            <td>{item.dateFrom}</td>
            <td>{item.dateTo}</td>
          </tr>
        ))}
      </table>
    );
  }
}
