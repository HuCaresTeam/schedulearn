import { Event } from "react-big-calendar";

export interface LearningDayEvent extends Event {
  learningDayId: number;
  start: Date;
  end: Date;
  title: string;
}
