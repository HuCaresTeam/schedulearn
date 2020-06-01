import "./TopicTree.scss";
import React from "react";
import Topic from "src/api-services/api-contract/Topic";
import Tree from "react-tree-graph";
import "react-tree-graph/dist/style.css";

interface TopicTreeProps {
  rootTopic?: Topic;
  learnedTopicIds?: number[];
  onClick?: (topicId: number) => void;
}

interface TopicTreeItem extends Topic {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gProps?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pathProps?: any;
}

interface TopicTreeState {
  topicHierarchy?: TopicTreeItem;
}

interface TopicWithHistory {
  topic: Topic;
  history: number[];
}

export class TopicTree extends React.Component<TopicTreeProps, TopicTreeState> {
  private _maxHierarchyDepth = 0;
  private _maxHierarchyWidth = 0;
  private _hierarchyWidthArray: number[] = [];
  private readonly minWidth = 1800;
  private readonly perNodeWidth = 300;
  private readonly minHeight = 500;
  private readonly perNodeHeight = 85;

  constructor(props: TopicTreeProps) {
    super(props);
    this.state = {};
  }

  private onClick = (_: unknown, nodeKey: number): void => {
    if (this.props.onClick)
      this.props.onClick(nodeKey);
  }

  private calculateHierarchyWidth(currentIndex: number): void {
    console.log(currentIndex);
    if (currentIndex >= this._hierarchyWidthArray.length)
      this._hierarchyWidthArray.push(0);

    this._hierarchyWidthArray[currentIndex] += 1;
  }

  findLearnedTopics(currentTopic: Topic, learnedTopicIds: number[], history: number[]): TopicWithHistory[] {
    this.calculateHierarchyWidth(history.length);
    const learnedTopics = currentTopic.subTopics
      .map((topic, index) => this.findLearnedTopics(topic, learnedTopicIds, [...history, index]))
      .filter((topicArr) => topicArr.length > 0);

    const flatLearnedTopics = [];
    for (const learnedTopic of learnedTopics) {
      flatLearnedTopics.push(...learnedTopic);
    }

    if (history.length > this._maxHierarchyDepth) {
      this._maxHierarchyDepth = history.length;
    }

    if (learnedTopicIds.includes(currentTopic.id)) {
      return [{topic: currentTopic, history: history}, ...flatLearnedTopics];
    }

    return [...flatLearnedTopics];
  }

  highlightTopic(rootTopic: TopicTreeItem, topicToHighlight: TopicWithHistory): void {
    let item = rootTopic;
    for (let i = 0; i < topicToHighlight.history.length; i++) {
      item.pathProps = {className: "link highlighted"};
      const index = topicToHighlight.history[i];
      item = item.subTopics[index];
    }

    item.pathProps = {className: "link highlighted"};
    item.gProps = {className: "node learned", onClick: this.onClick};
  }

  getStateFromProps(props: TopicTreeProps): TopicTreeState {
    if (!props.rootTopic)
      return {};

    if (!props.learnedTopicIds)
      return {topicHierarchy: props.rootTopic};
    
    // Make deep copy to avoid modifying props
    const rootTopic = JSON.parse(JSON.stringify(props.rootTopic));
    this._maxHierarchyDepth = 0;
    this._hierarchyWidthArray = [];

    const topicsToHighlight = this.findLearnedTopics(rootTopic, props.learnedTopicIds, []);
    this._maxHierarchyWidth = Math.max(...this._hierarchyWidthArray);

    for(const topicToHighlight of topicsToHighlight) {
      this.highlightTopic(rootTopic, topicToHighlight);
    }
    
    return {topicHierarchy: rootTopic};
  }

  componentDidMount(): void {
    this.setState(this.getStateFromProps(this.props));
  }

  componentDidUpdate(prevProps: TopicTreeProps): void {
    if (this.props.rootTopic === prevProps.rootTopic && this.props.learnedTopicIds === prevProps.learnedTopicIds)
      return;

    this.setState(this.getStateFromProps(this.props));
  }
  
  render(): JSX.Element {
    const calcualtedWidth = this._maxHierarchyDepth * this.perNodeWidth;
    const width = calcualtedWidth > this.minWidth ? calcualtedWidth : this.minWidth;

    const calcualtedHeight = this._maxHierarchyWidth * this.perNodeHeight;
    const height = calcualtedHeight > this.minHeight ? calcualtedHeight : this.minHeight;

    if (!this.state.topicHierarchy) {
      return <></>;
    }

    return (
      <div style={{ overflowX: "auto", overflowY: "auto"}}>
        <Tree
          data={this.state.topicHierarchy}
          height={height}
          width={width}
          nodeOffset={30}
          nodeRadius={10}
          margins={{bottom : 10, left : 20, right : 300, top : 50}}
          getChildren={(node: Topic): Topic[] => node.subTopics}
          keyProp="id"
          textProps={{ x: -40}}
          animated
        />
      </div>
    );
  }
};

export default TopicTree;