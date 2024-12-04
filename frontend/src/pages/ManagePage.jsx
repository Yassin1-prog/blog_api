import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPosts, deletePost, togglePublishPost } from "../api";
import PostPreview from "../components/PostPreview";

const ManagePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const allPosts = await fetchPosts(); // Fetches all posts
        setPosts(allPosts);
      } catch {
        setError("Failed to fetch posts.");
      }
    };
    fetchAllPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch {
      setError("Failed to delete the post.");
    }
  };

  const handleTogglePublish = async (Post) => {
    try {
      const updatedPost = await togglePublishPost(Post.id, Post);
      setPosts(posts.map((post) => (post.id === Post.id ? updatedPost : post)));
    } catch {
      setError("Failed to update post status.");
    }
  };

  const handleEdit = (postId) => {
    navigate(`edit/${postId}`);
  };

  return (
    <div className="manage-post-page">
      <h1>Manage Posts</h1>
      {error && <p className="error">{error}</p>}
      <button className="btn" onClick={() => navigate("add")}>
        Create New Post
      </button>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <PostPreview key={post.id} post={post} />
            <div className="post-actions">
              <button className="btn" onClick={() => handleEdit(post.id)}>
                Edit
              </button>
              <button className="btn" onClick={() => handleTogglePublish(post)}>
                {post.published ? "Unpublish" : "Publish"}
              </button>
              <button className="btn" onClick={() => handleDelete(post.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePage;
