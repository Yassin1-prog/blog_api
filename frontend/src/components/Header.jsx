import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setIsAdmin(userRole === "admin");
  }, []);

  return (
    <header>
      <h1>Blog App</h1>
      <nav>
        <Link to="/">Home</Link>
        {isAdmin && <Link to="/manage-posts">Manage Posts</Link>}
        {localStorage.getItem("token") !== null && (
          <a
            href="/"
            onClick={() => {
              localStorage.setItem("token", "");
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
