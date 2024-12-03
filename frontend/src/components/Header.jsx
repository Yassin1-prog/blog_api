import { Link } from "react-router-dom";

const Header = ({ islogged, isAdmin, onLeave }) => {
  return (
    <header>
      <h1>Blog App</h1>
      <nav>
        <Link to="/">Home</Link>
        {isAdmin && <Link to="/manage-posts">Manage Posts</Link>}
        {islogged && (
          <a
            href="/"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              localStorage.removeItem("id");
              onLeave(false);
            }}
          >
            Logout
          </a>
        )}
      </nav>
    </header>
  );
};

export default Header;
