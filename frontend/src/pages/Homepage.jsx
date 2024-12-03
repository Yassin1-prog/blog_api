import { useEffect, useState } from "react";
import PostPreview from "../components/PostPreview";
import WelcomePage from "./WelcomePage";
import { fetchPosts } from "../api";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(() => setError("Failed to load posts."));
  }, []);

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    // Check if token exists and is not empty
    return token !== null && token !== "";
  };

  return isAuthenticated() ? (
    <div>
      <h1>All Posts</h1>
      {error && <p className="error">{error}</p>}
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </div>
  ) : (
    <WelcomePage />
  );
};

export default Homepage;
