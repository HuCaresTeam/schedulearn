import React from "react";
import { Form } from "react-bootstrap";

export interface TeamListItem {
  teamId: number;
  managerId: number;
  managerName: string;
  managerSurname: string;
}

interface TeamListProps {
  teams: TeamListItem[];
  onChange(team: TeamListItem): void;
}

export default class TeamList extends React.Component<TeamListProps, {}>{
  onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const index = parseInt(e.currentTarget.value);
    this.props.onChange(this.props.teams[index]);
  }

  render(): JSX.Element {
    const teamOptionsList = this.props.teams.map((team, index): React.ReactNode =>
      (<option key={team.teamId} label={`${team.managerName} ${team.managerSurname} team`} value={index}/>),
    );

    return <Form.Control style={{width: "300px", marginBottom: "20px"}}
      as="select"
      onChange={this.onChange}
    >
      <option disabled selected> -- Select a team -- </option>
      { teamOptionsList };
    </Form.Control>;
  }
}