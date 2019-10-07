const ReviewsController = require('../../controllers/reviewsController');
const { reviewsInstance } = require('../../service/reviews');

describe('ReviewsController', () => {
  reviewsInstance.getReviewsStats = jest.fn();
  reviewsInstance.filterByTraveledWith = jest.fn();
  reviewsInstance.getSortedCollection = jest.fn();
  reviewsInstance.paginate = jest.fn(() => ({ meta: 'test', paginatedCollection: 'test'}));

  test('getReviewsStats should be called', () => {
    ReviewsController.getReviewsStats();
    expect(reviewsInstance.getReviewsStats).toBeCalled();
  });

  test('should call sort and paginate for collection', () => {
    ReviewsController.getReviews({});
    expect(reviewsInstance.getSortedCollection).toBeCalled();
    expect(reviewsInstance.paginate).toBeCalled();
    expect(reviewsInstance.filterByTraveledWith).not.toBeCalled();
  });

  test('should call filter, sort, paginate for collection', () => {
    ReviewsController.getReviews({ traveledWith: 'OTHER'});
    expect(reviewsInstance.getSortedCollection).toBeCalled();
    expect(reviewsInstance.paginate).toBeCalled();
    expect(reviewsInstance.filterByTraveledWith).toBeCalled();
  });
});
