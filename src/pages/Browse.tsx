import { useState, useEffect, useMemo, useRef } from 'react';
import Layout from '../components/Layout';
import QuizList from '../components/QuizList';
import QuizCard from '../components/QuizCard';
import type { Quiz } from '../models/Quiz';
import '../css/Browse.css';

const ALL_QUIZZES: Quiz[] = [
  { id: 1, title: 'General knowledge quiz', description: 'Five elementary questions every child should know.', author: 'Hugh J.', rating: 7, maxRating: 10, questionCount: 5, type: 'form', category: 'General' },
  { id: 2, title: 'Counter-Strike quiz', description: 'Every player should know these facts.', author: 'SuperKillerMan', rating: 10, maxRating: 10, questionCount: 20, type: 'form', category: 'Gaming' },
  { id: 3, title: 'WWII', description: 'Detailed history quiz for WWII.', author: 'Historian', rating: 8, maxRating: 10, questionCount: 50, type: 'form', category: 'History' },
  { id: 4, title: 'Engleski jezik u informatici', description: 'General quiz for English language use in comp-sci.', author: 'HR', rating: 10, maxRating: 10, questionCount: 100, type: 'form', category: 'IT' },
  { id: 5, title: 'Ekonomija', description: 'Proverite svoje znanje iz ekonomije.', author: 'John Keynes', rating: 2, maxRating: 10, questionCount: 15, type: 'form', category: 'Economics' },
  { id: 6, title: 'AROS - flashcards', description: 'Brzi kviz iz AROS-a za ispit i kolokvijume.', author: 'Admin', rating: 8, maxRating: 10, questionCount: 120, type: 'flashcards', category: 'IT' },
  { id: 7, title: 'FMIR', description: 'Proverite svoje znanje iz ekonomije.', author: 'Z', rating: 5, maxRating: 10, questionCount: 15, type: 'form', category: 'Economics' },
  { id: 8, title: 'Geografija sveta', description: 'Prepoznaj države, prestonice i reke.', author: 'Mapper', rating: 9, maxRating: 10, questionCount: 30, type: 'form', category: 'General' },
];

const FEATURED = ALL_QUIZZES.filter(q => [4, 5, 6].includes(q.id));
const RECOMMENDED = ALL_QUIZZES.filter(q => [1, 2, 3, 8].includes(q.id));

const CATEGORIES = Array.from(
  new Set(ALL_QUIZZES.map(q => q.category).filter(Boolean))
) as string[];

export default function Browse() {
  const [username, setUsername] = useState('Pera');
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('qm_user');
    if (stored) {
      const user = JSON.parse(stored);
      setUsername(user.username ?? 'User');
    }
  }, []);

  // zatvori dropdown na klik van njega
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const isSearching = query.trim() !== '' || categories.length > 0;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_QUIZZES.filter(quiz => {
      const matchesText =
        !q ||
        quiz.title.toLowerCase().includes(q) ||
        quiz.description.toLowerCase().includes(q) ||
        quiz.author.toLowerCase().includes(q);
      const matchesCat =
        categories.length === 0 ||
        (quiz.category != null && categories.includes(quiz.category));
      return matchesText && matchesCat;
    });
  }, [query, categories]);

  const available = CATEGORIES.filter(c => !categories.includes(c));

  const addCategory = (c: string) => {
    setCategories(prev => [...prev, c]);
    setPickerOpen(false);
  };
  const removeCategory = (c: string) =>
    setCategories(prev => prev.filter(x => x !== c));

  return (
    <Layout username={username}>
      <div className="browse-search">
        <input
          type="text"
          placeholder="Search quizzes..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <svg className="browse-search-icon" width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      <div className="browse-filters">
        {categories.map(c => (
          <span className="browse-chip" key={c}>
            {c}
            <button
              className="browse-chip-x"
              onClick={() => removeCategory(c)}
              aria-label={`Remove ${c}`}
            >
              ✕
            </button>
          </span>
        ))}

        {available.length > 0 && (
          <div className="browse-add-wrap" ref={pickerRef}>
            <button
              className="browse-add"
              onClick={() => setPickerOpen(p => !p)}
              aria-label="Add category"
            >
              +
            </button>
            {pickerOpen && (
              <div className="browse-picker">
                {available.map(c => (
                  <button
                    key={c}
                    className="browse-picker-item"
                    onClick={() => addCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {isSearching ? (
        results.length > 0 ? (
          <div className="browse-grid">
            {results.map(q => <QuizCard key={q.id} quiz={q} />)}
          </div>
        ) : (
          <p className="browse-empty">No quizzes found.</p>
        )
      ) : (
        <>
          <QuizList title="Featured" quizzes={FEATURED} />
          <QuizList title="Recommended" quizzes={RECOMMENDED} />
        </>
      )}
    </Layout>
  );
}