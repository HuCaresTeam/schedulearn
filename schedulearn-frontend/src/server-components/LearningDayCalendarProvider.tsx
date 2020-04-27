import React from "react";
import dotnetify, { dotnetifyVM } from "dotnetify";
import { LearningDay } from "src/components/LearningDayCalendar";
dotnetify.hubServerUrl = "http://localhost:5000";

export interface LearningDayProviderState {
  UserLearningDays?: LearningDay[] | null;
  AllLearningDays?: LearningDay[] | null;
  vm?: dotnetifyVM;
}

interface LearningDayProviderProps {
  children: React.ReactNode;
}

export const LearningDayContext = React.createContext<LearningDayProviderState>({});

export default class LearningDayProvider extends
  React.Component<LearningDayProviderProps, LearningDayProviderState> {

  constructor(props: LearningDayProviderProps) {
    super(props);
    this.state = {};
  }

  $dispatch = (iValue: unknown): void => {
    if (this.state.vm !== undefined)
      this.state.vm.$dispatch(iValue);

  };

  componentDidMount(): void {
    const vm = dotnetify.react.connect("LearningDayVM", this, { vmArg: { GetUserLearningDays: { Id: 1 } } });
    this.setState({ vm });
  }

  componentWillUnmount(): void {
    if (this.state.vm !== undefined)
      this.state.vm.$destroy();
  }

  render(): React.ReactNode {
    return (
      <LearningDayContext.Provider value={this.state}>
        {this.props.children}
      </LearningDayContext.Provider>
    );
  }
}
