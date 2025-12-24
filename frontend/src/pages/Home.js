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
      <h2>Welcome</h2>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default Home;

