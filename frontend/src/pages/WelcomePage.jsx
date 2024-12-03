import { Link } from "react-router-dom";

const WelcomePage = () => (
  <div className="welcome-page">
    <h1>Welcome to the Blog App</h1>
    <div className="auth-links">
      <Link to="/register" className="btn">
        Register
      </Link>
      <Link to="/signin" className="btn">
        Sign In
      </Link>
    </div>
  </div>
);

export default WelcomePage;
