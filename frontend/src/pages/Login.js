import { useState } from 'react';
import api from '../api/axios';
import { setToken } from '../auth/token';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      setToken(response.data.access_token);
      navigate('/posts');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Log In</h2>

      {error && <p className="error-message">{error}</p>}

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Log In</button>

      <p className="signup-link">
        Don't have an account? <Link to="/register">Create Account</Link>
      </p>
    </form>
  );
}

export default Login;
