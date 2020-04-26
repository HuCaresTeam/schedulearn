import React from 'react';
import { WorkerListItem as Item } from './WorkerList';
import WorkerList from './WorkerList';

export default class WorkerListExample extends React.Component {
  list: Item[] = [
    {
      userId: 1,
      fullName: 'Jonas',
      jobTitle: 'boss',
      dateFrom: '2020-04-20',
      dateTo: '2020-04-20',
    },
    {
      userId: 2,
      fullName: 'Petras',
      jobTitle: 'boss',
      dateFrom: '2020-04-20',
      dateTo: '2020-04-20',
    },
    {
      userId: 3,
      fullName: 'Kestutis',
      jobTitle: 'boss',
      dateFrom: '2020-04-20',
      dateTo: '2020-04-20',
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
