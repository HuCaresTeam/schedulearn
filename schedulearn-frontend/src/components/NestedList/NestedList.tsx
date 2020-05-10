import React from "react";
import { NestedListItem, ListItem } from "./NestedListItem";
import "./NestedList.scss";
import arrow from "./back.svg";
import info from "./info.svg";
import { ItemInfoModal } from "./ItemInfoModal";

export interface NestedListProps<TItem extends ListItem<TItem>> {
  rootItem: TItem;
  onItemClick?(item: TItem): void;
  width?: number;
  selectedItemId?: number;
  disabled?: boolean;
  maxHeight?: number;
}

interface NestedListState<TItem extends ListItem<TItem>> {
  currentItem: TItem;
  modalVisible: boolean;
  modalDescription: string;
  posX: number;
  posY: number;
}

export class NestedList<TItem extends ListItem<TItem>>
  extends React.Component<NestedListProps<TItem>, NestedListState<TItem>> {
  private history: number[] = [];

  constructor(props: NestedListProps<TItem>) {
    super(props);

    this.history = this.convertIdToHistory(this.props.selectedItemId);
    const currentItem = this.currentItem;
    this.state = { currentItem: currentItem, modalVisible: false, modalDescription: "", posX: 0, posY: 0 };
  }

  private get currentItem(): TItem {
    let item = this.props.rootItem;
    for (let i = 0; i < this.history.length; i++) {
      const index = this.history[i];
      item = item.subItems[index];
    }

    return item;
  }

  private convertIdToHistory(selectedId?: number): number[] {
    if (selectedId === undefined)
      return [];

    const result = this.findHistoryById(selectedId, this.props.rootItem, []);
    if (result === undefined)
      throw new Error(`Id does not exist on root topic: ${selectedId}`);

    return result;
  }

  private findHistoryById(selectedId: number, item: TItem, currentHistory: number[]): number[] | undefined {
    if (item.id === selectedId)
      return currentHistory;

    for (const [index, subItem] of item.subItems.entries()) {
      const nextHistory = [...currentHistory, index];
      const result = this.findHistoryById(selectedId, subItem, nextHistory);

      if (result !== undefined)
        return result;
    }

    return undefined;
  }

  onListItemClick = (item: TItem, index: number): void => {
    this.history.push(index);
    this.setState({ currentItem: item });
    this.tryCallOnItemClick(item);
  };

  onInfoItemClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>, item: TItem): void => {
    this.setState({modalVisible: true, modalDescription: item.description, posX: event.pageX, posY: event.pageY});
  }

  onCurrentItemClick = (): void => {
    this.tryCallOnItemClick(this.state.currentItem);
  }

  tryCallOnItemClick = (item: TItem): void => {
    if (this.props.onItemClick)
      this.props.onItemClick(item);
  }

  onBackClick = (): void => {
    this.history.pop();
    const item = this.currentItem;
    this.setState({ currentItem: item });
    this.tryCallOnItemClick(item);
  };

  componentDidMount(): void {
    if (this.props.onItemClick)
      this.props.onItemClick(this.currentItem);
  }

  componentDidUpdate(prevProps: NestedListProps<TItem>): void {
    if (prevProps.rootItem !== this.props.rootItem ||
      prevProps.selectedItemId !== this.props.selectedItemId) {
      this.history = this.convertIdToHistory(this.props.selectedItemId);
      const currentItem = this.currentItem;
      if (this.props.onItemClick)
        this.props.onItemClick(this.currentItem);

      this.setState({ currentItem });
    }
  }

  handleModalClose = (): void => {
    this.setState({ modalVisible: false });
  }

  render(): JSX.Element {
    const showButton = !!this.history.length;
    const backButton = <img className="nested-list-back-icon" src={arrow} alt="arrow" />;

    const modal = <ItemInfoModal 
      isOpen={this.state.modalVisible} 
      onRequestClose={this.handleModalClose}
      description={this.state.modalDescription}
      posX={this.state.posX}
      posY={this.state.posY}
    />;

    const infoIcon = <img className="nested-list-info-icon"
      src={info}
      alt="info" 
      onClick={(event): void => this.onInfoItemClick(event, this.state.currentItem)}
    />;

    return (
      <div className="nested-list" style={{ width: this.props.width }}>
        <div className="nested-list-title">
          <div className="nested-list-back-icon-cell" onClick={this.onBackClick}>
            {showButton ? backButton : undefined}
          </div>
          <div className="nested-list-label-cell">{this.state.currentItem.label}</div>
          {infoIcon}
        </div>
        <div style={{overflow: "auto", maxHeight: (this.props.maxHeight ? this.props.maxHeight : -1)}}>
          {this.state.currentItem.subItems.map((item: TItem, index: number) => (
            <NestedListItem
              key={item.id}
              history={this.history}
              item={item}
              index={index}
              callback={this.onListItemClick}
              infoCallback={this.onInfoItemClick}
            />
          ))}
        </div>
        {modal}
      </div>
    );
  }
}
