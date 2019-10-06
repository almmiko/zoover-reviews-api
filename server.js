const express = require('express');
const config = require('config');
const cors = require('cors');
const logger = require('./utils/logger');
const router = require('./routes/router');
const errorHandler = require('./middlewares/errorHandler');

async function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors()); // for prod use add whitelist
  app.use(router);

  app.use(errorHandler);

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
