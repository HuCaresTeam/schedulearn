import React from "react";
import { NestedListItem, ListItem } from "./NestedListItem";
import { TopicAddModal } from "./TopicAddModal";
import { TopicForm } from "./TopicAddForm";
import "./NestedList.scss";
import arrow from "./back.svg";

export interface NestedListProps<TItem extends ListItem<TItem>> {
  rootItem: TItem;
  onItemClick?(item: TItem): void;
  width?: number;
  selectedItemId?: number;
  disabled?: boolean;
  displayAddOption?: boolean;
  onAddOptionSubmit?: (topic: TopicForm) => Promise<TopicForm | undefined>;
}

interface NestedListState<TItem extends ListItem<TItem>> {
  currentItem: TItem;
  isTopicModalOpen: boolean;
  isTopicModalDisabled: boolean;
  topic?: TopicForm;
  displayAddOption?: boolean;
}

export class NestedList<TItem extends ListItem<TItem>>
  extends React.Component<NestedListProps<TItem>, NestedListState<TItem>> {
  private history: number[] = [];

  constructor(props: NestedListProps<TItem>) {
    super(props);

    this.history = this.convertIdToHistory(this.props.selectedItemId);
    const currentItem = this.currentItem;
    this.state = { 
      currentItem, 
      isTopicModalOpen: false,
      isTopicModalDisabled: true,
      topic: {parentTopicId: currentItem.id}, 
      displayAddOption: props.displayAddOption,
    };
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
      throw new Error("Id does not exist on root topic.");

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
      this.props.onItemClick(this.props.rootItem);
  }

  componentDidUpdate(prevProps: NestedListProps<TItem>): void {
    if (prevProps.rootItem !== this.props.rootItem ||
      prevProps.selectedItemId !== this.props.selectedItemId) {
      this.history = this.convertIdToHistory(this.props.selectedItemId);
      const currentItem = this.currentItem;
      if (this.props.onItemClick)
        this.props.onItemClick(this.props.rootItem);

      this.setState({ currentItem });
    }
  }

  getInsertNewTopicTItem = (): ListItem<TItem> => {
    return {
      id: 0,
      label: "Think you're better than all the rest? Then create your own topic you unthankful prick",
      subItems:[],
    }
  }

  onNewAddNewTopicClick = (): void => {
    this.setState({
      isTopicModalOpen: true,
      isTopicModalDisabled: false,
      topic: {
        parentTopicId: this.currentItem.id,
      }
    })
  }

  onTopicAddClose = (_: React.MouseEvent | React.KeyboardEvent): void => {
    this.setState({
      isTopicModalOpen: false,
      isTopicModalDisabled: true,
    })
  }

  // TODO: fix return promise if no onAddOptionSubmit is set
  tryOnAddOptionSubmit = (topic: TopicForm): Promise<TopicForm | undefined> => {
    if(this.props.onAddOptionSubmit) {
      return this.props.onAddOptionSubmit(topic);
    } else {
      // Not sure if this works
      return new Promise<TopicForm>(() => {return {}})
    }
  }

  onTopicAddSubmit = (topic: TopicForm): void => {
    this.setState({
      isTopicModalOpen: false,
      isTopicModalDisabled: true,
    })

    console.log("Topic add initiated!");
    console.log(topic);

    this.tryOnAddOptionSubmit(topic).then(
      (topic: TopicForm | undefined): void => {
        if(topic) {
          this.setState({
            topic: topic,
          })
        } else {
          // Handle an error
        }
    })
  }

  render(): JSX.Element {
    const showButton = !!this.history.length;
    const backButton = <img className="nested-list-back-icon" src={arrow} alt="arrow" />;

    return (
      <React.Fragment>
        {/** TODO: Add if clause that checks if state.displayAddOption is true */}
          <TopicAddModal
            isOpen={this.state.isTopicModalOpen}
            disabled={this.state.isTopicModalDisabled}
            topic={this.state.topic}
            onRequestClose={this.onTopicAddClose}
            onEventSubmit={this.onTopicAddSubmit}
          />

        <div className="nested-list" style={{ width: this.props.width }}>
          <div className="nested-list-title">
            <div className="nested-list-back-icon-cell" onClick={this.onBackClick}>
              {showButton ? backButton : undefined}
            </div>
            <div className="nested-list-label-cell">{this.state.currentItem.label}</div>
          </div>
          {this.state.currentItem.subItems.map((item: TItem, index: number) => (
            <NestedListItem
              key={item.id}
              history={this.history}
              item={item}
              index={index}
              callback={this.onListItemClick}
            />
          ))}
          <NestedListItem
              key={123}
              history={this.history}
              item={this.getInsertNewTopicTItem()}
              index={0}
              callback={this.onNewAddNewTopicClick}
          />
        </div>
      </React.Fragment>
    );
  }
}
