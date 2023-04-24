const Post = require("../models/postModal.js");

// get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

// get specific post by id
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(204).send("can not find by this id");
    }
    res.send(posts);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(204).send("can not find by this id");
    }
    post.remove();
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

const updateTripById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(204).send("can not find by this id");
  }

  const { comments, likes } = req.body;

  if (comments != null) {
    post.comments = comments;
  }

  if (likes != null) {
    post.likes = likes;
  }

  try {
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

// create post
const createPost = async (req, res) => {
  const { title, location, author, likes, comments, date, photo } = req.body;
  try {
    const post = new Post({
  title: title,
      location,
      author,
      likes,
      comments,
      date,
      photo,
    });
    await post.save();
    res.status(201).json({ success: true, data: post });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  updateTripById,
};
