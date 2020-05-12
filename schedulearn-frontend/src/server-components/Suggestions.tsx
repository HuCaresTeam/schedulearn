import React from "react";
import UserContext from "src/UserContext";
import SuggestionForUser from "src/api-contract/SuggestionForUser";
import { SuggestionsList } from "src/components/Suggestions/SuggestionsList";

interface SuggestionsState {
  suggestions: SuggestionForUser[];
}

export default class Suggestions extends React.Component<{}, SuggestionsState> {
  state: SuggestionsState = {
    suggestions:[],
  }
  componentDidMount(): void {
    if (!UserContext.user)
      throw new Error("User has to be defined! Is user logged in?");

    UserContext
      .fetch(`api/suggestion/user/${UserContext.user.id}`)
      .then((response) => {
        if (!response.ok) {
          //set error
          return;
        }
        
        return response.json();
      })
      .then((suggestions: SuggestionForUser[]) => {
        this.setState({ 
          suggestions: suggestions,
        });
      });
  }
  
  render(): JSX.Element {
    return (
      <SuggestionsList suggestions={this.state.suggestions}></SuggestionsList>
    );
  }
}
