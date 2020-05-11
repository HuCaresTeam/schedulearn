import React from "react";
import TeamByTopic from "src/api-contract/TeamByTopic";
import { UserContext } from "src/UserContext";
import "./TeamsByTopicsList.scss";

interface TeamsByTopicListProps {
  topicId: number;
}

interface TeamByTopicListState {
  teamsByTopic: TeamByTopic[];
}

export default class TeamsByTopicList extends React.Component<TeamsByTopicListProps, TeamByTopicListState> {
  state: TeamByTopicListState = {teamsByTopic: []};
  
  fetchTeamsByTopic(): void {
    if (!UserContext.user)
      throw new Error("Should never reach this view when not logged in");

    UserContext
      .fetch(`api/Team/manager/${UserContext.user?.id}/topic/${this.props.topicId}`)
      .then((response) => {
        if (!response.ok) {
          //set error
          return;
        }

        return response.json();
      })
      .then((teams: TeamByTopic[]) => {
        this.setState({ teamsByTopic: teams });
      });
  }

  componentDidMount(): void {
    this.fetchTeamsByTopic();
  }
  
  componentDidUpdate(prevProps: TeamsByTopicListProps): void {
    if (prevProps.topicId !== this.props.topicId)
      this.fetchTeamsByTopic();
  }

  render(): React.ReactNode {

    let teams = this.state.teamsByTopic;
    if (!teams) {
      teams = [];
    }

    return (
      <table className="schedulearn-table">
        <tbody>
          <tr>
            <th>Team</th>
            <th>Users who learned this topic</th>
          </tr>
          {teams.map((team) => (
            <tr key={team.teamId}>
              <td>{team.managerName} {team.managerSurname} team</td>
              <td>{team.users.length} of {team.numberOfTotalMembers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}