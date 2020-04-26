import React from 'react';
import { Item } from './WorkerList';
import WorkerList from './WorkerList';

export default class WorkerListExample extends React.Component {
  list: Item[] = [
    {
      name: 'name1',
      date: '2020-04-20',
    },
    {
      name: 'name2',
      date: '2020-04-20',
    },
    {
      name: 'name3',
      date: '2020-04-20',
    },
    {
      name: 'name4',
      date: '2020-04-20',
    },
  ];
  render(): JSX.Element {
    return (
      <div>
        <WorkerList items={this.list} width={400}></WorkerList>
      </div>
    );
  }
}
