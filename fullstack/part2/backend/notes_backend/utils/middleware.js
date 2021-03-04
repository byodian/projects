const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method);
  logger.info('Path: ', request.path);
  logger.info('Body', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const setHeaders = (request, response, next) => {
  response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.set('Access-Control-Allow-Methods', 'PUT,DELETE,GET,POST');
  response.set('Access-Control-Allow-Headers', 'Content-Type,API-KEY');
  response.set('Access-Control-Allow-Credentials', 'true');
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.info(error.message);
  logger.info(error.name);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  setHeaders,
  errorHandler,
  unknownEndpoint
};