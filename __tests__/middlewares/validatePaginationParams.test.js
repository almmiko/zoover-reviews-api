const validatePaginationParams = require('../../middlewares/validatePaginationParams');
const ApiError = require('../../utils/apiError');

describe('validatePaginationParams', () => {
  test('should call next if valid params', () => {
    const req = {
      query: {
        page: 1,
        limit: 1,
      }
    };
    const next = jest.fn();

    validatePaginationParams(req, {}, next);
    expect(next.mock.calls.length).toBe(1);
  });

  test('should call next with error', () => {
    const req = {
      query: {
        page: 'test',
        limit: 'test',
      }
    };
    const next = jest.fn();

    validatePaginationParams(req, {}, next);
    expect(next.mock.calls[0][0]).toBeInstanceOf(ApiError);
    expect(next.mock.calls.length).toBe(1);
  });
});
