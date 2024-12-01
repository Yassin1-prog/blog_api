const db = require("../models/queries");

exports.allpostsGet = async (req, res) => {
  try {
    const posts = await db.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postsGet = async (req, res) => {
  try {
    const post = await db.getPostById(parseInt(req.params.id));
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postsPost = async (req, res) => {
  try {
    const post = await db.createPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postsPut = async (req, res) => {
  try {
    const post = await db.updatePost(parseInt(req.params.id), req.body);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postsDelete = async (req, res) => {
  try {
    await db.deletePost(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.commentsGet = async (req, res) => {
  try {
    const comments = await db.getCommentsByPostId(parseInt(req.params.postId));
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.commentsPost = async (req, res) => {
  try {
    const commentData = { ...req.body, postId: parseInt(req.params.postId) };
    const comment = await db.createComment(commentData);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.commentsDelete = async (req, res) => {
  try {
    await db.deleteComment(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
