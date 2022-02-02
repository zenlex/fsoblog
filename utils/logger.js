// INFO LOGGER
const info = (...params) => {
  console.log(...params);
}

// ERROR LOGGER
const error = (...params) => {
  console.error(...params);
}

module.exports = { info, error }