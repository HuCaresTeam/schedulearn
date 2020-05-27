import React from "react";
import "./NestedListItem.scss";
import { ReactComponent as Info } from "./info.svg";

export interface ListItem<TItem> {
  id: number;
  label: string;
  description: string;
  subItems: TItem[];
}

export interface NestedListItemProps<TItem extends ListItem<TItem>> {
  history: number[];
  item: TItem;
  index: number;
  disabled?: boolean;
  callback(item: TItem, index: number, history: number[]): void;
  infoCallback(event: React.MouseEvent<HTMLImageElement, MouseEvent>, item: TItem): void;
}

export class NestedListItem<TItem extends ListItem<TItem>> extends React.PureComponent<NestedListItemProps<TItem>> {
  itemClick = (): void => {
    this.props.callback(this.props.item, this.props.index, this.props.history);
  };

  infoClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>): void => {
    e.stopPropagation();
    this.props.infoCallback(e, this.props.item);
  }

  render(): JSX.Element {
    let className = "nested-list-item";
    className += this.props.disabled ? " disabled" : " enabled";

    return (
      <div className={className} onClick={this.props.disabled ? undefined : this.itemClick} >
        {this.props.item.label}
        <div onClick={this.infoClick}><Info className="nested-list-info-icon"/></div>
      </div>
    );
  }
}
