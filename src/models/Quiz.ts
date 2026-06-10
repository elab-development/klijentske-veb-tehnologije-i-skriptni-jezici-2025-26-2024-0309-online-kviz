export type QuizType = 'form' | 'flashcards';



export interface Quiz {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  author: string;
  rating: number;
  questionCount: number;
  type: QuizType;
  categories: string[];
  imageUrl?: string;
  language?: string;
  timeLimit?: number; //u sekundama
}
