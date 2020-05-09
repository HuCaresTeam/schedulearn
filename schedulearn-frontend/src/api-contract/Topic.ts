export interface Topic {
    id: number;
    name: string;
    description: string;
    parentTopicId: number;
    subTopics: Topic[];
}

export default Topic;