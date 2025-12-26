import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing">
      <div className="landing-content">
        <h1>📝 Share Your Stories</h1>
        <h2>Join Our Community Blog</h2>
        <p className="landing-intro">
          Create meaningful posts, engage with comments, and be part of a vibrant community.
        </p>
        
        <div className="features">
          <div className="feature">
            <span className="feature-icon">✍️</span>
            <h3>Write Freely</h3>
            <p>Share your thoughts and ideas. Posts automatically expire after 24 hours.</p>
          </div>
          <div className="feature">
            <span className="feature-icon">💬</span>
            <h3>Engage & Comment</h3>
            <p>Discuss with community members through thoughtful comments on posts.</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🏷️</span>
            <h3>Organize Content</h3>
            <p>Tag your posts to help others find content they're interested in.</p>
          </div>
        </div>

        <p className="landing-cta">
          Ready to start sharing? Join us today!
        </p>

        <div className="landing-buttons">
          <Link to="/login" className="btn-signin">Sign In</Link>
          <Link to="/register" className="btn-signup">Create Account</Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
