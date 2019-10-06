const router = require('express').Router();
const validatePaginationParams = require('../middlewares/validatePaginationParams');
const ReviewsController = require('../controllers/reviewsController');

router.get('/v1/reviews', validatePaginationParams, (req, res) => {
  const reviews = ReviewsController.getReviews(req.query);

  res.json({
    resources: reviews.collection,
    meta: reviews.meta,
  });
});

router.get('/v1/reviews/stats', (req, res) => {
  res.json(ReviewsController.getReviewsStats());
});

module.exports = router;
