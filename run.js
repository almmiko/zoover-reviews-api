const logger = require('./utils/logger');

require('./server.js').runServer()
  .then(() => logger.info('Server is started'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
