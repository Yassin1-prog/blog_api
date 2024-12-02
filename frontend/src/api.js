const API_URL = "http://localhost:3000";

export const fetchPosts = async () => {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) throw new Error("Error fetching posts");
  return res.json();
};
