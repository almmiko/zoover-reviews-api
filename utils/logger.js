const winston = require('winston');

const { combine, errors, json } = winston.format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    errors({ stack: true }),
    json(),
  ),
  defaultMeta: { service: 'reviews-api' },
  transports: [new winston.transports.Console({ format: winston.format.json() })],
});

module.exports = logger;
