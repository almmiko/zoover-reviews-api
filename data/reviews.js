const db = require('./reviews.json');
const Review = require('../models/review');
const logger = require('../utils/logger');
const calculateStats = require('../utils/calculateStats');

class Reviews {
  constructor() {
    this.collection = [];

    this.loadCollection();
  }

  get getCollection() {
    return this.collection;
  }

  set setCollection(items) {
    this.collection = items;
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
