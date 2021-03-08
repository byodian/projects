const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 });

    res.json(blogs);
  } catch(exception) {
    next(exception);
  }
});

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog
      .findById(req.params.id)
      .populate('user', { username: 1, name: 1 });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch(exception) {
    next(exception);
  }
});

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body;
  const user = await User.findById(body.userId);

  if (!body.title || !body.url) {
    return res.status(400).send({ error: 'title missing' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author || 'byodian',
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.json(savedBlog);
  } catch(exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedBlogId = req.params.id;
    const body = req.body;

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    };

    const updatedBlog = await Blog.findByIdAndUpdate(
      updatedBlogId, blog, { new: true }
    );

    res.json(updatedBlog);
  } catch(exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch(exception) {
    next(exception);
  }
});

module.exports = blogsRouter;