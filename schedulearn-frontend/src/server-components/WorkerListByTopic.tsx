import React from "react";
import { WorkerListItem } from "../components/WorkerList/WorkerList";
import WorkerList from "../components/WorkerList/WorkerList";
import dotnetify, { dotnetifyVM } from "dotnetify";

interface WorkerListByTopicProps {
  topicId: number;
}

interface WorkerListByTopicState {
  WorkersByTopic?: WorkerListItem[];
  VM?: dotnetifyVM;
}

export default class WorkerListByTopic extends React.Component<WorkerListByTopicProps, WorkerListByTopicState> {
  constructor(props: WorkerListByTopicProps) {
    super(props);
    this.state = { };
  }

  componentDidMount(): void {
    const vm = dotnetify.react.connect("AnalyzeDataVM", this, {vmArg: {GetWorkersByTopic: {topicId: this.props.topicId}}});
    this.setState({ VM: vm });
  }

  componentWillUnmount(): void {
    if (this.state.VM !== undefined)
      this.state.VM.$destroy();
  }

  componentDidUpdate(prevProps: WorkerListByTopicProps): void {
    if(prevProps.topicId !== this.props.topicId) {
      this.$dispatch({GetWorkersByTopic: {topicId: this.props.topicId}});
    }
  }

  $dispatch = (iValue: any): void => {
    if (this.state.VM !== undefined)
      this.state.VM.$dispatch(iValue);
  };

  render(): JSX.Element {
    if(!this.state.WorkersByTopic) {
      return (
        <p>Loading workers</p>
      );
    }
    return (
      <WorkerList items={this.state.WorkersByTopic}></WorkerList>
    );
  }
}
