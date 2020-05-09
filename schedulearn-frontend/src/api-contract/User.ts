export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  jobTitle: {
    id: number;
    title: string;
  };
  teamId?: number;
  limitId?: number;
}