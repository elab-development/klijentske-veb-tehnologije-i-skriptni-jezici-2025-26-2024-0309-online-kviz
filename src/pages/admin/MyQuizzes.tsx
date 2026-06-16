import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Layout from '../../components/Layout';
import QuizList from '../../components/QuizList';
import { ALL_QUIZZES } from '../../data/quizzes';
import '../../css/MyQuizzes.css';

export default function MyQuizzes() {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user?.isAdmin) {
    return (
      <Layout>
        <p className="my-quizzes-unauthorized">You don't have access to this page.</p>
      </Layout>
    );
  }

  const myQuizzes = ALL_QUIZZES.filter(q => q.author.toLowerCase() === user.username.toLowerCase());
  const popular = myQuizzes.filter(q => q.rating >= 7);

  return (
    <Layout>
      <div className="my-quizzes-header">
        <button className="my-quizzes-create-btn" onClick={() => navigate('/admin/quiz-editor/new')}>
          Create new quiz
        </button>
        <h1 className="my-quizzes-title">My quizzes</h1>
      </div>

      {myQuizzes.length === 0 ? (
        <p className="my-quizzes-empty">You haven't created any quizzes yet.</p>
      ) : (
        <>
          {popular.length > 0 && (
            <QuizList title="Popular" quizzes={popular} />
          )}
          <QuizList title="All quizzes" quizzes={myQuizzes} />
        </>
      )}
    </Layout>
  );
}
