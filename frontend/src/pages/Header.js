import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getToken, removeToken } from '../auth/token';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../auth/user';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = !!getToken();
  const [currentUser, setCurrentUser] = useState(null);
  const isLanding = location.pathname === '/';

  useEffect(() => {
    if (isAuth) {
      getCurrentUser().then(setCurrentUser).catch(() => setCurrentUser(null));
    }
  }, [isAuth]);

  const logout = () => {
    removeToken();
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <>
      <header className="app-header">
        <div className="container header-inner">
          <p className="logo">My Blog</p>
          <nav>
            {isAuth && currentUser ? (
              <div className="header-user">
                <img
                  src={currentUser.image ? (currentUser.image.startsWith('http') ? currentUser.image : `http://localhost:8000/storage/${currentUser.image}`) : '/default-avatar.png'}
                  alt={currentUser.name}
                  className="header-avatar"
                  title={currentUser.name}
                  onError={(e) => {e.target.src = '/default-avatar.png'}}
                />
                <button className="link-btn" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              !isLanding && <Link to="/" className="home-link">Home</Link>
            )}
          </nav>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default Header;
