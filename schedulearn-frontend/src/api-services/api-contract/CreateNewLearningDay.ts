export interface CreateNewLearningDay {
  rowVersion: string;
  userId: number;
  topicId: number;
  description: string;
  dateFrom: string;
  dateTo: string;
  timezoneMinutes: number;
}

export default CreateNewLearningDay;