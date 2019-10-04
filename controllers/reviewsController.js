const _ = require('lodash');
const reviews = require('../data/reviews');
const calculateStats = require('../utils/calculateStats');

class ReviewsController {
  static getPaginatedReviews(pageParam, limitParam) {
    // Convert query params to number
    const page = pageParam || 1;
    const limit = limitParam || 10; // note: set maximum limit value.

    const offset = (page - 1) * limit;
    const totalPages = Math.ceil(reviews.collection.length / limit);
    const collection = _.drop(reviews.collection, offset).slice(0, limit);

    const meta = collection.length ? { page, limit, totalPages } : { hasNext: false };

    return {
      collection,
      meta,
    };
  }

  static getReviewsStats() {
    return calculateStats.getStats;
  }
}

module.exports = ReviewsController;
