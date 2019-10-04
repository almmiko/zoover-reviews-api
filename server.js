const express = require('express');
const config = require('config');
const logger = require('./utils/logger');
const router = require('./routes/router');

async function createApp() {
  const app = express();

  app.disable('x-powered-by');

  app.use(router);

  // Send a consistent 404 response
  // Log thrown errors

  return app;
}

async function runServer() {
  const app = await createApp();
  logger.info(`Starting server on port ${config.PORT}`);
  app.listen(config.PORT);
  return app;
}

module.exports = {
  runServer,
};
