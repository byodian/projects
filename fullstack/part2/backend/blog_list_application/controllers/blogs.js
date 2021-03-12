const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
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

  if (!req.token) {
    return res.status(401).json({ error: 'missing token' });
  }

  let decoded;
  try {
    decoded = jwt.verify(req.token, process.env.SECRET); // eslint-disable-line
  } catch(exception) {
    return res.status(401).json({ error: 'invalid token' });
  }

  const user = await User.findById(decoded.id);
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

    const populatedBlog = await Blog
      .findById(savedBlog._id)
      .populate(
        'user', { username: 1, name: 1 }
      );
    res.json(populatedBlog);
  } catch(exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedBlogId = req.params.id;
    const body = req.body;

    const user = await User.findById(body.user);

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    };

    const updatedBlog = await Blog
      .findByIdAndUpdate(updatedBlogId, blog, { new: true })
      .populate('user', { username: 1, name: 1 });

    res.json(updatedBlog);
  } catch(exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  const token = req.token;
  const id = req.params.id;
  if (!token) {
    return res.status(401).json({ error: 'missing token' });
  }

  let decoded;

  try {
    decoded = jwt.verify(req.token, process.env.SECRET); // eslint-disable-line
  } catch(exception) {
    return res.status(401).json({ error: 'invalid token' });
  }

  const user = await User.findById(decoded.id);
  const userId = decoded.id.toString();

  try {
    const blog = await Blog.findById(id);
    if (blog.user.toString() === userId) {
      await Blog.findByIdAndRemove(id);
      user.blogs = user.blogs
        .filter(blog => (
          blog._id.toString() !== id.toString()
        ));
      await user.save();
      res.status(204).end();
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  } catch(exception) {
    next(exception);
  }
});

module.exports = blogsRouter;