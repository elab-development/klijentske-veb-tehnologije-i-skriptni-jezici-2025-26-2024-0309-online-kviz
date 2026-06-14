import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { ALL_QUIZZES } from '../data/quizzes';
import type { Question } from '../models/Question';
import '../css/QuizResult.css';

interface ResultState {
  quizId: number;
  answers: Record<number, string | string[]>;
  timeElapsed: number;
  timeRemaining: number | null;
}

type Grade = 'correct' | 'partial' | 'wrong';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function gradeQuestion(question: Question, answer: string | string[] | undefined): Grade {
  if (question.type === 'text') {
    const userAnswer = ((answer as string) ?? '').trim().toLowerCase();
    return question.correctAnswers.some(a => a.toLowerCase() === userAnswer) ? 'correct' : 'wrong';
  }
  if (question.type === 'single_choice') {
    return answer === question.correctAnswer ? 'correct' : 'wrong';
  }
  if (question.type === 'multiple_choice') {
    const userAnswers = (answer as string[]) ?? [];
    const correctSet = new Set(question.correctAnswers);
    const selectedCorrect = userAnswers.filter(a => correctSet.has(a));
    const selectedWrong = userAnswers.filter(a => !correctSet.has(a));
    if (selectedCorrect.length === question.correctAnswers.length && selectedWrong.length === 0) return 'correct';
    if (selectedCorrect.length === 0) return 'wrong';
    return 'partial';
  }
  return 'wrong';
}

function QuestionResult({ question, answer }: { question: Question; answer: string | string[] | undefined }) {
  const grade = gradeQuestion(question, answer);
  const gradeClass = grade === 'correct'
    ? 'result-question--correct'
    : grade === 'partial'
    ? 'result-question--partial'
    : 'result-question--wrong';

  if (question.type === 'text') {
    const userAnswer = (answer as string) ?? '';
    return (
      <div className={`result-question-card ${gradeClass}`}>
        <p className="result-question-text">{question.text}</p>
        <input placeholder="s" title=" " className="result-question-input" value={userAnswer || '(no answer)'} readOnly />
        {grade === 'wrong' && (
          <p className="result-question-correct-answer">Correct answer: {question.correctAnswers.join(' / ')}</p>
        )}
      </div>
    );
  }

  if (question.type === 'single_choice') {
    const userAnswer = (answer as string) ?? null;
    const allOptions = [question.correctAnswer, ...question.wrongOptions];
    return (
      <div className={`result-question-card ${gradeClass}`}>
        <p className="result-question-text">{question.text}</p>
        <div className="result-question-options">
          {allOptions.map(opt => (
            <label key={opt} className="result-question-option">
              <input
                type="radio"
                name={`result-${question.id}`}
                checked={userAnswer === opt}
                readOnly
                onChange={() => {}}
              />
              {opt}
            </label>
          ))}
        </div>
        {grade === 'wrong' && (
          <p className="result-question-correct-answer">Correct answer: {question.correctAnswer}</p>
        )}
      </div>
    );
  }

  if (question.type === 'multiple_choice') {
    const userAnswers = (answer as string[]) ?? [];
    const allOptions = [...question.correctAnswers, ...question.wrongOptions];
    return (
      <div className={`result-question-card ${gradeClass}`}>
        <p className="result-question-text">{question.text}</p>
        <div className="result-question-options">
          {allOptions.map(opt => (
            <label key={opt} className="result-question-option">
              <input
                type="checkbox"
                checked={userAnswers.includes(opt)}
                readOnly
                onChange={() => {}}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default function QuizResult() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ResultState | null;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const quiz = ALL_QUIZZES.find(q => q.id === Number(id));

  if (!quiz || !state) {
    return (
      <Layout>
        <p className="quiz-result-error">Result not found.</p>
      </Layout>
    );
  }

  const displayRating = hoverRating || rating;

  if (showDetails && quiz.type === 'form') {
    return (
      <Layout>
        <div className="quiz-result">
          <h1 className="quiz-result-title">{quiz.title}</h1>
          <p className="quiz-result-author">Author: {quiz.author}</p>

          <div className="result-details">
            {quiz.questions.map(q => (
              <QuestionResult key={q.id} question={q} answer={state.answers[q.id]} />
            ))}

            <button className="result-exit-btn" onClick={() => setShowDetails(false)}>
              Exit
            </button>
          </div>
        </div>
      </Layout>
    );
  }

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
            <button
              className="quiz-result-btn quiz-result-btn--secondary"
              onClick={() => setShowDetails(true)}
              disabled={quiz.type !== 'form'}
            >
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
