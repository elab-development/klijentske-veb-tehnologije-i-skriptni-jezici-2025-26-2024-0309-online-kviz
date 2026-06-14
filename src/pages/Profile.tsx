import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useUser } from '../context/UserContext';
import type { QuizResultEntry } from '../context/UserContext';
import '../css/Profile.css';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
}

function ResultCard({ entry }: { entry: QuizResultEntry }) {
  return (
    <div className="profile-result-card">
      <div className="profile-result-header">
        <span className="profile-result-title">{entry.quizTitle}</span>
        <span className="profile-result-score">{entry.scorePercent}%</span>
      </div>
      <div className="profile-result-meta">
        <span>{entry.correct}/{entry.total} correct</span>
        <span>·</span>
        <span>{formatTime(entry.timeElapsed)}</span>
        <span>·</span>
        <span>{formatDate(entry.date)}</span>
      </div>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, quizResults } = useUser();

  const displayName = user?.username ?? 'Guest';
  const displayEmail = user?.email ?? '';

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <Layout>
      <div className="profile-user-info">
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar-fallback">
            {displayName.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="profile-user-details">
          <h2 className="profile-username">{displayName}</h2>
          {displayEmail && <p className="profile-email">{displayEmail}</p>}
        </div>
      </div>

      <div className="profile-section">
        <h3 className="profile-section-title">Recent Results</h3>
        {quizResults.length > 0 ? (
          <div className="profile-results-list">
            {quizResults.map((entry, i) => (
              <ResultCard key={i} entry={entry} />
            ))}
          </div>
        ) : (
          <p className="profile-no-results">No quiz results yet. Complete a quiz to see your history!</p>
        )}
      </div>

      <div className="profile-actions">
        <button
          className="profile-btn profile-btn--primary"
          onClick={() => navigate('/changepassword')}
        >
          Change password
        </button>
        <button
          className="profile-btn profile-btn--secondary"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </Layout>
  );
}