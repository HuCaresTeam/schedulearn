import React from "react";
import TopicList from "./TopicList";
import WorkerListByTopic from "./WorkerListByTopic";
import { FullTopic } from "./TopicListProvider";

interface AnalyzeDataState {
  topicId?: number;
}

export default class AnalyzeData extends React.Component<{}, AnalyzeDataState> {
  state: AnalyzeDataState = {};

  handleItemClick = (item: FullTopic): void => {
    this.setState({ topicId: item.Id });
  }

  render(): React.ReactNode {
    const workerList = this.state.topicId !== undefined ? (<WorkerListByTopic topicId={this.state.topicId}/>) : undefined;

    return (
      <React.Fragment>
        <TopicList onItemClick={this.handleItemClick}/>
        {workerList}
      </React.Fragment>
    );
  }
}
