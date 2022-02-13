const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/user');

const tokenExtractor = (req, _, next) => {
  const auth = req.get('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.substring(7);
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const { token } = req;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) return res.status(401).json({ error: 'invalid token' });
  req.user = await User.findById(decodedToken.id);
  return next();
};

const requestLogger = (req, _, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:', req.path);
  logger.info('Body:', req.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  if (err) return res.status(400).json({ error: err.message });
  return next(err);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
