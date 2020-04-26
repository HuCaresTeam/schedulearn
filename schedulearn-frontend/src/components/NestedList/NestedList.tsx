import React from "react";
import { NestedListItem, Item } from "./NestedListItem";
import "./NestedList.scss";
import arrow from "./back.svg";

export interface NestedListProps<TItem extends Item<TItem>> {
  rootItem: TItem;
  onItemClick?(item: TItem): void;
  width?: number;
  selectedItemId?: number;
  selectable?: boolean;
}

interface NestedListState<TItem extends Item<TItem>> {
  currentItem: TItem;
}

export class NestedList<TItem extends Item<TItem>>
  extends React.Component<NestedListProps<TItem>, NestedListState<TItem>> {
  private history: number[] = [];

  constructor(props: NestedListProps<TItem>) {
    super(props);

    this.history = this.convertIdToHistory(this.props.selectedItemId);
    const currentItem = this.currentItem;
    this.state = { currentItem };
  }

  private get currentItem(): TItem {
    let item = this.props.rootItem;
    for (let i = 0; i < this.history.length; i++) {
      const index = this.history[i];
      item = item.SubItems[index];
    }

    return item;
  }

  private convertIdToHistory(selectedId?: number): number[] {
    if (selectedId === undefined)
      return [];

    const result = this.findHistoryById(selectedId, this.props.rootItem, []);
    if (result === undefined)
      throw new Error("Id does not exist on ty");

    return result;
  }

  private findHistoryById(selectedId: number, item: TItem, currentHistory: number[]): number[] | undefined {
    if (item.Id === selectedId)
      return currentHistory;

    for (const [index, subItem] of item.SubItems.entries()) {
      const nextHistory = [...currentHistory, index];
      const result = this.findHistoryById(selectedId, subItem, nextHistory);
      if (result !== undefined)
        return result;
    }

    return undefined;
  }

  onListItemClick = (item: TItem, index: number): void => {
    if (item.SubItems.length) {
      this.history.push(index);
      this.setState({ currentItem: item });
      return;
    }

    if (this.props.onItemClick)
      this.props.onItemClick(item);
  };

  onCurrentItemClick = (): void => {
    if (this.props.onItemClick)
      this.props.onItemClick(this.state.currentItem);
  }

  onBackClick = (): void => {
    this.history.pop();
    const item = this.currentItem;
    this.setState({ currentItem: item });
  };

  componentDidUpdate(prevProps: NestedListProps<TItem>): void {
    if (prevProps.rootItem !== this.props.rootItem ||
      prevProps.selectedItemId !== this.props.selectedItemId) {
      this.history = this.convertIdToHistory(this.props.selectedItemId);
      const currentItem = this.currentItem;
      this.setState({ currentItem });
    }
  }

  render(): JSX.Element {
    const showButton = !!this.history.length;
    const backButton = <img className="nested-list-back-icon" src={arrow} onClick={this.onBackClick} alt="arrow" />;
    const selectButton = (
      <button type="button" className="nested-list-selector" onClick={this.onCurrentItemClick}>
        Select this item
      </button>
    );

    return (
      <div className="nested-list" style={{ width: this.props.width }}>
        <div className="nested-list-title">
          <div className="nested-list-back-icon-cell" onClick={this.onBackClick}>
            {showButton ? backButton : undefined}
          </div>
          <div className="nested-list-label-cell">{this.state.currentItem.Label}</div>
          <div className="nested-list-selector-cell">{this.props.selectable ? selectButton : undefined}</div>
        </div>
        {this.state.currentItem.SubItems.map((item: TItem, index: number) => (
          <NestedListItem
            key={item.Id}
            history={this.history}
            item={item}
            index={index}
            callback={this.onListItemClick}
          />
        ))}
      </div>
    );
  }
}
