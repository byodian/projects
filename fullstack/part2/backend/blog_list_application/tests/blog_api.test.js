const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');
const { initialBlogs, blogsInDb, nonExistingId, usersInDb } = require('./test_helper');

/* eslint-disable no-undef */
beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('selerina', 10);
  const user = new User({ username: 'root', name: 'supername', passwordHash });
  await user.save();

  const blogs = initialBlogs
    .map(blog => {
      blog.user = user._id;
      return blog;
    })
    .map(blog => new Blog(blog));

  for (let blog of blogs) {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
  }
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
    const user = {
      username: 'root',
      password: 'selerina'
    };

    const result = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /json/);

    const blogsAtStart = await blogsInDb();
    const blogToDelete = blogsAtStart[0];
    console.log(blogToDelete);

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${result.body.token}`)
      .expect(204);
    const blogsAtEnd = await blogsInDb();

    console.log(blogsAtEnd);
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);
  });
});

describe('addition of a new blog', () => {
  test('succeeds with a valid data', async () => {
    const superuser = {
      username: 'root',
      password: 'selerina'
    };

    const result = await api
      .post('/api/login')
      .send(superuser)
      .expect(200);

    const newBlog = {
      title: 'browser can only execute javascript code',
      url: 'https://byodian.com/posts',
      likes: 6,
      author: 'root'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${result.body.token}`)
      .expect(200)
      .expect('Content-Type', /json/);

    const blogs = await blogsInDb();
    expect(blogs).toHaveLength(initialBlogs.length + 1);

    const titles = blogs.map(blog => blog.title);
    expect(titles).toContain('browser can only execute javascript code');
  });

  test('falis with statuscode 400 if data is invalid', async () => {
    const superuser = {
      username: 'root',
      password: 'selerina'
    };

    const result = await api
      .post('/api/login')
      .send(superuser)
      .expect(200);

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
      .set('Authorization', `bearer ${result.body.token}`)
      .expect(400);

    await api
      .post('/api/blogs')
      .send(blognoUrl)
      .set('Authorization', `bearer ${result.body.token}`)
      .expect(400);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test('succeeds with a valid data with missing likes dafault value is 0', async () => {
    const superuser = {
      username: 'root',
      password: 'selerina'
    };

    const result = await api
      .post('/api/login')
      .send(superuser)
      .expect(200);

    const newBlog = {
      title: 'VS Code is awesome editor',
      url: 'https://byodiandev.com/posts',
      author: 'root'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${result.body.token}`)
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
      'user': blogToUpdate.user
    };

    const resultBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /json/);

    const blogsAtEnd = await blogsInDb();
    const processedBlogToChange = JSON.parse(JSON.stringify(blogsAtEnd[0]));
    expect(resultBlog.body).not.toEqual(processedBlogToChange);

    const likes = blogsAtEnd.map(blog => blog.likes);
    expect(likes).toContain(6);
  });
});

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'byodian',
      name: 'baiyongjian',
      password: 'selerina'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb();
    const newUser = {
      username: 'root',
      name: 'supername',
      password: 'selerina'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with statuscode 400 if password is missing', async () => {
    const newUser = {
      username: 'selena',
      name: 'Liuyajuan'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('creation fails with statuscode 400 if the length of username or password is less than 3', async () => {
    const newUser1 = {
      username: 'se',
      name: 'Liuyajuan',
      password: 'selerina'
    };

    const newUser2 = {
      username: 'woooooo',
      name: 'hahahahhaha',
      password: 'se'
    };

    const result1 = await api
      .post('/api/users')
      .send(newUser1)
      .expect(400)
      .expect('Content-Type', /json/);

    const result2 = await api
      .post('/api/users')
      .send(newUser2)
      .expect(400);

    expect(result1.body.error).toContain(
      'Path `username` (`se`) is shorter than the minimum allowed length'
    );
    expect(result2.body.error).toContain(
      'shorter than the minimum allowed length'
    );
  });
});

describe('login in', () => {
  test('succeeds with a correct password', async () => {
    const user = {
      username: 'root',
      password: 'selerina'
    };

    const result = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(result.body.token).toBeDefined();
  });

  test('fails with a statuscode 401 if password is incorrect', async () => {
    const user = {
      username: 'root',
      password: 'sekerina'
    };

    await api
      .post('/api/login')
      .send(user)
      .expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});