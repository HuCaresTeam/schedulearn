import React from "react";
import { LearningDayCalendar, ColoredLearningDayEvent } from "src/components/Calendar/LearningDayCalendar";
import UserContext from "src/api-services/UserContext";
import LearningDayWithUser from "src/api-services/api-contract/LearningDayWithUser";
import { TeamUserSelector } from "./TeamUserSelector";
import { TeamListItem } from "src/components/TeamsList/TeamList";

export interface TeamLearningDayCalendarState {
  teamLearningDays?: ColoredLearningDayEvent[];
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

  fetchByTeamId(teamId: number): Promise<LearningDayWithUser[]> {
    return UserContext.fetch(`api/learningDay/team/${teamId}`);
  }

  fetchByUserId(userId: number): Promise<LearningDayWithUser[]> {
    return UserContext.fetch(`api/learningDay/user/${userId}`);
  }

  onSelect = (team?: TeamListItem, userId?: number): void => {
    if (!team) {
      this.setState({ teamLearningDays: undefined });
      return;
    }

    const fetch = userId ? this.fetchByUserId(userId) : this.fetchByTeamId(team.teamId);
    fetch.then((learningDays: LearningDayWithUser[]) => {
      const learningDayEvents = learningDays.map(this.learningDayToEvent);
      this.setState({ teamLearningDays: learningDayEvents });
    });
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <TeamUserSelector onSelect={this.onSelect}/>
        <LearningDayCalendar
          learningDayEvents={this.state.teamLearningDays ?? []}
          disabled={true}
        />
      </React.Fragment>
    );
  }
}
