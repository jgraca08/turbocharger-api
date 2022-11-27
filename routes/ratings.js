const express = require('express');
const {
    getRatings,
    getRating,
    addRating,
    updateRating,
    deleteRating
  } = require('../controllers/ratings');

  const { protect, authorize, authorizeRating } = require('../middleware/auth')

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getRatings)
  .post(protect, authorize('publisher','user','admin'), addRating);

router
  .route('/:id')
  .get(getRating)
  .put(protect, authorize('publisher','user','admin'),authorizeRating, updateRating)
  .delete(protect, authorize('publisher','user','admin'),authorizeRating, deleteRating);

module.exports = router;