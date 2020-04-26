import { Event } from "react-big-calendar";

export interface LearningDayEvent extends Event {
  topicId: number;
  start: Date;
  end: Date;
  title: string;
}
