import React from "react";
import UserContext from "src/api-services/UserContext";
import { Topic } from "src/api-services/api-contract/Topic";
import TopicTree from "src/components/TopicTree/TopicTree";
import LearningDayWithUser from "src/api-services/api-contract/LearningDayWithUser";
import { TeamUserSelector } from "./TeamUserSelector";
import { EventModal } from "src/components/Calendar/EventModal";
import LearningDaysByTopic from "./LearningDaysByTopic";
import { TeamListItem } from "src/components/TeamsList/TeamList";

export interface RootTopicTreeState {
  rootTopic?: Topic;
  learnedTopicIds?: number[];
  isModalOpen: boolean;
  topicId?: number;
  currentTeam?: TeamListItem;
  currentUserId?: number;
}

export default class TeamTopicTree extends React.Component<{}, RootTopicTreeState> {
  state: RootTopicTreeState = {
    isModalOpen: false,
  }

  fetchByTeamId(teamId: number): Promise<LearningDayWithUser[]> {
    return UserContext.fetch(`api/learningDay/team/${teamId}`);
  }

  fetchByUserId(userId: number): Promise<LearningDayWithUser[]> {
    return UserContext.fetch(`api/learningDay/user/${userId}`);
  }

  onSelect = (team?: TeamListItem, userId?: number): void => {
    this.setState({currentTeam: team, currentUserId: userId});

    UserContext
      .fetch("api/topic")
      .then((rootTopic: Topic) => {
        this.setState({ rootTopic });
      });

    if (!team) {
      this.setState({ learnedTopicIds: undefined });
      return;
    }
  
    const fetch = userId ? this.fetchByUserId(userId) : this.fetchByTeamId(team.teamId);
    fetch.then((learningDays: LearningDayWithUser[]) => {
      let learnedTopicIds = learningDays.map((learningDay) => learningDay.topicId);
      learnedTopicIds = [...new Set(learnedTopicIds)];

      this.setState({ learnedTopicIds });
    });
  }

  onTopicClick = (topicId: number): void => {
    if (this.state.currentUserId)
      return;

    this.setState({topicId, isModalOpen: true});
  }

  handleModalClose = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    this.setState({ isModalOpen: false });
  }

  render(): React.ReactNode {      
    return (
      <React.Fragment>
        <EventModal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.handleModalClose}
        >
          {(): React.ReactNode => (
            <LearningDaysByTopic topicId={this.state.topicId} managerId={this.state.currentTeam?.managerId}/>
          )}
        </EventModal>

        <TeamUserSelector onSelect={this.onSelect}/>
        <TopicTree 
          rootTopic={this.state.rootTopic}
          learnedTopicIds={this.state.learnedTopicIds}
          onClick={this.onTopicClick}
        />
      </React.Fragment>
    );
  }
}
