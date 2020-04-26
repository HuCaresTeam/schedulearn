import React from 'react';
import { WorkerListItem as Item } from './WorkerList';
import WorkerList from './WorkerList';

export default class WorkerListExample extends React.Component {
  list: Item[] = [
    {
      UserId: 1,
      FullName: 'Jonas',
      JobTitle: 'boss',
      DateFrom: '2020-04-20',
      DateTo: '2020-04-20',
    },
    {
      UserId: 2,
      FullName: 'Petras',
      JobTitle: 'boss',
      DateFrom: '2020-04-20',
      DateTo: '2020-04-20',
    },
    {
      UserId: 3,
      FullName: 'Kestutis',
      JobTitle: 'boss',
      DateFrom: '2020-04-20',
      DateTo: '2020-04-20',
    },
  ];
  render(): JSX.Element {
    return (
      <div>
        <WorkerList items={this.list}></WorkerList>
      </div>
    );
  }
}
