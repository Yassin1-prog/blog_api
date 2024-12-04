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
// WHEN INCLUDE IT FETCHES THE COMMENTS AS WELL, (SQL JOIN) AND THAT WOULD
// MAKE THE REST OF THE COMMENTS GET PRETTY USELESS, MY CHOICE WHICH PATH
/*
const getAllPublicPosts = async () => {
  return await prisma.post.findMany({
    where: { published: true },
    include: { author: true, comments: true },
  });
};
*/
const getAllPublicPosts = async () => {
  return await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });
};

const getAllPosts = async () => {
  return await prisma.post.findMany({
    include: { author: true }, // cause i want the author name not id
  });
};
/*
const getPostById = async (id) => {
  return await prisma.post.findUnique({
    where: { id },
    include: { author: true, comments: true },
  });
};
*/
// BECAUSE I WANT TO KNOW WHO WROTE EACH COMMENT, NESTED INCLUDE
const getPostById = async (id) => {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      comments: {
        include: {
          author: true, // This will include the author of each comment
        },
      },
    },
  });
};

const createPost = async (authorId, title, content, published) => {
  return await prisma.post.create({
    data: {
      authorId,
      title,
      content,
      published,
    },
  });
};

// works and you can pass req.body as data without deconstructing but req.body should only
// have relevant fields which is easy to do from the frontend, less than req.body is fine and wont throw an error
// but new fields that dont exist would break
const updatePost = async (id, data) => {
  return await prisma.post.update({
    where: { id },
    include: { author: true },
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
    include: { author: true },
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
  getAllPublicPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  // Comment Queries
  getCommentsByPostId,
  createComment,
  deleteComment,
};
