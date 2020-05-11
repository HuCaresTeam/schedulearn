export interface SuggestionForUser {
  topicId: number;
  topicName: string;

  suggesterId: number;
  suggesterName: string;
  suggesterSurname: string;

  createdDate: Date;
}

export default SuggestionForUser;