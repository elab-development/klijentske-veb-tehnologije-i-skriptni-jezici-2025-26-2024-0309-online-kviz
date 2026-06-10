import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import QuizList from '../components/QuizList';
import type { Quiz } from '../models/Quiz';
import '../css/Home.css';

const RECOMMENDED: Quiz[] = [ 
  {
    id: 1,
    title: 'prvi',
    shortDescription: 'Every player should know these facts.',
    longDescription: '',
    author: 'SuperKillerMan',
    rating: 10,
    questionCount: 20,
    type: 'form',
    categories: []
  },
  {
    id: 2,
    title: 'drugi',
    shortDescription: 'Proverite svoje znanje iz ekonomije.',
    longDescription: '',
    author: 'Z',
    rating: 5,
    questionCount: 15,
    type: 'form',
    categories: []
  },
  {
    id: 3,
    title: 'treci',
    shortDescription: 'Detailed history quiz for WWII.',
    longDescription: '',
    author: 'Historian',
    rating: 8,
    questionCount: 50,
    type: 'form',
    categories: []
  },
  {
    id: 1,
    title: 'cetvrti',
    shortDescription: 'Every player should know these facts.',
    longDescription: '',
    author: 'SuperKillerMan',
    rating: 10,
    questionCount: 20,
    type: 'form',
    categories: []
  },
  {
    id: 2,
    title: 'peti',
    shortDescription: 'Proverite svoje znanje iz ekonomije.',
    longDescription: '',
    author: 'Z',
    rating: 5,
    questionCount: 15,
    type: 'form',
    categories: []
  },
  {
    id: 3,
    title: 'sesti',
    shortDescription: 'Detailed history quiz for WWII.',
    longDescription: '',
    author: 'Historian',
    rating: 8,
    questionCount: 50,
    type: 'form',
    categories: []
  },
 ];
const FEATURED: Quiz[] = [ 
  {
    id: 4,
    title: 'Engleski jezik u informatici',
    shortDescription: 'General quiz for English language use in comp-sci.',
    longDescription: '',
    author: 'HR',
    rating: 10,
    questionCount: 100,
    type: 'form',
    categories: []
  },
  {
    id: 5,
    title: 'Ekonomija',
    shortDescription: 'Proverite svoje znanje iz ekonomije.',
    longDescription:'',
    author: 'John Keynes',
    rating: 2,
    questionCount: 15,
    type: 'form',
    categories: []
  },
  {
    id: 6,
    title: 'AROS - flashcards',
    shortDescription: 'Brzi kviz iz AROS-a za ispit i kolokvijume.',
    longDescription: '',
    author: 'Admin',
    rating: 8,
    questionCount: 120,
    type: 'flashcards',
    categories: []
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