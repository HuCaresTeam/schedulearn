export interface CreateNewLearningDay {
  id?: number;
  rowVersion: string;
  userId: number;
  topicId: number;
  description: string;
  dateFrom: string;
  dateTo: string;
}

export default CreateNewLearningDay;