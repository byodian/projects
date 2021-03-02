const config = require('./utils/config');
const express = require('express');
const app = express();
const logger = require('./utils/logger');
const notesRouter = require('./controllers/notes');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

logger.info('connecting to', config.MONGODB_URL);

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }).then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connectiong to MongoDB:', error.message);
  });

app.use(express.static('build'));
app.use(middleware.setHeaders);
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;