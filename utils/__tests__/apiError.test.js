const ApiError = require('../apiError');

describe('apiError', () => {
  test('should return message and status code', () => {
    const apiError = new ApiError('test error', 500);

    expect(apiError.message).toEqual('test error');
    expect(apiError.statusCode).toEqual(500);
  });
});
