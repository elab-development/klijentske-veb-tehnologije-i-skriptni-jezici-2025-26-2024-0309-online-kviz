import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import QuizList from '../components/QuizList';
import { RECOMMENDED, FEATURED } from '../data/quizzes';
import '../css/Home.css';

export default function HomePage() {
  const [username, setUsername] = useState('Pera');

  useEffect(() => {
    const stored = localStorage.getItem('qm_user');
    if (stored) {
      const user = JSON.parse(stored);
      setUsername(user.username ?? 'User');
    }
  }, []);

  return (
    <Layout username={username}>
      <h1 className="home-greeting">Welcome back, {username}!</h1>
      <QuizList title="Recommended" quizzes={RECOMMENDED} />
      <QuizList title="Featured" quizzes={FEATURED} />
    </Layout>
  );
}