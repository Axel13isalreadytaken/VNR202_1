export interface QuizItem {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface TimelineEvent {
  period: string;
  title: string;
  summary: string;
  details: string;
  image_description: string;
  imageUrl: string;
  quiz: QuizItem[];
}
