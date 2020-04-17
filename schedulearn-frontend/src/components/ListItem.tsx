import React from 'react';
import './ListItem.css';
import arrow from './next.svg';

export interface Item {
  index?: number;
  label: string;
  subItems: Item[];
}

interface Props {
  item: Item;
  callback(item: Item): void;
}

export default class ListItem extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  handler = (): void => {
    this.props.callback(this.props.item);
  };
  render(): JSX.Element {
    let icon;
    if (this.props.item.subItems.length) {
      icon = <img className="icon" src={arrow} alt="arrow" />;
    }

    return (
      <div className="item" onClick={this.handler}>
        <div className="wrapper">
          {this.props.item.label}
          {icon}
        </div>
      </div>
    );
  }
}
