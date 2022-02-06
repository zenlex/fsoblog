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
});

afterAll(() => {
  mongoose.connection.close();
});
