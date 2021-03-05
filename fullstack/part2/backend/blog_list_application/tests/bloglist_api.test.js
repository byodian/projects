const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blogList');
const { initialBlogs, blogsInDb } = require('./test_helper');

/* eslint-disable no-undef */
beforeEach(async () => {
  await Blog.deleteMany({});

  const blogs = initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogs.map(blog => blog.save());

  await Promise.all(promiseArray);
});

describe('blog lists api test', () => {
  test('blog lists are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  test('all blogs are returned', async () => {
    await api
      .get('/api/blogs')
      .expect(200);

    const blogs = await blogsInDb();
    expect(blogs).toHaveLength(initialBlogs.length);
  });

  test('a blog data has a unique id property', async () => {
    const blogs = await blogsInDb();
    expect(blogs[0]['id']).toBeDefined();
  });

  test('a specific blog is within the returned blogs', async () => {
    const blogsAtEnd = await blogsInDb();
    const blogsToView = blogsAtEnd[0];

    const returnedBlog = await api
      .get(`/api/blogs/${blogsToView.id}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(returnedBlog.body.title).toBe(
      'HTML is so easy'
    );
  });

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'browser can only execute javascript code',
      url: 'https://byodian.com/posts',
      likes: 6,
      author: 'liuyajuan'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /json/);

    const blogs = await blogsInDb();
    expect(blogs).toHaveLength(initialBlogs.length + 1);

    const titles = blogs.map(blog => blog.title);
    console.log(titles);
    expect(titles).toContain('browser can only execute javascript code');
  });

  test('a blog without title or url is not added', async () => {
    const blognoTitle = {
      url: 'https://byodian.com/posts',
      likes: 12,
      author: 'emenim'
    };

    const blognoUrl = {
      title: 'a good idea is makeing cook right now',
      likes: 2,
      author: 'Lily'
    };

    await api
      .post('/api/blogs')
      .send(blognoTitle)
      .expect(400);

    await api
      .post('/api/blogs')
      .send(blognoUrl)
      .expect(400);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test('when the likes porperty is missing, the default value is 0', async () => {
    const newBlog = {
      title: 'VS Code is awesome editor',
      url: 'https://byodiandev.com/posts',
      author: 'BYJ'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /json/);

    const blogsAtEnd = await blogsInDb();

    const savedBlog = blogsAtEnd.filter(blog => blog.title === 'VS Code is awesome editor');
    expect(savedBlog[0]['likes']).toBe(0);
  });

  test('succeeds with statuscode 200 if id is valid', async () => {
    const blogsAtStart = await blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    console.log(blogToUpdate.date);

    const newBlog = {
      'title': 'HTML is so easy',
      'author': 'byodian',
      'url': 'https://byodiandev.com',
      'likes': 6,
    };

    const resultBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /json/);

    console.log(resultBlog.body);

    const blogsAtEnd = await blogsInDb();
    const processedBlogToChange = JSON.parse(JSON.stringify(blogsAtEnd[0]));
    expect(resultBlog.body).toEqual(processedBlogToChange);

    const likes = blogsAtEnd.map(blog => blog.likes);
    expect(likes).toContain(6);
  });

  test('succeeds with statuscode 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});