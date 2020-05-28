export interface CreateNewLearningDay {
  rowVersion: string;
  userId: number;
  topicId: number;
  description: string;
  dateFrom: string;
  dateTo: string;
}

export default CreateNewLearningDay;