import React from 'react';
import { Item } from './NestedList';
import "./ListItem.css";
import arrow from './next.svg';

interface Props {
    item: Item;
    callback(item: Item): void;
}

export default class ListItem extends React.Component<Props, {}> {
    constructor(props: any) {
        super(props);
    }
    handler = () => {
        this.props.callback(this.props.item);
    }
    render() {
        let icon: any = "";
        if (this.props.item.subItems.length) {
            icon = <img className="icon" src={arrow} alt="arrow" />
        }

        return <div className="item" onClick={(this.handler)}>
            <table>
                <tr>
                    <td><div className="label">{this.props.item.label}</div></td>
                    <td className="iconCell">{icon}</td>
                </tr>
            </table>
        </div>
    };
}