import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import QuizCard from '../components/QuizCard';
import type { Quiz } from '../models/Quiz';
import '../css/Home.css';

const RECOMMENDED: Quiz[] = [
  {
    id: 1,
    title: 'Counter-Strike quiz',
    description: 'Every player should know these facts.',
    author: 'SuperKillerMan',
    rating: 10,
    maxRating: 10,
    questionCount: 20,
    type: 'form',
  },
  {
    id: 2,
    title: 'FMIR',
    description: 'Proverite svoje znanje iz ekonomije.',
    author: 'Z',
    rating: 5,
    maxRating: 10,
    questionCount: 15,
    type: 'form',
  },
  {
    id: 3,
    title: 'WWII',
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

const VISIBLE = 3;

export default function HomePage() {
  const [recOffset, setRecOffset] = useState(0);
  const [featOffset, setFeatOffset] = useState(0);
  const [username, setUsername] = useState('Pera');

  useEffect(() => {
    const stored = localStorage.getItem('qm_user');
    if (stored) {
      const user = JSON.parse(stored);
      setUsername(user.username ?? 'User');
    }
  }, []);

  const shift = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    list: Quiz[],
    dir: 1 | -1
  ) => {
    setter(prev => {
      const next = prev + dir;
      if (next < 0) return list.length - VISIBLE;
      if (next > list.length - VISIBLE) return 0;
      return next;
    });
  };

  const visibleRec = RECOMMENDED.slice(recOffset, recOffset + VISIBLE);
  const visibleFeat = FEATURED.slice(featOffset, featOffset + VISIBLE);

  return (
    <Layout username={username}>
      <section className="home-section">
        <h1 className="home-greeting">Welcome back, {username}!</h1>

        {/* Recommended */}
        <div className="home-block">
          <div className="home-block-header">
            <h2 className="home-block-title">Recommended</h2>
          </div>
          <div className="home-carousel-wrap">
            <div className="home-carousel">
              {visibleRec.map(q => <QuizCard key={q.id} quiz={q} />)}
            </div>
            <button
              className="carousel-arrow"
              onClick={() => shift(setRecOffset, RECOMMENDED, 1)}
              aria-label="Next"
            >
              &#187;&#187;
            </button>
          </div>
        </div>

        {/* Featured */}
        <div className="home-block">
          <div className="home-block-header">
            <h2 className="home-block-title">Featured</h2>
          </div>
          <div className="home-carousel-wrap">
            <div className="home-carousel">
              {visibleFeat.map(q => <QuizCard key={q.id} quiz={q} />)}
            </div>
            <button
              className="carousel-arrow"
              onClick={() => shift(setFeatOffset, FEATURED, 1)}
              aria-label="Next"
            >
              &#187;&#187;
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
