const _ = require('lodash');
const db = require('../data/reviews.json');
const Review = require('../models/review');
const logger = require('../utils/logger');
const CalculateStats = require('../utils/calculateStats');

const calculateStats = new CalculateStats();

class Reviews {
  constructor() {
    this.collection = [];
    this.loadCollection();
  }

  getSortedCollection(predicate, order, collection) {
    const sortBy = ['entryDate', 'travelDate'];
    let originalCollection = collection;

    if (!collection) {
      originalCollection = this.collection;
    }

    if (!sortBy.includes(predicate)) {
      return this.sortByDate('entryDate', order, originalCollection);
    }

    return this.sortByDate(predicate, order, originalCollection);
  }

  filterByTraveledWith(value) {
    const filter = value && value.toUpperCase();
    const filters = ['FAMILY', 'FRIENDS', 'OTHER', 'COUPLE', 'SINGLE'];

    if (!filters.includes(filter)) { return []; }

    return this.collection.filter((item) => item.traveledWith === filter);
  }

  sortByDate(dateKey, order, collection) {
    if (order === 'asc') {
      return [...collection].sort(
        (a, b) => new Date(a.data[dateKey]) - new Date(b.data[dateKey]),
      );
    }

    // by default return desc order.
    return [...collection].sort(
      (a, b) => new Date(b.data[dateKey]) - new Date(a.data[dateKey]),
    );
  }

  paginate(page, limit, collection) {
    const offset = (page - 1) * limit;
    const totalPages = Math.ceil(collection.length / limit);
    const paginatedCollection = _.drop(collection, offset).slice(0, limit);

    const meta = paginatedCollection.length ? {
      page, limit, totalPages, totalItems: collection.length,
    } : { hasNext: false };

    return {
      meta,
      paginatedCollection,
    };
  }

  getReviewsStats() {
    return calculateStats.getStats;
  }

  loadCollection() {
    logger.info('Loading reviews...');
    logger.info('Calculating stats...');

    this.collection = db.map((review) => {
      const rev = new Review(review);
      calculateStats.calculate(rev);
      return rev;
    });
  }
}

module.exports = {
  Reviews, // for testing
  reviewsInstance: new Reviews(), // singleton
};
