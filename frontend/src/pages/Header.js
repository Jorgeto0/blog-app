import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../auth/token';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../auth/user';

function Header() {
  const navigate = useNavigate();
  const isAuth = !!getToken();
  const [currentUser, setCurrentUser] = useState(null);

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
          <Link to="/" className="logo">My Blog</Link>
          <nav>
            {isAuth && currentUser ? (
              <div className="header-user">
                <img
                  src={currentUser.image ? (currentUser.image.startsWith('http') ? currentUser.image : `http://localhost:8000/storage/${currentUser.image}`) : 'https://via.placeholder.com/40?text=User'}
                  alt={currentUser.name}
                  className="header-avatar"
                  title={currentUser.name}
                  onError={(e) => {e.target.src = 'https://via.placeholder.com/40?text=User'}}
                />
                <button className="link-btn" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/" className="home-link">Home</Link>
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
