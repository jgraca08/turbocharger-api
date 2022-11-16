const express = require('express');
const {
    getTurbos,
    getTurbo,
    addTurbo,
    updateTurbo,
    deleteTurbo
  } = require('../controllers/turbos');

  const { protect, authorize } = require('../middleware/auth')

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getTurbos)
  .post(protect, authorize('publisher','admin'), addTurbo);

router
  .route('/:id')
  .get(getTurbo)
  .put(protect, authorize('publisher','admin'), updateTurbo)
  .delete(protect, authorize('publisher','admin'), deleteTurbo);

module.exports = router;