import React from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { TeamUserSelector } from "./TeamUserSelector";
import { TeamListItem } from "src/components/TeamsList/TeamList";
import ManagedTeamsSelect from "./ManagedTeamsSelect";

export interface TransferUserFormState {
  userId?: number;
  teamId?: number;
  newTeamId?: number;
}

export class TransferUserForm extends React.Component<{}, TransferUserFormState> {
  state: TransferUserFormState = {};

  handleSubmit = (): void => {
    console.log(this.state.userId, this.state.newTeamId);
  }

  onTeamSelect = (team?: TeamListItem, userId?: number): void => {
    this.setState({ userId: userId, teamId: team?.teamId });
    if (!userId) {
      this.setState({ newTeamId: undefined });
    }
  }

  handleTeamSelect = (team: TeamListItem): void => {
    this.setState({newTeamId: team.teamId});
  }

  render(): JSX.Element {
    
    const sameTeam = this.state.teamId === this.state.newTeamId;
    const disabled = !(this.state.userId && this.state.newTeamId && !sameTeam);

    return (
      <div>
        <legend className="border-bottom mb-4">Transfer User</legend>

        <Form onSubmit={this.handleSubmit} style={{ width: "50%"}}>
          <Form.Group as={Row}>
            <Form.Label column sm="2">Select user</Form.Label>
            <Col sm="10">
              <TeamUserSelector onSelect={this.onTeamSelect}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label hidden={!this.state.userId} column sm="2">Select new team</Form.Label>
            <Col sm="10">
              <ManagedTeamsSelect onTeamChange={this.handleTeamSelect} hidden={!this.state.userId}/>
            </Col>
          </Form.Group>

          <Button disabled={disabled} style={{width: "100px"}}variant="primary" type="submit">Transfer</Button>
        </Form>
      </div>
    );
  }
}
