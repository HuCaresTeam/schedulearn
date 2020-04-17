import React from 'react';
import ListItem from './ListItem';
import './NestedList.css';
import arrow from './back.svg';

export interface Item {
  index?: number;
  label: string;
  subItems: Item[];
}

interface Props {
  item: Item;
  onItemClick?(item: Item): void;
}

interface State {
  original?: Item;
  item?: Item;
  history: number[];
}

export default class NestedList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const item = this.props.item;
    this.giveIndexes(item);

    this.state = {
      original: item,
      item: item,
      history: [],
    };
  }

  giveIndexes(item: Item): void {
    const items = item.subItems;
    for (let i = 0; i < items.length; i++) {
      const item: Item = items[i];
      item.index = i;
      if (item.subItems.length) {
        this.giveIndexes(item);
      }
    }
  }

  onItemClick = (item: Item): void => {
    if (item.subItems.length) {
      if (item.index !== undefined) {
        this.state.history.push(item.index);
      }
      this.setState({ item: item });
    } else {
      if (this.props.onItemClick != null) {
        this.props.onItemClick(item);
      }
    }
  };

  onBackClick = (): void => {
    const history = this.state.history;
    let item = this.state.original;

    if (item === undefined) return;

    for (let i = 0; i < history.length - 1; i++) {
      const index = history[i];
      item = item.subItems[index];
    }
    history.pop();
    this.setState({
      item: item,
      history: history,
    });
  };

  render(): JSX.Element {
    const showButton = this.state.history.length;

    const button = <img className="backIcon" src={arrow} onClick={this.onBackClick} alt="arrow" />;

    const table = (
      <table className="titleTable">
        <tr>
          <td className="backIconCell">{showButton ? button : null}</td>
          <td>{this.state.item?.label}</td>
        </tr>
      </table>
    );

    return (
      <div className="box">
        <div className="title">{table}</div>
        {this.state.item?.subItems.map((item: Item) => (
          <ListItem item={item} callback={this.onItemClick}></ListItem>
        ))}
      </div>
    );
  }
}
