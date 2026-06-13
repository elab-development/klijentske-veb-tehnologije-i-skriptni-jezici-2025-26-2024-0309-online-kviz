export type QuestionType = 'text' | 'single_choice' | 'multiple_choice';

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswers?: string[];
}
