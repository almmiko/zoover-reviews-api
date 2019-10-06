const reviews = require('../service/reviews');
const calculateStats = require('../utils/calculateStats');

class ReviewsController {
  static getReviews(query) {
    const { page = 1, limit = 20, sortBy, traveledWith, order } = query;
    // note: set maximum limit value.

    //filter
    //sort
    //paginate
    let collection;

    if (traveledWith) {
      collection = reviews.filterByTraveledWith(traveledWith);
    }

    collection = reviews.getSortedCollection(sortBy, order, collection);

    const { meta, paginatedCollection } = reviews.paginate(page, limit, collection);

    return {
      collection: paginatedCollection,
      meta,
    };
  }

  static getReviewsStats() {
    return calculateStats.getStats;
  }
}

module.exports = ReviewsController;
