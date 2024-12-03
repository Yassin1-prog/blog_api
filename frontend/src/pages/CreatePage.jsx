import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }

    try {
      const id = localStorage.getItem("id");
      // for some reason even though i store id in localstorage as an integer
      // when retrieved it comes back as a string
      const authorId = parseInt(id);
      await createPost({ title, content, authorId });
      navigate("/manage-posts");
    } catch {
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="create-post-page">
      <h1>Create New Post</h1>
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
