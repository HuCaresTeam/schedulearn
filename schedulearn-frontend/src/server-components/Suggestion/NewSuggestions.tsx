import React from "react";
import UserContext from "src/api-services/UserContext";
import CreateNewSuggestion from "src/api-services/api-contract/CreateNewSuggestion";
import { CreateSuggestion } from "src/components/Suggestions/CreateSuggestion";


export default class NewSuggestions extends React.Component {

  createNewSuggestion = (newSuggestion: CreateNewSuggestion): void => {
    UserContext
      .fetch("api/suggestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSuggestion),
      })
      .then(() => window.location.reload());
  }

  render(): JSX.Element {
    return (
      <CreateSuggestion onSubmit={this.createNewSuggestion}></CreateSuggestion>
    );
  }
}
