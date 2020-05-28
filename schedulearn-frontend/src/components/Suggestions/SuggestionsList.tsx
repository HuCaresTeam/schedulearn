import React from "react";
import { SuggestionForUser } from "src/api-services/api-contract/SuggestionForUser";
import { ListGroup } from "react-bootstrap";

interface SuggestionsListProps {
  suggestions: SuggestionForUser[];
}

export class SuggestionsList extends React.Component<SuggestionsListProps> {
  public constructor(props: SuggestionsListProps) {
    super(props);
  }

  render(): JSX.Element {
    const userSuggestionsList = this.props.suggestions.map((suggestion: SuggestionForUser): React.ReactNode =>
      (<ListGroup.Item key={suggestion.topicId}>
        {suggestion.topicName} by {suggestion.suggesterName} {suggestion.suggesterSurname}
      </ListGroup.Item>),
    );

    return (
      <div>
        <legend className="border-bottom mb-4">Suggestions</legend>
        <ListGroup>
          {userSuggestionsList}
        </ListGroup>
      </div>
    );
  }
}
