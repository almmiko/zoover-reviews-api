const _ = require('lodash');

class CalculateStats {
  constructor() {
    this.rating = {
      general: 0,
      count: 0,
    };

    this.aspects = {};
    this.traveledWith = {};
  }

  calculateGeneralRatingSum(review) {
    const { ratings } = review;
    const { reviewWeight } = review;

    this.rating.general += reviewWeight * _.get(ratings, 'general.general') || 0;
    this.rating.count += 1; // probably we can use collection length, but for now lets save count.
  }

  getAverageGeneralRating() {
    return this.rating.general / this.rating.count;
  }

  calculateRatingAspectsSum(review) {
    const { reviewWeight } = review;
    const { ratings } = review;
    const aspects = _.get(ratings, 'aspects');

    _.forEach(aspects, (value, key) => {
      if (!this.aspects[key]) {
        this.aspects[key] = { sum: 0, count: 0 };
      }
      // todo: should we use reviewWeight for each aspect?
      this.aspects[key].sum += reviewWeight * value;
      this.aspects[key].count += 1;
    });
  }

  getAverageAspectsRating() {
    const average = {};

    _.forEach(this.aspects, (value, key) => {
      average[key] = Math.round((value.sum / value.count) * 100) / 100;
    });

    return average;
  }

  calculateTraveledWith(review) {
    const { traveledWith } = review;

    if (!this.traveledWith[traveledWith]) {
      this.traveledWith[traveledWith] = 0;
    }

    this.traveledWith[traveledWith] += 1;
  }

  getTraveledWith() {
    return this.traveledWith;
  }

  calculate(review) {
    this.calculateGeneralRatingSum(review);
    this.calculateRatingAspectsSum(review);
    this.calculateTraveledWith(review);
  }

  get getStats() {
    return {
      averageRating: this.getAverageGeneralRating(),
      averageRatingAspects: this.getAverageAspectsRating(),
      traveledWith: this.getTraveledWith(),
    };
  }
}

module.exports = CalculateStats;
