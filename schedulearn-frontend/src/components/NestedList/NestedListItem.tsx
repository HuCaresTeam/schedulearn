import React from "react";
import "./NestedListItem.scss";
import arrow from "./next.svg";

export interface Item<TItem> {
  label: string;
  subItems: TItem[];
}

export interface NestedListItemProps<TItem extends Item<TItem>> {
  history: number[];
  item: TItem;
  index: number;
  callback(item: TItem, index: number, history: number[]): void;
}

export class NestedListItem<TItem extends Item<TItem>> extends React.PureComponent<NestedListItemProps<TItem>> {
  handler = (): void => {
    this.props.callback(this.props.item, this.props.index, this.props.history);
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
