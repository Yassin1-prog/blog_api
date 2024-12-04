import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById, addComment, deleteComment } from "../api";

const PostPage = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await fetchPostById(id);
        setPost(fetchedPost);
      } catch {
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment) {
      setError("Comment cannot be empty.");
      return;
    }

    try {
      const comment = await addComment(id, newComment);
      setPost({
        ...post,
        comments: [...post.comments, comment],
      });
      setNewComment("");
    } catch {
      setError("Failed to add comment. Please try again.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(id, commentId);
      setPost({
        ...post,
        comments: post.comments.filter((comment) => comment.id !== commentId),
      });
    } catch {
      setError("Failed to delete comment.");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!post) return <p>Post not found.</p>;

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>
        By {post.author.username}, on{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <hr />
      <h2>Comments</h2>
      {error && <p className="error">{error}</p>}
      <div className="comments">
        {post.comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.content}</p>
            <p>
              <small>
                By {comment.author.username}, on{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </small>
            </p>
            {parseInt(localStorage.getItem("id")) === comment.authorId && (
              <button
                className="btn delete-btn"
                onClick={() => handleDeleteComment(comment.id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleAddComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button type="submit" className="btn">
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default PostPage;
