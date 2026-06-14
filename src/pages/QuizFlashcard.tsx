import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ALL_QUIZZES } from '../data/quizzes';
import '../css/QuizFlashcard.css';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function QuizFlashcard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const quiz = ALL_QUIZZES.find(q => q.id === Number(id));

  useEffect(() => {
    const stored = localStorage.getItem('qm_user');
    if (stored) {
      const user = JSON.parse(stored);
      setUsername(user.username ?? 'User');
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!quiz) {
    return (
      <Layout username={username}>
        <p className="flashcard-error">Quiz not found.</p>
      </Layout>
    );
  }

  if (quiz.type !== 'flashcards') {
    return (
      <Layout username={username}>
        <p className="flashcard-error">This quiz uses the form player.</p>
      </Layout>
    );
  }

  const cards = quiz.cards;
  const current = cards[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === cards.length - 1;

  function goNext() {
    setIsFlipped(false);
    setCurrentIndex(i => i + 1);
  }

  function goPrev() {
    setIsFlipped(false);
    setCurrentIndex(i => i - 1);
  }

  return (
    <Layout username={username}>
      <div className="flashcard-page">
        <h1 className="flashcard-title">{quiz.title}</h1>

        <div className="flashcard-scene" onClick={() => setIsFlipped(f => !f)}>
          <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`} key={currentIndex}>
            <div className="flashcard-face flashcard-front">
              <p>{current.front}</p>
            </div>
            <div className="flashcard-face flashcard-back">
              <p>{current.back}</p>
            </div>
          </div>
        </div>

        <div className="flashcard-nav">
          <button
            className="flashcard-arrow"
            onClick={goPrev}
            disabled={isFirst}
            aria-label="Previous"
          >
            ←
          </button>
          <span className="flashcard-counter">{currentIndex + 1}/{cards.length}</span>
          {isLast ? (
            <button
              className="flashcard-arrow flashcard-arrow--finish"
              onClick={() => navigate(`/quiz/${id}`)}
              aria-label="Finish"
            >
              ✓
            </button>
          ) : (
            <button
              className="flashcard-arrow"
              onClick={goNext}
              aria-label="Next"
            >
              →
            </button>
          )}
        </div>

        <div className="flashcard-footer">
          <span className="flashcard-timer">{formatTime(elapsed)}</span>
          <button className="flashcard-back-btn" onClick={() => navigate(`/quiz/${id}`)}>
            Back
          </button>
        </div>
      </div>
    </Layout>
  );
}