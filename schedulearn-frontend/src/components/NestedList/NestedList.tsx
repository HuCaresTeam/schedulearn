import React from "react";
import { NestedListItem, Item } from "./NestedListItem";
import "./NestedList.scss";
import arrow from "./back.svg";

export interface NestedListProps<TItem extends Item<TItem>> {
  item: TItem;
  onItemClick?(item: TItem, itemIndex: string): void;
  width?: number;
  selectedItemIndex?: string;
}

interface NestedListState<TItem extends Item<TItem>> {
  item: TItem;
}

export class NestedList<TItem extends Item<TItem>>
  extends React.Component<NestedListProps<TItem>, NestedListState<TItem>> {
  private history: number[] = [];

  constructor(props: NestedListProps<TItem>) {
    super(props);

    this.history = this.convertIndexToHistory(this.props.selectedItemIndex);
    this.state = {
      item: this.currentItem,
    };
  }

  private convertIndexToHistory(selectedIndex?: string): number[] {
    if (selectedIndex === undefined)
      return [];

    return selectedIndex.split("_")
      .map((value) => parseInt(value));
  }

  private get currentItem(): TItem {
    let item = this.props.item;
    for (let i = 0; i < this.history.length; i++) {
      const index = this.history[i];
      item = item.SubItems[index];
    }

    return item;
  }

  onItemClick = (item: TItem, index: number): void => {
    if (item.SubItems.length) {
      this.history.push(index);
      this.setState({ item: item });
      return;
    }

    const itemIndex = this.history.join("_");
    if (this.props.onItemClick)
      this.props.onItemClick(item, itemIndex);
  };

  onBackClick = (): void => {
    this.history.pop();
    const item = this.currentItem;
    this.setState({ item: item });
  };

  componentDidUpdate(prevProps: NestedListProps<TItem>): void {
    if (prevProps.item !== this.props.item ||
      prevProps.selectedItemIndex !== this.props.selectedItemIndex) {
      this.history = this.convertIndexToHistory(this.props.selectedItemIndex);
      const item = this.currentItem;
      this.setState({ item });
    }
  }

  render(): JSX.Element {
    const showButton = !!this.history.length;
    const button = <img className="nested-list-back-icon" src={arrow} onClick={this.onBackClick} alt="arrow" />;
    const historyPrefix = this.history.join("_");

    return (
      <div className="nested-list" style={{ width: this.props.width }}>
        <div className="nested-list-title">
          <div className="nested-list-back-icon-cell">{showButton ? button : undefined}</div>
          <div className="nested-list-label-cell">{this.state.item.Label}</div>
        </div>
        {this.state.item.SubItems.map((item: TItem, index: number) => (
          <NestedListItem
            key={`${historyPrefix}_${index}`}
            history={this.history}
            item={item}
            index={index}
            callback={this.onItemClick}
          />
        ))}
      </div>
    );
  }
}
