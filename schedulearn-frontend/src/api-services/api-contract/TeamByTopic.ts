import SimpleUser from "./SimpleUser";

export interface TeamByTopic {
  teamId: number;
  managerId: number;
  managerName: string;
  managerSurname: string;
  users: SimpleUser[];
  numberOfTotalMembers: number;
}

export default TeamByTopic;