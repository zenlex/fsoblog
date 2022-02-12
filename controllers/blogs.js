/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const { response } = require('express');
const User = require('../models/user');
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const { body, token } = req;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: user.name,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
  const result = await Blog.findByIdAndDelete(req.params.id);
  res.status(200).json(result);
});

blogsRouter.put('/:id', async (req, res) => {
  const result = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (result) {
    return res.status(200).json(result);
  }
  return res.status(404).end();
});

module.exports = blogsRouter;
