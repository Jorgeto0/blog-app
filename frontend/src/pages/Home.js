import { removeToken } from '../auth/token';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <>
      <h2>Welcome back! 👋</h2>
      <p>You're logged in. Head over to <strong>Posts</strong> to start creating and sharing content.</p>
    </>
  );
}

export default Home;

