export interface CreateNewLearningDay {
  userId: number;
  topicId: number;
  description: string;
  dateFrom: string;
  dateTo: string;
}

export default CreateNewLearningDay;