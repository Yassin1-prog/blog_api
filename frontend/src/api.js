const API_URL = "http://localhost:3000";

export const fetchPosts = async () => {
  const res = await fetch(`${API_URL}/posts/admin`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Error fetching posts");
  return res.json();
};

export const fetchPublicPosts = async () => {
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
  // my rest api doesnt return anything when deleting (204 no content)
  // so res.json() causes errors
  //return res.json();
  return true;
};

export const togglePublishPost = async (postId, post) => {
  const res = await fetch(`${API_URL}/posts/${postId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ published: !post.published }), // Toggle published status
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
