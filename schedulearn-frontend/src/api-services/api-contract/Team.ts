import User from "./User";

export interface Team {
  id: number;
  limitId: number;
  managerId: number;
  members: User[];
}