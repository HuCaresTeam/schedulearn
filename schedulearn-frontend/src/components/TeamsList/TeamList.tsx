import React from "react";
import { TeamListItem, TeamListSelectItem } from "./TeamListSelectItem";
import { Form } from "react-bootstrap";

interface TeamListProps {
  teams: TeamListItem[];
  onChange(teamId: number): void;
}

export default class TeamList extends React.Component<TeamListProps, {}>{
  render(): JSX.Element {
    const teamOptionsList = this.props.teams.map((team): React.ReactNode =>
      (<TeamListSelectItem item={team} key={team.teamId}/>),
    );

    return <Form.Control style={{width: "300px", marginBottom: "20px"}}
      as="select"
      onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
        this.props.onChange( parseInt(e.currentTarget.value))}
    >
      <option disabled selected> -- Select a team -- </option>
      { teamOptionsList };
    </Form.Control>;
  }
}