import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import QuizList from '../components/QuizList';
import type { Quiz } from '../models/Quiz';
import '../css/Profile.css';

const user = {
  name: 'Pera Peric',
  email: 'peraperic@gmail.com',
  avatarUrl: '/src/assets/peraperic.png',
};

const RECENTQUIZZES: Quiz[] = [
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
  }
];

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Layout username={user.name.split(' ')[0]}>
          <div className="profile-user-info">
            <div className="profile-avatar-wrapper">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="Avatar" className="profile-avatar-img" />
              ) : (
                <div className="profile-avatar-fallback">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="profile-user-details">
              <h2 className="profile-username">{user.name}</h2>
              <p className="profile-email">{user.email}</p>
            </div>
          </div>

         <QuizList title="Recent Quizzes" quizzes={RECENTQUIZZES} />

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