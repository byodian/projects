const config = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
const blogListsRouter = require('./controllers/bolgLists');

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => {
    logger.info('connected mongoDB');
  })
  .catch(error => {
    logger.info(error.message);
  });

app.use(middleware.setResponseHeaders);
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogListsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
