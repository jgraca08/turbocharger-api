const express = require('express');
const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand
} = require('../controllers/brands');

const { protect, authorize } = require('../middleware/auth');

// Include other resource routers
const turboRouter = require('./turbos');

const router = express.Router();

// Re-route into other resource routers
router.use('/:brandId/turbos', turboRouter);

router
  .route('/')
  .get(getBrands)
  .post(protect, authorize('publisher','admin'), createBrand);

router
  .route('/:id')
  .get(getBrand)
  .put(protect, authorize('publisher','admin'), updateBrand)
  .delete(protect, authorize('publisher','admin'), deleteBrand);

module.exports = router;