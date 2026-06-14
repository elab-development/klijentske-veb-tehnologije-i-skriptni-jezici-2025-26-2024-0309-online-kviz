import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ALL_QUIZZES } from '../data/quizzes';
import '../css/QuizStart.css';

function formatTimeLimit(seconds?: number): string {
  if (!seconds) return 'No limit set';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

export default function QuizStart() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('qm_user');
    if (stored) {
      const user = JSON.parse(stored);
      setUsername(user.username ?? 'User');
    }
  }, []);

  const quiz = ALL_QUIZZES.find(q => q.id === Number(id));

  if (!quiz) {
    return (
      <Layout username={username}>
        <p className="quiz-start-not-found">Quiz not found.</p>
      </Layout>
    );
  }

  const quizType = quiz.type === 'flashcards' ? 'Flashcards' : 'Form';

  return (
    <Layout username={username}>
      <div className="quiz-start">
        <h1 className="quiz-start-title">{quiz.title}</h1>

        <div className="quiz-start-meta">
          <div className="quiz-start-meta-left">
            <span>Author: {quiz.author}</span>
            <span>Type: {quizType}</span>
            <span>Time limit: {formatTimeLimit(quiz.timeLimit)}</span>
          </div>
          <div className="quiz-start-meta-right">
            <span>Rating: ☆ {quiz.rating} / 10</span>
            {quiz.language && <span>Language: {quiz.language}</span>}
          </div>
        </div>

        {quiz.categories.length > 0 && (
          <div className="quiz-start-categories">
            <span className="quiz-start-cat-label">Categories:</span>
            {quiz.categories.map(cat => (
              <span key={cat} className="quiz-start-cat-chip">{cat}</span>
            ))}
          </div>
        )}

        <div className="quiz-start-desc-card">
          {quiz.imageUrl && (
            <img src={quiz.imageUrl} alt={quiz.title} className="quiz-start-image" />
          )}
          <p className="quiz-start-long-desc">{quiz.longDescription}</p>
        </div>

        <div className="quiz-start-actions">
          <button className="quiz-start-btn-back" onClick={() => navigate(`/`)}>
            ← Back
          </button>
          <button className="quiz-start-btn" onClick={() => navigate(`/quiz/${quiz.id}/play`)}>
            Start answering {quiz.questionCount} questions
          </button>
        </div>
      </div>
    </Layout>
  );
}
