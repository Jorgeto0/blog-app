import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing">
      <div className="landing-content">
        <h1>My Blog</h1>
        <p>Share your thoughts</p>
        
        <div className="landing-buttons">
          <Link to="/login" className="btn-signin">Sign In</Link>
          <Link to="/register" className="btn-signup">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
