export type QuizType = 'form' | 'flashcards';

export interface Quiz {
  id: number;
  title: string;
  description: string;
  author: string;
  rating: number;
  maxRating: number;
  questionCount: number;
  imageUrl?: string;
  type: QuizType;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Question {
  id: number;
  quizId: number;
  text: string;
  options?: string[];
  correctAnswer: string;
  hint?: string;
}

export class QuizSession {
  quizId: number;
  answers: Record<number, string>;
  startedAt: Date;
  finishedAt?: Date;

  constructor(quizId: number) {
    this.quizId = quizId;
    this.answers = {};
    this.startedAt = new Date();
  }

  answer(questionId: number, value: string): void {
    this.answers[questionId] = value;
  }

  finish(): void {
    this.finishedAt = new Date();
  }

  score(questions: Question[]): number {
    return questions.filter(q => this.answers[q.id] === q.correctAnswer).length;
  }

  durationSeconds(): number {
    const end = this.finishedAt ?? new Date();
    return Math.floor((end.getTime() - this.startedAt.getTime()) / 1000);
  }
}
