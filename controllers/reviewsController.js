const { reviewsInstance } = require('../service/reviews');

class ReviewsController {
  static getReviews(query) {
    const { page = 1, limit = 20, sortBy, traveledWith, order } = query;
    // note: set maximum limit value.

    //filter
    //sort
    //paginate
    let collection;

    if (traveledWith) {
      collection = reviewsInstance.filterByTraveledWith(traveledWith);
    }

    collection = reviewsInstance.getSortedCollection(sortBy, order, collection);

    const { meta, paginatedCollection } = reviewsInstance.paginate(page, limit, collection);

    return {
      collection: paginatedCollection,
      meta,
    };
  }

  static getReviewsStats() {
    return reviewsInstance.getReviewsStats();
  }
}

module.exports = ReviewsController;
