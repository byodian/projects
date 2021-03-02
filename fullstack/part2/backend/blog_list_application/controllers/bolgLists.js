const blogListsRouter = require('express').Router();
const Blog = require('../models/blogList');

blogListsRouter.get('/', (req, res, next) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs);
    })
    .catch(error => next(error));
});

blogListsRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then(returnedBlogList => {
      res.json(returnedBlogList);
    })
    .catch(error => next(error));
});

blogListsRouter.post('/', (req, res, next) => {
  const body = req.body;

  if (!body.title) {
    return res.status(400).send({ error: 'title missing' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author || 'byodian',
    url: 'https://byodiandev.com',
    likes: Math.floor(Math.random() * 10)
  });

  blog
    .save()
    .then(savedBlogList => {
      res.json(savedBlogList);
    })
    .catch(error => next(error));
});

blogListsRouter.delete('/:id', (req, res, next) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = blogListsRouter;