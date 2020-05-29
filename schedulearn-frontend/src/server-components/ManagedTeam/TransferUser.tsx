import React from "react";
import { TransferUserForm } from "./TransferUserForm";
import { BrowserHistory } from "src/api-services/History";
import UserContext from "src/api-services/UserContext";
import User from "src/api-services/api-contract/User";
import { TeamListItem } from "src/components/TeamsList/TeamList";

export class TransferUser extends React.Component{
  handleSubmit = (user: User, team: TeamListItem): void => {
    UserContext.fetch(`api/User/${user.id}/transfer`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newTeamId: team.teamId}),
    }).then(() => BrowserHistory.push("/"));
  }

  render(): JSX.Element {
    return (
      <TransferUserForm handleSubmit={this.handleSubmit}/>
    );
  }
}
