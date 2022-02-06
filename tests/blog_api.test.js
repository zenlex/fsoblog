/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const testblogs = require('./testblogs');

describe('route testing', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogs = testblogs.map((blog) => new Blog(blog));
    const promiseArr = blogs.map((blog) => blog.save());

    await Promise.all(promiseArr);
  });
  describe('get all blogs', () => {
    test('returns correct number of blogs', async () => {
      const response = await api.get('/api/blogs');

      expect(response.body).toHaveLength(testblogs.length);
    });

    test('returns JSON', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
  });

  describe('id property', () => {
    test('is named "id" not "_id" and __v deleted', async () => {
      const response = await api
        .get('/api/blogs');

      const blogToCheck = response.body[0];
      expect(blogToCheck.id).toBeDefined();
      expect(blogToCheck._id).not.toBeDefined();
      expect(blogToCheck.__v).not.toBeDefined();
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
