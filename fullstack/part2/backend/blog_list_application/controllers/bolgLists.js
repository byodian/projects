const blogListsRouter = require('express').Router();
const Blog = require('../models/blogList');

blogListsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch(exception) {
    next(exception);
  }
});

blogListsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch(exception) {
    next(exception);
  }
});

blogListsRouter.post('/', async (req, res, next) => {
  const body = req.body;

  if (!body.title || !body.url) {
    return res.status(400).send({ error: 'title missing' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author || 'byodian',
    url: body.url,
    likes: body.likes || 0
  });

  try {
    const savedBlog = await blog.save();
    res.json(savedBlog);
  } catch(exception) {
    next(exception);
  }
});

blogListsRouter.put('/:id', async (req, res, next) => {
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

blogListsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch(exception) {
    next(exception);
  }
});

module.exports = blogListsRouter;