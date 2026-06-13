import { useState, useEffect, useMemo, useRef } from 'react';
import Layout from '../components/Layout';
import QuizList from '../components/QuizList';
import QuizCard from '../components/QuizCard';
import { ALL_QUIZZES, FEATURED, RECOMMENDED } from '../data/quizzes';
import '../css/Browse.css';

const CATEGORIES = Array.from(
  new Set(ALL_QUIZZES.flatMap(q => q.categories))
).sort();

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

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target as Node)
      ) {
        setPickerOpen(false);
      }
    };

    document.addEventListener('mousedown', onClick);

    return () => {
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  const isSearching =
    query.trim().length > 0 || categories.length > 0;

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    return ALL_QUIZZES.filter(quiz => {
      const matchesText =
        !search ||
        quiz.title.toLowerCase().includes(search) ||
        quiz.shortDescription.toLowerCase().includes(search) ||
        quiz.longDescription.toLowerCase().includes(search) ||
        quiz.author.toLowerCase().includes(search);

      const matchesCategory =
        categories.length === 0 ||
        categories.every(c => quiz.categories.includes(c));

      return matchesText && matchesCategory;
    });
  }, [query, categories]);

  const availableCategories = CATEGORIES.filter(
    category => !categories.includes(category)
  );

  const addCategory = (category: string) => {
    setCategories(prev => [...prev, category]);
    setPickerOpen(false);
  };

  const removeCategory = (category: string) => {
    setCategories(prev =>
      prev.filter(c => c !== category)
    );
  };

  return (
    <Layout username={username}>
      <div className="browse-search">
        <input
          type="text"
          placeholder="Search quizzes..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <svg
          className="browse-search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      <div className="browse-filters">
        {categories.map(category => (
          <span className="browse-chip" key={category}>
            {category}

            <button
              className="browse-chip-x"
              onClick={() => removeCategory(category)}
              aria-label={`Remove ${category}`}
            >
              ✕
            </button>
          </span>
        ))}

        {availableCategories.length > 0 && (
          <div
            className="browse-add-wrap"
            ref={pickerRef}
          >
            <button
              className="browse-add"
              onClick={() => setPickerOpen(open => !open)}
              aria-label="Add category"
            >
              +
            </button>

            {pickerOpen && (
              <div className="browse-picker">
                {availableCategories.map(category => (
                  <button
                    key={category}
                    className="browse-picker-item"
                    onClick={() => addCategory(category)}
                  >
                    {category}
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
            {results.map(quiz => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
              />
            ))}
          </div>
        ) : (
          <p className="browse-empty">
            No quizzes found.
          </p>
        )
      ) : (
        <>
          <QuizList
            title="Featured"
            quizzes={FEATURED}
          />

          <QuizList
            title="Recommended"
            quizzes={RECOMMENDED}
          />
        </>
      )}
    </Layout>
  );
}