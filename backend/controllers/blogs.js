/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const { body, user } = req;

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
  const { user } = req;

  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(400).json({ error: 'blog not found' });

  if (blog.user.toString() === user.id) {
    const result = await Blog.deleteOne(blog);
    return res.status(200).json(result);
  }
  return res.status(401).json({ error: 'only author can delete post' });
});

blogsRouter.put('/:id', async (req, res) => {
  const { user, body } = req;

  const blog = await Blog.findById(req.params.id);

  let updatedBlog;
  if (blog.user.toString() === user.id) {
    updatedBlog = await Blog.findByIdAndUpdate(req.params.id, body);
  }
  if (updatedBlog) {
    return res.status(200).json(updatedBlog);
  }
  return res.status(404).end();
});

module.exports = blogsRouter;
