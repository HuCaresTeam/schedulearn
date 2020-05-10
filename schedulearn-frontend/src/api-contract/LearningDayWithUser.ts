export interface LearningDayWithUser {
    id?: number;
    description: string;
    dateFrom: string;
    dateTo: string;

    //User
    userId: number;
    name: string;
    surname: string;
    jobTitle: string;

    //Topic
    topicId: number;
    topicTitle: string;
}

export default LearningDayWithUser;