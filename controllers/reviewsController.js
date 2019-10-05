const _ = require('lodash');
const reviews = require('../service/reviews');
const calculateStats = require('../utils/calculateStats');

class ReviewsController {
  static getReviews(query) {
    const { page = 1, limit = 10, sortBy, traveledWith, order } = query;
    // note: set maximum limit value.
    //todo: handle page, limit NaN case.
    //todo handle query params pollutions

    let collection = reviews.getSortedCollection(sortBy, order);

    if (traveledWith) {
      collection = reviews.filterByTraveledWith(traveledWith, collection);
    }

    const offset = (page - 1) * limit;
    const totalPages = Math.ceil(collection.length / limit);
    const paginatedCollection = _.drop(collection, offset).slice(0, limit);

    const meta = paginatedCollection.length ? { page, limit, totalPages, totalItems: collection.length } : { hasNext: false };

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
