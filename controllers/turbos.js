const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Turbo = require('../models/Turbo');

// @desc      Get turbos
// @route     GET /api/v1/turbos
// @route     GET /api/v1/brands/:brandId/turbos
// @access    Public
exports.getTurbos = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.brandId) {
    query = Turbo.find({ brand: req.params.brandId });
  } else {
    query = Turbo.find().populate({
        path: 'brand',
      select: 'name photo'
    });
  }

  const turbos = await query;

  res.status(200).json({
    success: true,
    count: turbos.length,
    data: turbos
  });
});