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
    title: 'Klijentske veb tehnologije',
    description: 'Proverite svoje znanje iz osnova frontend developmenta',
    author: 'ELAB',
    rating: 10,
    maxRating: 10,
    questionCount: 20,
    // imageUrl: '/src/assets/elab.png',
    type: 'form' as const,
  },
  {
    id: 2,
    title: 'Ekonomija',
    description: 'Proverite svoje znanje iz ekonomije',
    author: 'John Keynes',
    rating: 2,
    maxRating: 10,
    questionCount: 15,
    // imageUrl: '/src/assets/ekonomija.png',
    type: 'form' as const,
  },
  {
    id: 3,
    title: 'AROS - flashcards',
    description: 'Brzi kviz iz AROS-a za ispit i kolokvijume',
    author: 'Admin',
    rating: 8,
    maxRating: 10,
    questionCount: 60,
    // imageUrl: '/src/assets/aros.png',
    type: 'flashcards' as const,
  },
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