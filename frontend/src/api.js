const API_URL = "http://localhost:3000";

export const fetchPosts = async () => {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) throw new Error("Error fetching posts");
  return res.json();
};

export const deletePost = async (postId) => {
  const res = await fetch(`${API_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
};

export const togglePublishPost = async (postId) => {
  const res = await fetch(`${API_URL}/posts/${postId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ published: true }), // Toggle published status
  });
  if (!res.ok) throw new Error("Failed to update post status");
  return res.json();
};

export const createPost = async ({ title, content, authorId }) => {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      authorId,
      title,
      content,
      published: false, // By default, new posts are unpublished
    }),
  });

  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
};
