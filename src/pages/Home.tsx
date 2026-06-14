import { useUser } from '../context/UserContext';
import Layout from '../components/Layout';
import QuizList from '../components/QuizList';
import { RECOMMENDED, FEATURED } from '../data/quizzes';
import '../css/Home.css';

export default function HomePage() {
  const { user } = useUser();

  return (
    <Layout>
      <h1 className="home-greeting">Welcome back, {user?.username ?? 'Guest'}!</h1>
      <QuizList title="Recommended" quizzes={RECOMMENDED} />
      <QuizList title="Featured" quizzes={FEATURED} />
    </Layout>
  );
}