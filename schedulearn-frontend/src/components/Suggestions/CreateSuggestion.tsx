import React from "react";
import { EventModal } from "../Calendar/EventModal";
import { SuggestionForm } from "./SuggestionForm";
import ManagedTeamsSelect from "../../server-components/ManagedTeamsSelect";
import UsersInTeamList from "../../server-components/UsersInTeamList";
import UserContext from "src/api-services/UserContext";

export interface NewSuggestion {
  topicId?: number;
  suggesterId?: number;
  suggesteeId?: number;
}

interface CreateSuggestionState {
  newSuggestion?: NewSuggestion;
  isSuggestionModalOpen: boolean;
  currentTeamId?: number;
  currentUserId?: number;
}

export class CreateSuggestion extends React.Component<{}, CreateSuggestionState> {
  public state: CreateSuggestionState = {
    isSuggestionModalOpen: false,
    currentUserId: UserContext.user?.id,
  }
  
  handleModalClose = (): void => {
    this.setState({
      isSuggestionModalOpen: false,
    });
  }

  handleEventSubmit = (suggestion: NewSuggestion): void => {
    console.log(this.state.newSuggestion);
    this.setState({
      newSuggestion: suggestion,
    });
    console.log(this.state.newSuggestion);
    // TODO: Send the suggestion to backend
  }

  handleTeamSelect = (teamId: number): void => {
    this.setState({ currentTeamId: teamId, currentUserId: undefined });
  }

  handleUserSelect = (userId?: number): void => {
    console.log(this.state);

    if (this.state.currentUserId === undefined)
      return;

    this.setState({
      newSuggestion: {
        suggesterId: this.state.currentUserId,
        suggesteeId: userId,
      },
      isSuggestionModalOpen: true,
    });
  }

  render(): JSX.Element {
    let usersInTeamList;
    if (this.state.currentTeamId)
      usersInTeamList = <UsersInTeamList teamId={this.state.currentTeamId} onUserChange={this.handleUserSelect} />;

    return (
      <React.Fragment>
        <EventModal
          isOpen={this.state.isSuggestionModalOpen}
          onRequestClose={this.handleModalClose}
        >
          {(isOpen): React.ReactNode => (
            <SuggestionForm
              isOpen={isOpen}
              onEventSubmit={this.handleEventSubmit}
              suggestion={this.state.newSuggestion}
              submitText={"Add Suggestion"}
            />)
          }
        </EventModal>
        
        <div>
          Select a team for which member you'd like to make a suggestion:
        </div>
        <ManagedTeamsSelect onTeamChange={this.handleTeamSelect} />
        {usersInTeamList}

      </React.Fragment>
    );
  }
}
