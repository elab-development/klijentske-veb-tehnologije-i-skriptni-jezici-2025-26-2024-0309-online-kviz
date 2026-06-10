import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import QuizList from '../components/QuizList';
import type { Quiz } from '../models/Quiz';
import '../css/Home.css';

const RECOMMENDED: Quiz[] = [ 
  {
    id: 1,
    title: 'prvi',
    description: 'Every player should know these facts.',
    author: 'SuperKillerMan',
    rating: 10,
    maxRating: 10,
    questionCount: 20,
    type: 'form',
  },
  {
    id: 2,
    title: 'drugi',
    description: 'Proverite svoje znanje iz ekonomije.',
    author: 'Z',
    rating: 5,
    maxRating: 10,
    questionCount: 15,
    type: 'form',
  },
  {
    id: 3,
    title: 'treci',
    description: 'Detailed history quiz for WWII.',
    author: 'Historian',
    rating: 8,
    maxRating: 10,
    questionCount: 50,
    type: 'form',
  },
  {
    id: 1,
    title: 'cetvrti',
    description: 'Every player should know these facts.',
    author: 'SuperKillerMan',
    rating: 10,
    maxRating: 10,
    questionCount: 20,
    type: 'form',
  },
  {
    id: 2,
    title: 'peti',
    description: 'Proverite svoje znanje iz ekonomije.',
    author: 'Z',
    rating: 5,
    maxRating: 10,
    questionCount: 15,
    type: 'form',
  },
  {
    id: 3,
    title: 'sesti',
    description: 'Detailed history quiz for WWII.',
    author: 'Historian',
    rating: 8,
    maxRating: 10,
    questionCount: 50,
    type: 'form',
  },
 ];
const FEATURED: Quiz[] = [ 
  {
    id: 4,
    title: 'Engleski jezik u informatici',
    description: 'General quiz for English language use in comp-sci.',
    author: 'HR',
    rating: 10,
    maxRating: 10,
    questionCount: 100,
    type: 'form',
  },
  {
    id: 5,
    title: 'Ekonomija',
    description: 'Proverite svoje znanje iz ekonomije.',
    author: 'John Keynes',
    rating: 2,
    maxRating: 10,
    questionCount: 15,
    type: 'form',
  },
  {
    id: 6,
    title: 'AROS - flashcards',
    description: 'Brzi kviz iz AROS-a za ispit i kolokvijume.',
    author: 'Admin',
    rating: 8,
    maxRating: 10,
    questionCount: 120,
    type: 'flashcards',
  },

 ];

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