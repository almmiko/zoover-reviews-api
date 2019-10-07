const { isNaN } = require('lodash');
const ApiError = require('../utils/apiError');

module.exports = function validatePaginationParams(req, res, next) {
  const { page = 1, limit = 20 } = req.query;

  if (isNaN(+page) || isNaN(+limit)) {
    return next(new ApiError('Invalid values for page or limit. Expected integer', 400));
  }

  return next();
};
