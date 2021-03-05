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

blogListsRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then(returnedBlogList => {
      res.json(returnedBlogList);
    })
    .catch(error => next(error));
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

blogListsRouter.delete('/:id', (req, res, next) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = blogListsRouter;