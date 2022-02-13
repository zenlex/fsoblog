const listHelper = require('../utils/list_helper');
const testBlogs = require('./testblogs');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the likes of that blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test('for multiple blogs, it equals the total of all likes', () => {
    const result = listHelper.totalLikes(testBlogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('returns first blog with max likes', () => {
    const result = listHelper.favoriteBlog(testBlogs);
    expect(result).toEqual(testBlogs[2]);
  });
});

describe('most blogs', () => {
  test('returns one author with max titles', () => {
    const result = listHelper.mostBlogs(testBlogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      titles: 3,
    });
  });
});

describe('most likes', () => {
  test('returns object with an author who had most likes', () => {
    expect(listHelper.mostLikes(testBlogs)).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: 17,
      },
    );
  });
});
