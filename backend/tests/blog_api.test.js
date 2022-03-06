/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);
let token;
let testblogs = require('./testblogs');

let testUser = new User({
  username: 'root2',
  name: 'test user',
  passwordHash: null,
});

beforeAll(async () => {
  await User.deleteMany({});

  testUser.passwordHash = await bcrypt.hash('sekret', 10);

  testUser = await testUser.save();
  testblogs = testblogs.map((b) => ({ ...b, user: testUser.id }));

  const response = await api
    .post('/api/login')
    .send({ username: 'root2', password: 'sekret' });

  token = response.body.token;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogs = testblogs.map((blog) => new Blog(blog));
  const promiseArr = blogs.map((blog) => blog.save());

  await Promise.all(promiseArr);
});

describe('get all blogs', () => {
  test('returns correct number of blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toHaveLength(testblogs.length);
  });

  test('returns JSON', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('id property', () => {
  test('is named "id" not "_id" and __v deleted', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`);

    const blogToCheck = response.body[0];
    expect(blogToCheck.id).toBeDefined();
    expect(blogToCheck._id).not.toBeDefined();
    expect(blogToCheck.__v).not.toBeDefined();
  });
});

describe('post new blog', () => {
  test('new blog added with correct content', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const testBlog = {
      title: 'Added Blog for Testing',
      author: 'foo bar baz',
      url: 'http://zenlex.dev',
      username: testUser.username,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(testBlog)
      .expect(201);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain(testBlog.title);
  });
});

describe('default values', () => {
  test('likes set to 0 if not initialized', async () => {
    const testBlog = {
      title: 'blog for testing no likes',
      author: 'foo bar baz',
      username: testUser.username,
    };
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(testBlog);

    const addedBlog = response.body;
    expect(addedBlog.likes).toEqual(0);
  });
});

describe('required values', () => {
  test('missing required values ', async () => {
    const testBlog = {
      likes: 9000,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(testBlog)
      .expect(400);
  });
});

describe('delete blog', () => {
  test('successful with valid id', async () => {
    const blogToDelete = {
      title: 'blog to be deleted now with user',
      author: 'foo bar baz',
      username: testUser.username,
    };
    const saveResponse = await api
      .post('/api/blogs/')
      .set('Authorization', `bearer ${token}`)
      .send(blogToDelete);

    const blogsAfterAdd = await helper.blogsInDb();
    const url = `/api/blogs/${saveResponse.body.id}`;
    await api.delete(url).set('Authorization', `bearer ${token}`).expect(200);

    const blogsAfterDelete = await helper.blogsInDb();

    expect(blogsAfterDelete).toHaveLength(blogsAfterAdd.length - 1);
  }, 100000);
});

describe('update blog', () => {
  test('successful with valid id', async () => {
    const blogToUpdate = {
      title: 'blog to be updated',
      author: 'foo bar baz',
      username: testUser.username,
    };

    const saveResponse = await api
      .post('/api/blogs/')
      .set('Authorization', `bearer ${token}`)
      .send(blogToUpdate);

    const updates = {
      title: 'updated title',
      likes: 9000,
    };

    await api
      .put(`/api/blogs/${saveResponse.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(updates)
      .expect(200);

    const blogsAfterUpdate = await helper.blogsInDb();
    const updatedBlog = blogsAfterUpdate.find(
      (blog) => blog.id === saveResponse.body.id,
    );

    expect(updatedBlog.title).toBe(updates.title);
    expect(updatedBlog.likes).toBe(updates.likes);
  });
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});
