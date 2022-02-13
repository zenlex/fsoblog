// INFO LOGGER
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') console.log(...params);
};

// ERROR LOGGER
const error = (...params) => {
  console.error(...params);
};

module.exports = { info, error };
