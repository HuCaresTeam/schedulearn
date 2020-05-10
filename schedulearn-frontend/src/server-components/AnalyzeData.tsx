import React from "react";
import TopicList, { TopicListItem } from "./TopicList";
import WorkerListByTopic from "./WorkerListByTopic";

interface AnalyzeDataState {
  topicId?: number;
}

export default class AnalyzeData extends React.Component<{}, AnalyzeDataState> {
  state: AnalyzeDataState = {};

  handleItemClick = (item: TopicListItem): void => {
    this.setState({ topicId: item.id });
  }

  render(): React.ReactNode {
    const workerList = this.state.topicId !== undefined ?
      (<WorkerListByTopic topicId={this.state.topicId} />) : undefined;

    return (
      <React.Fragment>
        <TopicList onItemClick={this.handleItemClick} />
        {workerList}
      </React.Fragment>
    );
  }
}
