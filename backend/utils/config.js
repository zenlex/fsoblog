require('dotenv').config();

const MONGO_URL = process.env.NODE_ENV === 'test'
  ? process.env.MONGO_TESTURL
  : process.env.MONGO_URL;
const { PORT } = process.env;

module.exports = { MONGO_URL, PORT };
