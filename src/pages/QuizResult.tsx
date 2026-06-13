import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { ALL_QUIZZES } from '../data/quizzes';
import '../css/QuizResult.css';

interface ResultState {
  quizId: number;
  answers: Record<number, string | string[]>;
  timeElapsed: number;
  timeRemaining: number | null;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function QuizResult() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ResultState | null;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const quiz = ALL_QUIZZES.find(q => q.id === Number(id));

  if (!quiz || !state) {
    return (
      <Layout>
        <p className="quiz-result-error">Result not found.</p>
      </Layout>
    );
  }

  const displayRating = hoverRating || rating;

  return (
    <Layout>
      <div className="quiz-result">
        <h1 className="quiz-result-title">{quiz.title}</h1>
        <p className="quiz-result-author">Author: {quiz.author}</p>

        <div className="quiz-result-card">
          <p className="quiz-result-submitted">Your results have been submitted</p>

          <div className="quiz-result-info">
            <p>Time elapsed: {formatTime(state.timeElapsed)}</p>
            {state.timeRemaining !== null && (
              <p>Time remaining: {formatTime(state.timeRemaining)}</p>
            )}
          </div>

          <div className="quiz-result-rating">
            <span>Rate this quiz:</span>
            <div className="quiz-result-stars">
              {Array.from({ length: 10 }, (_, i) => i + 1).map(star => (
                <button
                  key={star}
                  className="quiz-result-star"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`Rate ${star} out of 10`}
                >
                  {star <= displayRating ? '★' : '☆'}
                </button>
              ))}
            </div>
          </div>

          <div className="quiz-result-actions">
            <button className="quiz-result-btn quiz-result-btn--secondary" disabled>
              View your results
            </button>
            <button
              className="quiz-result-btn quiz-result-btn--primary"
              onClick={() => navigate(`/quiz/${id}`)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
