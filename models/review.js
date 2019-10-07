const _ = require('lodash');
const moment = require('moment');

class Review {
  constructor(data) {
    this.data = data;
  }

  get reviewWeight() {
    // when the review is older
    // than 5 years its weight value defaults to 0.5.
    // Otherwise it equals: 1 - (current_year - year_of_review)*0.1
    const OLDER_THAN_YEARS = 5;
    const reviewYear = moment(this.entryDate).year();
    const currentYear = moment().year();

    if (currentYear - OLDER_THAN_YEARS > reviewYear) {
      return 0.5;
    }

    return 1 - (currentYear - reviewYear) * 0.1;
  }

  get traveledWith() {
    return _.get(this, 'data.traveledWith');
  }

  get entryDate() {
    return _.get(this, 'data.entryDate');
  }

  get ratings() {
    return _.get(this, 'data.ratings');
  }

  toString() {
    return this.data;
  }

  toJSON() {
    return this.data;
  }
}

module.exports = Review;
