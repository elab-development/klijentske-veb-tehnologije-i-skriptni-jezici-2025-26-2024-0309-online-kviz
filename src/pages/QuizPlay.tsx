import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import TextQuestionComponent from '../components/questions/TextQuestion';
import SingleChoiceQuestionComponent from '../components/questions/SingleChoiceQuestion';
import MultipleChoiceQuestionComponent from '../components/questions/MultipleChoiceQuestion';
import { ALL_QUIZZES } from '../data/quizzes';
import { shuffle } from '../utils/shuffle';
import '../css/QuizPlay.css';

type Answers = Record<number, string | string[]>;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function QuizPlay() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [answers, setAnswers] = useState<Answers>({});
  const [startTime] = useState(() => Date.now());

  const quiz = ALL_QUIZZES.find(q => q.id === Number(id));

  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    quiz?.type === 'form' && quiz.timeLimit ? quiz.timeLimit : null
  );

  const [shuffledOptions] = useState<Record<number, string[]>>(() => {
    if (!quiz || quiz.type !== 'form') return {};
    const result: Record<number, string[]> = {};
    for (const q of quiz.questions) {
      if (q.type === 'single_choice') {
        result[q.id] = shuffle([q.correctAnswer, ...q.wrongOptions]);
      } else if (q.type === 'multiple_choice') {
        result[q.id] = shuffle([...q.correctAnswers, ...q.wrongOptions]);
      }
    }
    return result;
  });

  useEffect(() => {
    const stored = localStorage.getItem('qm_user');
    if (stored) {
      const user = JSON.parse(stored);
      setUsername(user.username ?? 'User');
    }
  }, []);

  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return;
    const timer = setTimeout(() => {
      setTimeRemaining(prev => (prev !== null ? prev - 1 : null));
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining !== 0) return;
    if (!quiz || quiz.type !== 'form') return;
    navigate(`/quiz/${id}/result`, {
      state: { quizId: Number(id), answers, timeElapsed: quiz.timeLimit ?? 0, timeRemaining: 0 },
    });
  }, [timeRemaining]);

  if (!quiz) {
    return (
      <Layout username={username}>
        <p className="quiz-play-error">Quiz not found.</p>
      </Layout>
    );
  }

  if (quiz.type !== 'form') {
    return (
      <Layout username={username}>
        <p className="quiz-play-error">This quiz uses the flashcard player.</p>
      </Layout>
    );
  }

  // const isAllAnswered = quiz.questions.length > 0 && quiz.questions.every(q => {
  //   const answer = answers[q.id];
  //   if (q.type === 'text') return typeof answer === 'string' && answer.trim() !== '';
  //   if (q.type === 'single_choice') return typeof answer === 'string';
  //   if (q.type === 'multiple_choice') return Array.isArray(answer) && answer.length > 0;
  //   return false;
  // });

  function handleSubmit() {
    if (!quiz || quiz.type !== 'form') return;
    const initialTime = quiz.timeLimit ?? null;
    const timeElapsed = initialTime !== null && timeRemaining !== null
      ? initialTime - timeRemaining
      : Math.floor((Date.now() - startTime) / 1000);
    navigate(`/quiz/${id}/result`, {
      state: { quizId: Number(id), answers, timeElapsed, timeRemaining },
    });
  }

  function setAnswer(questionId: number, value: string | string[]) {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }

  return (
    <Layout username={username}>
      {timeRemaining !== null && (
        <div className="quiz-play-timer">! {formatTime(timeRemaining)}</div>
      )}

      <div className="quiz-play">
        <h1 className="quiz-play-title">{quiz.title}</h1>
        <p className="quiz-play-author">Author: {quiz.author}</p>

        <div className="quiz-play-questions">
          {quiz.questions.map(q => {
            if (q.type === 'text') {
              return (
                <TextQuestionComponent
                  key={q.id}
                  question={q}
                  value={(answers[q.id] as string) ?? ''}
                  onChange={val => setAnswer(q.id, val)}
                />
              );
            }
            if (q.type === 'single_choice') {
              return (
                <SingleChoiceQuestionComponent
                  key={q.id}
                  question={q}
                  options={shuffledOptions[q.id] ?? []}
                  value={(answers[q.id] as string) ?? null}
                  onChange={val => setAnswer(q.id, val)}
                />
              );
            }
            if (q.type === 'multiple_choice') {
              return (
                <MultipleChoiceQuestionComponent
                  key={q.id}
                  question={q}
                  options={shuffledOptions[q.id] ?? []}
                  value={(answers[q.id] as string[]) ?? []}
                  onChange={val => setAnswer(q.id, val)}
                />
              );
            }
            return null;
          })}
        </div>

        <button
          className="quiz-play-submit"
          onClick={handleSubmit}
          // disabled={!isAllAnswered}
        >
          Submit
        </button>
      </div>
    </Layout>
  );
}
