const config = require('./utils/config');
const express = require('express');
const app = express();
const logger = require('./utils/logger');
const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const path = require('path');
const staticPath = path.resolve(__dirname, 'build', 'index.html');

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
app.use(middleware.tokenExtractor);

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if(process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/temp');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.errorHandler);
app.use(middleware.frontendRequest(staticPath));

module.exports = app;
