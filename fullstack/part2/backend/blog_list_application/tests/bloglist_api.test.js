const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blogList');
const { initialBlogs, blogsInDb, nonExistingId } = require('./test_helper');

/* eslint-disable no-undef */
beforeEach(async () => {
  await Blog.deleteMany({});

  const blogs = initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogs.map(blog => blog.save());

  await Promise.all(promiseArray);
});


describe('when there is initially some blogs saved', () => {
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
});

describe('viewing a specific data', () => {
  test('succeeds with a valid id', async () => {
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

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await nonExistingId();

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404);
  });

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400);
  });
});

describe('deletion of a blog', () => {
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

describe('addition of a new blog', () => {
  test('succeeds with a valid data', async () => {
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
    expect(titles).toContain('browser can only execute javascript code');
  });

  test('falis with statuscode 400 if data is invalid', async () => {
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

  test('succeeds with a valid data with missing likes dafault value is 0', async () => {
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
});

describe('updating a specific blog', () => {
  test('succeeds with statuscode 200 if id is valid', async () => {
    const blogsAtStart = await blogsInDb();
    const blogToUpdate = blogsAtStart[0];

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

    const blogsAtEnd = await blogsInDb();
    const processedBlogToChange = JSON.parse(JSON.stringify(blogsAtEnd[0]));
    expect(resultBlog.body).toEqual(processedBlogToChange);

    const likes = blogsAtEnd.map(blog => blog.likes);
    expect(likes).toContain(6);
  });
});

afterAll(() => {
  mongoose.connection.close();
});