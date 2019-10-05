const db = require('../data/reviews.json');
const Review = require('../models/review');
const logger = require('../utils/logger');
const calculateStats = require('../utils/calculateStats');

class Reviews {
  constructor() {
    this.collection = [];

    this.loadCollection();
  }

  getSortedCollection(predicate, order) {
    const sortBy = ['entryDate', 'travelDate'];

    if (!sortBy.includes(predicate)) {
      return this.sortByDate('entryDate', order);
    }

    return this.sortByDate(predicate, order);
  }

  filterByTraveledWith(value, collection) {
    const filter = value && value.toUpperCase();
    const filters = ['FAMILY', 'FRIENDS', 'OTHER', 'COUPLE', 'SINGLE'];

    if (!filters.includes(filter)) { return [] }

    return collection.filter(item => item.traveledWith === filter);
  }

  sortByDate(dateKey, order) {
    if (order === 'asc') {
      return [...this.collection].sort(
        (a, b) => new Date(a.data[dateKey]) - new Date(b.data[dateKey])
      );
    }

    // by default return desc order.
    return [...this.collection].sort(
      (a, b) => new Date(b.data[dateKey]) - new Date(a.data[dateKey])
    );
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

module.exports = new Reviews();
