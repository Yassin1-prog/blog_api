const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Users
const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

const getUserByName = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

const createUser = async (username, password) => {
  return await prisma.user.create({
    data: {
      username,
      password,
    },
  });
};

const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
};

// Posts
const getAllPosts = async () => {
  return await prisma.post.findMany({
    where: { published: true },
    include: { author: true, comments: true },
  });
};

const getPostById = async (id) => {
  return await prisma.post.findUnique({
    where: { id },
    include: { author: true, comments: true },
  });
};

const createPost = async (data) => {
  return await prisma.post.create({
    data,
  });
};

const updatePost = async (id, data) => {
  return await prisma.post.update({
    where: { id },
    data,
  });
};

const deletePost = async (id) => {
  return await prisma.post.delete({
    where: { id },
  });
};

// Comments
const getCommentsByPostId = async (postId) => {
  return await prisma.comment.findMany({
    where: { postId },
    include: { author: true },
  });
};

const createComment = async (data) => {
  return await prisma.comment.create({
    data,
  });
};

const deleteComment = async (id) => {
  return await prisma.comment.delete({
    where: { id },
  });
};

module.exports = {
  // User Queries
  getUserById,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
  // Post Queries
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  // Comment Queries
  getCommentsByPostId,
  createComment,
  deleteComment,
};
