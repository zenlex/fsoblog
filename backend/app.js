const cors = require('cors');
const express = require('express');
require('express-async-errors');

const app = express();
const mongoose = require('mongoose');
const notesRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const testRouter = require('./controllers/tests');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

if (process.env.NODE_ENV === 'test') {
  console.log('Connecting to Mongo DB in test DB');
} else {
  logger.info('Connecting to MongoDB');
}

mongoose.connect(config.MONGO_URL)
  .then(() => {
    if (process.env.NODE_ENV === 'test') {
      console.log('connected to test MongoDB instance');
    } else {
      logger.info('connected to MongoDB');
    }
  })
  .catch((err) => {
    if (process.env.NODE_ENV === 'test') {
      console.log('error connecting to MongoDB test instance');
    } else { logger.error('error connecting to MongoDB:', err.message); }
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testRouter);
}
app.use('/api/blogs/', middleware.userExtractor, notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
