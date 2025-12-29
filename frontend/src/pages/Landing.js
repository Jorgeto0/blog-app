import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing">
      <div className="landing-content">
        <h1>My Blog</h1>
        <h3>Share your thoughts.</h3>
        <p>Note: Every post is automatically deleted after 24 hours.</p>
        
        <div className="landing-buttons">
          <Link to="/login" className="btn-signin">Sign In</Link>
          <Link to="/register" className="btn-signup">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
