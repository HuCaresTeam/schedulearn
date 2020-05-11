import React from "react";
import { LearningDayCalendar, ColoredLearningDayEvent } from "src/components/Calendar/LearningDayCalendar";
import UserContext from "src/UserContext";
import LearningDayWithUser from "src/api-contract/LearningDayWithUser";
import ManagedTeamsSelect from "./ManagedTeamsSelect";

export interface LearningDayState {
  teamLearningDays?: ColoredLearningDayEvent[];
  currentTeamId?: number;
}

export class TeamLearningDayCalendar extends React.Component<{}, LearningDayState> {
  state: LearningDayState = {};

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

  fetchTeamLearningDays = (teamId: number): void => {
    UserContext
      .fetch(`api/learningDay/team/${teamId}`)
      .then((response) => {
        if (!response.ok)
          return;

        return response.json();
      })
      .then((learningDays: LearningDayWithUser[]) => {
        const learningDayEvents = learningDays.map(this.learningDayToEvent);
        this.setState({ teamLearningDays: learningDayEvents });
      });
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <ManagedTeamsSelect onTeamChange={this.fetchTeamLearningDays} />
        <LearningDayCalendar
          learningDayEvents={this.state.teamLearningDays ?? []}
          disabled={true}
        />
      </React.Fragment>
    );
  }
}
