import { useEffect, useState } from "react";
import PostPreview from "../components/PostPreview";
import WelcomePage from "./WelcomePage";
import { fetchPublicPosts } from "../api";

const Homepage = ({ islogged }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPublicPosts()
      .then(setPosts)
      .catch(() => setError("Failed to load posts."));
  }, []);

  return islogged ? (
    <div>
      <h1>All Posts</h1>
      {error && <p className="error">{error}</p>}
      <div className="postPreview">
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
    </div>
  ) : (
    <WelcomePage />
  );
};

export default Homepage;
