import React from "react";
import UserContext from "src/api-services/UserContext";
import { Topic } from "src/api-services/api-contract/Topic";
import TopicTree from "src/components/TopicTree/TopicTree";
import LearningDayWithUser from "src/api-services/api-contract/LearningDayWithUser";
import { TeamUserSelector } from "./TeamUserSelector";
import LearningDaysByTopic from "./LearningDaysByTopic";
import { TeamListItem } from "src/components/TeamsList/TeamList";
import { CustomModal } from "src/components/Modal/CustomModal";
import User from "src/api-services/api-contract/User";

export interface RootTopicTreeState {
  rootTopic?: Topic;
  learnedTopicIds?: number[];
  isModalOpen: boolean;
  topicId?: number;
  currentTeam?: TeamListItem;
  currentUserId?: number;
  height: number;
}

export default class TeamTopicTree extends React.Component<{}, RootTopicTreeState> {
  state: RootTopicTreeState = {
    isModalOpen: false,
    height: window.innerHeight,
  }

  fetchByTeamId(teamId: number): Promise<LearningDayWithUser[]> {
    return UserContext.fetch(`api/learningDay/team/${teamId}`);
  }

  fetchByUserId(userId: number): Promise<LearningDayWithUser[]> {
    return UserContext.fetch(`api/learningDay/user/${userId}`);
  }

  onSelect = (team?: TeamListItem, user?: User): void => {
    this.setState({currentTeam: team, currentUserId: user?.id});

    UserContext
      .fetch("api/topic")
      .then((rootTopic: Topic) => {
        this.setState({ rootTopic });
      });

    if (!team) {
      this.setState({ learnedTopicIds: undefined });
      return;
    }
  
    const fetch = user?.id ? this.fetchByUserId(user.id) : this.fetchByTeamId(team.teamId);
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

  handleModalClose = (): void => {
    this.setState({ isModalOpen: false });
  }

  updateDimensions = (): void => {
    this.setState({height: window.innerHeight });
  };

  componentDidMount(): void {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount = (): void => {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render(): React.ReactNode {      
    return (
      <React.Fragment>
        <CustomModal
          title="Topic Learning Days"
          isOpen={this.state.isModalOpen}
          onRequestClose={this.handleModalClose}
        >
          {(): React.ReactNode => (
            <LearningDaysByTopic topicId={this.state.topicId} managerId={this.state.currentTeam?.managerId}/>
          )}
        </CustomModal>
        <div style={{maxHeight: (this.state.height - 100), overflow: "auto"}}>
          <TeamUserSelector onSelect={this.onSelect}/>
          <TopicTree 
            rootTopic={this.state.rootTopic}
            learnedTopicIds={this.state.learnedTopicIds}
            onClick={this.onTopicClick}
          />
        </div>
      </React.Fragment>
    );
  }
}
