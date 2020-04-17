import React from 'react';
import { Item } from './ListItem';
import NestedList from './NestedList';

export default class NestedListExample extends React.Component {
  item: Item;

  constructor() {
    super({});

    const list = [
      {
        label: 'first',
        subItems: [
          {
            label: 'first1',
            subItems: [
              {
                label: 'first11',
                subItems: [
                  {
                    label: 'first111',
                    subItems: [],
                  },
                  {
                    label: 'first111',
                    subItems: [],
                  },
                  {
                    label: 'first111',
                    subItems: [],
                  },
                ],
              },
            ],
          },
          {
            label: 'first2',
            subItems: [],
          },
          {
            label: 'first111',
            subItems: [],
          },
          {
            label: 'first1117',
            subItems: [],
          },
        ],
      },
      {
        label: 'second',
        subItems: [],
      },
      {
        label: 'third',
        subItems: [],
      },
    ];
    this.item = {
      label: 'title',
      subItems: list,
    };
  }

  callback = (item: Item): void => {
    alert(item.label);
  };

  render(): JSX.Element {
    return <NestedList item={this.item} onItemClick={this.callback} />;
  }
}
