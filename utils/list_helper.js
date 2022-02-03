const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const result = blogs.reduce((sum, post) => sum + post.likes, 0);
  return result;
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((post) => post.likes);
  const max = Math.max(...likes);
  return blogs.find((post) => post.likes === max);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
