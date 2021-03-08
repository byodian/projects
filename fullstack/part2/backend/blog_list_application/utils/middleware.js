const logger = require('./logger');

const setResponseHeaders = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Access-Control-Allow-Methods', 'PUT,DELETE,GET,POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type,API-KEY');
  res.set('Access-Control-Allow-Credentials', 'true');

  next();
};

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:', req.path);
  logger.info('Body: ', req.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  logger.info(error.name);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

module.exports = {
  setResponseHeaders,
  requestLogger,
  unknownEndpoint,
  errorHandler
};