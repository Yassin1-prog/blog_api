import { Link } from "react-router-dom";

const PostPreview = ({ post }) => (
  <div className="post-preview">
    <Link to={`/posts/${post.id}`}>
      <h2>{post.title}</h2>
      <p>{post.content.slice(0, 100)}...</p>
      <p>
        By {post.author.username}, on{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </Link>
  </div>
);

export default PostPreview;
