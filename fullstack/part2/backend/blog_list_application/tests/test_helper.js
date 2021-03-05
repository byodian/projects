const Blog = require('../models/blogList');

const initialBlogs = [
  {
    'title': 'HTML is so easy',
    'author': 'byodian',
    'url': 'https://byodiandev.com',
    'likes': 2,
  },
  {
    'title': 'JavaScript is so hard',
    'author': 'byodian',
    'url': 'https://byodiandev.com',
    'likes': 4,
  }
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON(blog));
};

module.exports = {
  blogsInDb,
  initialBlogs
};