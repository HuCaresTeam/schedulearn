import React from 'react';
import ListItem from './ListItem';
import './NestedList.css';
import arrow from './back.svg';

export interface Item {
    index?: number
    label: string;
    subItems: Item[];
}

interface Props {
    item: Item;
    onItemClick?(item: Item): void;
}

export default class NestedList extends React.Component<Props, {}> {

    state: {
        original?: Item,
        item?: Item,
        history: number[],
    } = {
            history: [],
        }

    constructor(props: any) {
        super(props);
        let item = this.props.item;
        this.giveIndexes(item);

        this.state.original = item;
        this.state.item = item;
    }

    giveIndexes(item: Item) {
        let items = item.subItems;
        for (let i = 0; i < items.length; i++) {
            let item: Item = items[i];
            item.index = i;
            if (item.subItems.length) {
                this.giveIndexes(item);
            }
        }
    }

    onItemClick = (item: any) => {
        if (item.subItems.length) {
            this.state.history.push(item.index);
            this.setState({ item: item });
        } else {
            if (this.props.onItemClick != null) {
                this.props.onItemClick(item);
            }
        }
    }

    onBackClick = () => {
        let history = this.state.history;
        let item = this.state.original;

        if (item == null) {
            return;
        }

        for (let i = 0; i < history.length - 1; i++) {
            let index = history[i];
            item = item.subItems[index];
        }
        history.pop();
        this.setState({
            item: item,
            history: history,
        });
    }

    render() {
        const visibility: any = {
            visibility: this.state.history.length ? "visible" : "hidden",
        };

        let button = <img className="backIcon" src={arrow} onClick={this.onBackClick} alt="arrow" style={visibility} />;

        let table = <table className="titleTable">
            <tr>
                <td className="backIconCell">{button}</td>
                <td>{this.state.item?.label}</td>
            </tr>
        </table>

        return <div className="box">
            <div className="title">{table}</div>
            {this.state.item?.subItems.map((item: Item) => (
                <ListItem item={item} callback={this.onItemClick}></ListItem>
            ))}
        </div>
    };
}