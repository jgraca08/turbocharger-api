const express = require('express');
const {
    getTurbos,
    getTurbo,
    addTurbo,
    updateTurbo,
    deleteTurbo
  } = require('../controllers/turbos');

  const { protect, authorize } = require('../middleware/auth')

  // Include other resource routers
  const commentRouter = require('./comments');

  const router = express.Router({ mergeParams: true });

  // Re-route into other resource routers
  router.use('/:turboId/comments', commentRouter);

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