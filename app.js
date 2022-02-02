const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const notesRouter = require('./controllers/blogs');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

logger.info(`Connecting to MongoDB`);
mongoose.connect(config.MONGO_URL)
  .then(() => {
    logger.info(`connected to MongoDB`)
  })
  .catch(err => {
    logger.error('error connecting to MongoDB:', err.message)
  })

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger)

app.use('/api/blogs/', notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;