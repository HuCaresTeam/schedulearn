import React from "react";
import { Item } from "./NestedListItem";
import { NestedList } from "./NestedList";

export interface Topic extends Item<Topic> {
  topicId: number;
}

export default class NestedListExample extends React.Component {
  item: Topic = {
    topicId: 5,
    label: "title",
    subItems: [
      {
        topicId: 57,
        label: "first",
        subItems: [
          {
            topicId: 100,
            label: "first1",
            subItems: [
              {
                topicId: 5400,
                label: "first11",
                subItems: [
                  {
                    topicId: 5700,
                    label: "first111",
                    subItems: [],
                  },
                  {
                    topicId: 5800,
                    label: "first111",
                    subItems: [],
                  },
                  {
                    topicId: 5900,
                    label: "first111",
                    subItems: [],
                  },
                ],
              },
            ],
          },
          {
            topicId: 101,
            label: "first2",
            subItems: [],
          },
          {
            topicId: 102,
            label: "first111",
            subItems: [],
          },
          {
            topicId: 103,
            label: "first1117",
            subItems: [],
          },
        ],
      },
      {
        topicId: 6,
        label: "second",
        subItems: [],
      },
      {
        topicId: 7,
        label: "third",
        subItems: [],
      },
    ],
  };

  callback = (item: Topic): void => {
    alert(item.label);
  };

  render(): JSX.Element {
    return <NestedList item={this.item} onItemClick={this.callback} width={400} selectedItemIndex={"0_0"} />;
  }
}
