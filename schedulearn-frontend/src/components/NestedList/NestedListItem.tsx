import React from 'react';
import './NestedListItem.css';
import arrow from './next.svg';

export interface Item {
  label: string;
  subItems: Item[];
}

export interface NestedListItemProps {
  item: Item;
  index: number;
  callback(item: Item, index: number): void;
}

export class NestedListItem extends React.PureComponent<NestedListItemProps> {
  handler = (): void => {
    this.props.callback(this.props.item, this.props.index);
  };

  render(): JSX.Element {
    let icon;
    if (this.props.item.subItems.length) {
      icon = <img className="nested-list-forward-icon" src={arrow} alt="arrow" />;
    }

    return (
      <div className="nested-list-item" onClick={this.handler}>
        {this.props.item.label}
        {icon}
      </div>
    );
  }
}
