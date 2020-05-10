import React from "react";

export interface TeamListItem {
  teamId: number;
  managerId: number;
  managerName: string;
  managerSurname: string;
}

export interface TeamListSelectItemProps {
  item: TeamListItem;
}

export class TeamListSelectItem extends React.Component<TeamListSelectItemProps, {}> {
  render(): JSX.Element {
    return (
      <option label={`${this.props.item.managerName} ${this.props.item.managerSurname} team`} value={this.props.item.teamId}/>
    );
  }
}