import React from "react";
import dotnetify, { dotnetifyVM } from "dotnetify";
import { UserContext, UserState, User } from "src/components/Contexts/UserContext";
import { LearningDay } from "src/components/Calendar/LearningDayCalendar";
dotnetify.hubServerUrl = "http://localhost:5000";

export interface LearningDayProviderState {
  UserLearningDays?: LearningDay[] | null;
  AllLearningDays?: LearningDay[] | null;
  vm?: dotnetifyVM;
}

interface LearningDayProviderProps {
  children: React.ReactNode;
}

export interface LearningDayContextValue extends LearningDayProviderState {
  user?: User;
}

export const LearningDayContext = React.createContext<LearningDayContextValue>({});

export default class LearningDayProvider extends React.Component<LearningDayProviderProps, LearningDayProviderState> {
  private currentUser?: User;

  constructor(props: LearningDayProviderProps) {
    super(props);
    this.state = {};
  }

  $dispatch = (iValue: unknown): void => {
    if (this.state.vm !== undefined)
      this.state.vm.$dispatch(iValue);

  };

  componentDidMount(): void {
    const vm = dotnetify.react.connect("LearningDayVM", this);
    this.setState({ vm });
  }

  getUserCalendar(): void {
    if (!this.currentUser)
      return;

    this.$dispatch({ GetUserLearningDays: { Id: this.currentUser.Id } });
  }

  componentWillUnmount(): void {
    if (this.state.vm !== undefined)
      this.state.vm.$destroy();
  }

  renderWithContext = (context: UserState): React.ReactNode => {
    if (this.currentUser?.Id !== context.user?.Id) {
      this.currentUser = context.user;
      this.getUserCalendar();
    }

    return (
      <LearningDayContext.Provider value={{ user: this.currentUser, ...this.state }}>
        {this.props.children}
      </LearningDayContext.Provider>
    );
  }

  render(): React.ReactNode {
    return (
      <UserContext.Consumer>
        {this.renderWithContext}
      </UserContext.Consumer>
    );
  }
}
