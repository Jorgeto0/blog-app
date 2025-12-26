import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../auth/token';

function Layout() {
  const navigate = useNavigate();
  const isAuth = !!getToken();

  const logout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <>
      <header className="app-header">
        <div className="container header-inner">
          <div className="logo">Blog Platform</div>
          <nav>
            {isAuth ? (
              <>
                <button className="link-btn" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/">Home</Link>
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

export default Layout;
