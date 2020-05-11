import React from "react";
import { LearningDayCalendar, ColoredLearningDayEvent } from "src/components/Calendar/LearningDayCalendar";
import UserContext from "src/UserContext";
import LearningDayWithUser from "src/api-contract/LearningDayWithUser";
import ManagedTeamsSelect from "./ManagedTeamsSelect";
import UsersInTeamList from "./UsersInTeamList";

export interface TeamLearningDayCalendarState {
  teamLearningDays?: ColoredLearningDayEvent[];
  currentTeamId?: number;
  currentUserId?: number;
}

export class TeamLearningDayCalendar extends React.Component<{}, TeamLearningDayCalendarState> {
  state: TeamLearningDayCalendarState = {};

  private learningDayToEvent(learningDay: LearningDayWithUser): ColoredLearningDayEvent {
    return {
      id: learningDay.id,
      title: learningDay.topicTitle,
      start: new Date(learningDay.dateFrom),
      end: new Date(learningDay.dateTo),
      topicId: learningDay.topicId,
      description: learningDay.description,
      userId: learningDay.userId,
      colorId: learningDay.userId,
    };
  }

  handleTeamSelect = (teamId: number): void => {
    this.setState({ currentTeamId: teamId, currentUserId: undefined });
  }

  handleUserSelect = (userId?: number): void => {
    this.setState({ currentUserId: userId });
  }

  fetchByTeamId(teamId: number): Promise<Response> {
    return UserContext
      .fetch(`api/learningDay/team/${teamId}`);
  }

  fetchByUserId(userId: number): Promise<Response> {
    return UserContext
      .fetch(`api/learningDay/user/${userId}`);
  }

  componentDidUpdate(_: {}, prevState: TeamLearningDayCalendarState): void {
    if (prevState.currentTeamId === this.state.currentTeamId &&
      prevState.currentUserId === this.state.currentUserId) {
      return;
    }

    if (!this.state.currentTeamId) {
      this.setState({ teamLearningDays: undefined });
      return;
    }

    const fetch = this.state.currentUserId ? this.fetchByUserId(this.state.currentUserId) : this.fetchByTeamId(this.state.currentTeamId);
    fetch.then((response) => {
      if (!response.ok)
        return;

      return response.json();
    }).then((learningDays: LearningDayWithUser[]) => {
      const learningDayEvents = learningDays.map(this.learningDayToEvent);
      this.setState({ teamLearningDays: learningDayEvents });
    });
  }

  render(): React.ReactNode {
    let usersInTeamList;
    if (this.state.currentTeamId)
      usersInTeamList = <UsersInTeamList teamId={this.state.currentTeamId} onUserChange={this.handleUserSelect} />;

    return (
      <React.Fragment>
        <ManagedTeamsSelect onTeamChange={this.handleTeamSelect} />
        {usersInTeamList}
        <LearningDayCalendar
          learningDayEvents={this.state.teamLearningDays ?? []}
          disabled={true}
        />
      </React.Fragment>
    );
  }
}
