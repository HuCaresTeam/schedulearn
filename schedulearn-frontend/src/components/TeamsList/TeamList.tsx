import React from "react";
import { TeamListItem, TeamListSelectItem } from "./TeamListSelectItem";

interface TeamListProps {
  teams: TeamListItem[];
  onChange(teamId: number): void;
}

export default class TeamList extends React.Component<TeamListProps, {}>{

  render(): JSX.Element {
    const teamOptionsList = this.props.teams.map((team): React.ReactNode =>
      (<TeamListSelectItem item={team} key={team.teamId}/>),
    );

    return (
      <select onChange={(e: React.FormEvent<HTMLSelectElement>): void => this.props.onChange( parseInt(e.currentTarget.value))}>
        { teamOptionsList };
      </select>
    );
  }
}