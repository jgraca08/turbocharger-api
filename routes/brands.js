const express = require('express');
const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand
} = require('../controllers/brands');

// Include other resource routers
const turboRouter = require('./turbos');

const router = express.Router();

// Re-route into other resource routers
router.use('/:brandId/turbos', turboRouter);

router
  .route('/')
  .get(getBrands)
  .post(createBrand);

router
  .route('/:id')
  .get(getBrand)
  .put(updateBrand)
  .delete(deleteBrand);

module.exports = router;