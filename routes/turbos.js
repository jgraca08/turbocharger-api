const express = require('express');
const {
    getTurbos,
    getTurbo,
    addTurbo,
    updateTurbo,
    deleteTurbo
  } = require('../controllers/turbos');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getTurbos)
  .post(addTurbo);

router
  .route('/:id')
  .get(getTurbo)
  .put(updateTurbo)
  .delete(deleteTurbo);

module.exports = router;