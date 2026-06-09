import { Link } from 'react-router-dom';
import type { Quiz } from '../models/Quiz';
import '../css/QuizCard.css';

interface QuizCardProps {
  quiz: Quiz;
}

export default function QuizCard({ quiz }: QuizCardProps) {
  return (
    <Link to={`/quiz/${quiz.id}`} className="quiz-card">
      <div className="quiz-card-image">
        {quiz.imageUrl ? (
          <img src={quiz.imageUrl} alt={quiz.title} />
        ) : (
          <div className="quiz-card-image-placeholder" />
        )}
      </div>
      <div className="quiz-card-meta">
        <span className="quiz-card-rating">☆ {quiz.rating}/{quiz.maxRating}</span>
        <span className="quiz-card-author">Author: {quiz.author}</span>
      </div>
      <h3 className="quiz-card-title">{quiz.title}</h3>
      <p className="quiz-card-desc">{quiz.description}</p>
      <span className="quiz-card-count">{quiz.questionCount} questions</span>
    </Link>
  );
}
