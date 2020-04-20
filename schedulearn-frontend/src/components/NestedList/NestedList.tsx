import React from 'react';
import { NestedListItem, Item } from './NestedListItem';
import './NestedList.scss';
import arrow from './back.svg';

export interface NestedListProps {
  item: Item;
  onItemClick?(item: Item): void;
  width?: number;
}

interface NestedListState {
  item: Item;
}

export default class NestedList extends React.Component<NestedListProps, NestedListState> {
  private history: number[] = [];

  constructor(props: NestedListProps) {
    super(props);

    this.state = {
      item: this.props.item,
    };
  }

  onItemClick = (item: Item, index: number): void => {
    if (item.subItems.length) {
      this.history.push(index);
      this.setState({ item: item });
      return;
    }

    if (this.props.onItemClick)
      this.props.onItemClick(item);
  };

  onBackClick = (): void => {
    let item = this.props.item;
    for (let i = 0; i < this.history.length - 1; i++) {
      const index = this.history[i];
      item = item.subItems[index];
    }

    this.history.pop();
    this.setState({ item: item });
  };

  componentDidUpdate(prevProps: NestedListProps): void {
    if (prevProps.item !== this.props.item) {
      this.history = [];
      this.setState({ item: this.props.item });
    }
  }

  render(): JSX.Element {
    const showButton = !!this.history.length;
    const button = <img className="nested-list-back-icon" src={arrow} onClick={this.onBackClick} alt="arrow" />;
    const historyPrefix = this.history.join('_');

    return (
      <div className="nested-list" style={{ width: this.props.width || 250 }}>
        <div className="nested-list-title">
          <div className="nested-list-back-icon-cell">{showButton ? button : undefined}</div>
          <div className="nested-list-label-cell">{this.state.item.label}</div>
        </div>
        {this.state.item.subItems.map((item: Item, index: number) => (
          <NestedListItem key={`${historyPrefix}_${index}`} item={item} index={index} callback={this.onItemClick} />
        ))}
      </div>
    );
  }
}
