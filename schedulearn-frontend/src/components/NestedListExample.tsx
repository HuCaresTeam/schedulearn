import React from 'react';
import NestedList, { Item } from './NestedList';

export default class NestedListExample extends React.Component {

    item: Item;

    constructor(props: any) {
        super(props);

        let list = [
            {
                label: "first",
                subItems: [
                    {
                        label: "first1",
                        subItems: [
                            {
                                label: "first11",
                                subItems: [
                                    {
                                        label: "first111",
                                        subItems: []
                                    },
                                    {
                                        label: "first111",
                                        subItems: []
                                    },
                                    {
                                        label: "first111",
                                        subItems: []
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        label: "first2",
                        subItems: []
                    },
                    {
                        label: "first111",
                        subItems: []
                    },
                    {
                        label: "first1117",
                        subItems: []
                    },
                ]
            },
            {
                label: "second",
                subItems: []
            },
            {
                label: "third",
                subItems: [],
            }
        ]
        this.item = {
            label: "title",
            subItems: list,
        }
    }

    callback = (item: Item) => {
        alert(item.label);
    }

    render() {
        return <NestedList item={this.item} onItemClick={this.callback} />
    }
}