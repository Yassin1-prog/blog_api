import { useEffect, useState } from "react";
import PostPreview from "../components/PostPreview";
import { fetchPosts } from "../api";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(() => setError("Failed to load posts."));
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      {error && <p className="error">{error}</p>}
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Homepage;
