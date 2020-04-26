import React from 'react';
import './WorkerList.css';

export interface Item {
  name: string;
  date: string;
}

interface Props {
  items: Item[];
  width?: number;
}

export default class WorkerList extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render(): JSX.Element {
    return (
      <table className="worker-table" style={{ width: this.props.width || 300 }}>
        <tr>
          <th>Name</th>
          <th>Date</th>
        </tr>
        {this.props.items.map((item: Item, index: number) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </table>
    );
  }
}
