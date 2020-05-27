import "./TopicTree.scss";
import React from "react";
import Topic from "src/api-services/api-contract/Topic";
import Tree from "react-tree-graph";
import "react-tree-graph/dist/style.css";

interface TopicTreeProps {
  rootTopic?: Topic;
}

export class TopicTree extends React.Component<TopicTreeProps> {
  constructor(props: TopicTreeProps) {
    super(props);
  }

  private onClick = (event: any, nodeKey: any): void => {
    console.log(event, nodeKey);
  }

  render(): JSX.Element {
    const textStyle: React.CSSProperties = {
      width: 10,
      wordBreak: "break-word",
    };

    return (
      <div style={{overflowY: "auto"}}>
        <Tree
          data={this.props.rootTopic ?? {}}
          height={1800}
          width={1800}
          nodeOffset={30}
          nodeRadius={10}
          margins={{bottom : 10, left : 20, right : 150, top : 50}}
          getChildren={(node: Topic): Topic[] => node.subTopics}
          keyProp="id"
          textProps={{ style: textStyle, x: -40}}
          gProps={{
            onClick: this.onClick,
          }}
          animated
        />
      </div>
    );
  }
};

export default TopicTree;