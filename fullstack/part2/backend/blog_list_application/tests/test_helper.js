const Blog = require('../models/blogList');

const initialBlogs = [
  {
    'title': 'HTML is so easy',
    'author': 'byodian',
    'url': 'https://byodiandev.com',
    'date': new Date(),
    'likes': 2,
  },
  {
    'title': 'JavaScript is so hard',
    'author': 'byodian',
    'url': 'https://byodiandev.com',
    'date': new Date(),
    'likes': 4,
  }
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON(blog));
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'a good person that help homeless people',
    url: 'https://byodiandev.com/about',
    likes: 4,
    author: 'Pthton',
    date: new Date()
  });

  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

module.exports = {
  blogsInDb,
  nonExistingId,
  initialBlogs
};