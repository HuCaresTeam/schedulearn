import React from "react";
import { SuggestionForm } from "./SuggestionForm";
import ManagedTeamsSelect from "../../server-components/ManagedTeamsSelect";
import UsersInTeamList from "../../server-components/UsersInTeamList";
import UserContext from "src/api-services/UserContext";
import CreateNewSuggestion from "src/api-services/api-contract/CreateNewSuggestion";
import { TeamListItem } from "src/components/TeamsList/TeamList";
import User from "src/api-services/api-contract/User";

export interface NewSuggestion {
  topicId?: number;
  suggesterId?: number;
  suggesteeId?: number;
}

export interface CreateSuggestionProps {
  onSubmit: (newSuggestion: CreateNewSuggestion) => void; 
}

interface CreateSuggestionState {
  newSuggestion?: NewSuggestion;
  isSuggestionModalOpen: boolean;
  currentTeamId?: number;
}

export class CreateSuggestion extends React.Component<CreateSuggestionProps, CreateSuggestionState> {
  public state: CreateSuggestionState = {
    isSuggestionModalOpen: false,
  }
  
  handleModalClose = (): void => {
    this.setState({
      isSuggestionModalOpen: false,
    });
  }

  handleEventSubmit = (topicId: number): void => {
    if (this.state.newSuggestion?.suggesteeId === undefined)
      return;

    if (this.state.newSuggestion.suggesterId === undefined)
      return;

    this.props.onSubmit({
      topicId: topicId,
      suggesteeId: this.state.newSuggestion.suggesteeId,
      suggesterId: this.state.newSuggestion.suggesterId,
    });

    this.setState({
      currentTeamId: undefined,
      newSuggestion: undefined,
      isSuggestionModalOpen: false,
    });
  }

  handleTeamSelect = (team: TeamListItem): void => {
    this.setState({ currentTeamId: team.teamId });
  }

  handleUserSelect = (user?: User): void => {
    this.setState({
      newSuggestion: {
        suggesterId: UserContext.user?.id,
        suggesteeId: user?.id,
      },
      isSuggestionModalOpen: true,
    });
  }

  render(): JSX.Element {
    let usersInTeamList: JSX.Element | undefined;
    if (this.state.currentTeamId) {
      usersInTeamList = (
        <React.Fragment>
          <div>Select a member to make a suggestion:</div>
          <UsersInTeamList teamId={this.state.currentTeamId} undefinedUserDisabled={true} onUserChange={this.handleUserSelect} defaultItem="--Member to Suggest to--"/>
        </React.Fragment>);
    }

    let suggestionForm: JSX.Element | undefined;
    if (this.state.isSuggestionModalOpen) {
      suggestionForm =
        (<React.Fragment>
          <div>Suggested topic:</div>
          <SuggestionForm
            isOpen={this.state.isSuggestionModalOpen}
            onEventSubmit={this.handleEventSubmit}
            suggestion={this.state.newSuggestion}
            submitText={"Add Suggestion"}
          />
        </React.Fragment>);
    }

    return (
      <React.Fragment>
        <legend className="border-bottom mb-4">Select a team to make a suggestion</legend>
        <ManagedTeamsSelect onTeamChange={this.handleTeamSelect} />
        {usersInTeamList}
        {suggestionForm}
      </React.Fragment>
    );
  }
}
