import React from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { TeamUserSelector } from "../TeamUserSelector";
import { TeamListItem } from "src/components/TeamsList/TeamList";
import ManagedTeamsSelect from "../ManagedTeamsSelect";
import User from "src/api-services/api-contract/User";

export interface TransferUserFormProps {
  handleSubmit: (user: User, newTeamId: TeamListItem) => void;
}

export interface TransferUserFormState {
  user?: User;
  team?: TeamListItem;
  newTeam?: TeamListItem;
}

export class TransferUserForm extends React.Component<TransferUserFormProps, TransferUserFormState> {
  state: TransferUserFormState = {};

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!this.state.user || !this.state.newTeam)
      return;

    if (this.state.team?.teamId === this.state.newTeam?.teamId)
      return;

    if (this.state.user.id === this.state.newTeam.managerId)
      return;

    this.props.handleSubmit(this.state.user, this.state.newTeam);
  }

  onTeamSelect = (team?: TeamListItem, user?: User): void => {
    this.setState({ user: user, team: team });
    if (!user) {
      this.setState({ newTeam: undefined });
    }
  }

  handleTeamSelect = (team: TeamListItem): void => {
    this.setState({newTeam: team});
  }

  render(): JSX.Element {
    const userId = this.state.user?.id;
    const teamId = this.state.team?.teamId;
    const newTeamId = this.state.newTeam?.teamId;

    const ownTeam = userId === this.state.newTeam?.managerId;
    const sameTeam = teamId === newTeamId;
    const disabled = !userId || !newTeamId || sameTeam || ownTeam;

    return (
      <div>
        <legend className="border-bottom mb-4">Transfer User:</legend>

        <Form onSubmit={this.handleSubmit} style={{ width: "50%"}}>
          <Form.Group as={Row}>
            <Form.Label className="ml-auto" column sm="3">Select user</Form.Label>
            <Col sm="9">
              <TeamUserSelector onSelect={this.onTeamSelect}
                required={true} 
                teamDefaultItem={"--Select Team--"} 
                userDefaultItem={"--Select User For Transfer--"}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label hidden={!userId} column sm="3">Select new team</Form.Label>
            <Col sm="9">
              <ManagedTeamsSelect onTeamChange={this.handleTeamSelect} hidden={!userId} required={true}/>
            </Col>
          </Form.Group>

          <Button disabled={disabled} style={{width: "100px"}}variant="primary" type="submit">Transfer</Button>
        </Form>
      </div>
    );
  }
}
