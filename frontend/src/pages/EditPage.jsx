import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostById, updatePost } from "../api";

const EditPage = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await fetchPostById(id);
        setTitle(post.title);
        setContent(post.content);
      } catch {
        setError("Failed to load post data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }

    try {
      await updatePost(id, { title, content });
      navigate("/manage-posts");
    } catch {
      setError("Failed to update post. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-post-page">
      <h1>Edit Post</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPage;
