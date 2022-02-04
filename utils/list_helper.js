const _ = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) => {
  const result = blogs.reduce((sum, post) => sum + post.likes, 0);
  return result;
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((post) => post.likes);
  const max = Math.max(...likes);
  return blogs.find((post) => post.likes === max);
};

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs.map((blog) => blog.author));
  const max = Math.max(...Object.values(counts));
  const authors = Object.entries(counts)
    .filter(([, count]) => count === max);
  const result = {
    author: authors[0][0],
    titles: authors[0][1],
  };
  return result;
};

const mostLikes = (blogs) => {
  const authorLikes = {};
  blogs.forEach((blog) => {
    const { author, likes } = blog;
    if (authorLikes[author]) {
      authorLikes[author] += likes;
    } else {
      authorLikes[author] = likes;
    }
  });
  const max = Math.max(...Object.values(authorLikes));
  const winners = Object
    .entries(authorLikes)
    .filter(([, likes]) => likes === max);
  const result = { author: winners[0][0], likes: winners[0][1] };
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
