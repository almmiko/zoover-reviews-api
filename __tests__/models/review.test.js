const Review = require('../../models/review');

describe('Review', () => {
  test('should calculate review weight value', () => {
    const review1 = new Review({
      entryDate: 1250953369000, // 2009
    });

    const review2 = new Review({
      entryDate: 1550953369000, // 2019
    });

    expect(review1.reviewWeight).toEqual(0.5);
    expect(review2.reviewWeight).toEqual(1);
  });
});
