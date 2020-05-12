import React from "react";
import { SuggestionForUser } from "src/api-contract/SuggestionForUser";

interface SuggestionsListProps {
  suggestions: SuggestionForUser[];
}

export class SuggestionsList extends React.Component<SuggestionsListProps> {
  public constructor(props: SuggestionsListProps) {
    super(props);
  }

  render(): JSX.Element {
    const userSuggestionsList = this.props.suggestions.map((suggestion: SuggestionForUser): React.ReactNode =>
      (<div key={suggestion.topicId}>{suggestion.topicName} by {suggestion.suggesterName} {suggestion.suggesterSurname}</div>),
    );

    return (
      <div>
        <div>Suggestions: </div>
        {userSuggestionsList}
      </div>
    );
  }
}
