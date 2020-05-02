import React from "react";
import { WorkerListItem } from "../components/WorkerList/WorkerList";
import WorkerList from "../components/WorkerList/WorkerList";
import dotnetify, { dotnetifyVM } from "dotnetify";

interface WorkerListByTopicProps {
  topicId: number;
}

interface WorkerListByTopicState {
  WorkersByTopic: WorkerListItem[];
  vm?: dotnetifyVM;
}

export default class WorkerListByTopic extends React.Component<WorkerListByTopicProps, WorkerListByTopicState> {
  constructor(props: WorkerListByTopicProps) {
    super(props);
    this.state = {
      WorkersByTopic: [],
    };
  }

  componentDidMount(): void {
    const vmArg = { GetWorkersByTopic: { topicId: this.props.topicId } };
    const vm = dotnetify.react.connect("AnalyzeDataVM", this, { vmArg });
    this.setState({ vm });
  }

  componentWillUnmount(): void {
    if (this.state.vm !== undefined)
      this.state.vm.$destroy();
  }

  componentDidUpdate(prevProps: WorkerListByTopicProps): void {
    if (prevProps.topicId !== this.props.topicId) {
      this.$dispatch({ GetWorkersByTopic: { topicId: this.props.topicId } });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $dispatch = (iValue: any): void => {
    if (this.state.vm !== undefined)
      this.state.vm.$dispatch(iValue);
  };

  render(): JSX.Element {
    return (
      <WorkerList items={this.state.WorkersByTopic}></WorkerList>
    );
  }
}
