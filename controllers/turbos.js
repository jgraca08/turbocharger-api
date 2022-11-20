const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Turbo = require('../models/Turbo');
const Brand = require('../models/Brand');

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

  //Advanced filtering and select and sort
  let queryStr = JSON.stringify(req.query);

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  query = Turbo.find(JSON.parse(queryStr));

  
  const turbos = await query;


  res.status(200).json({
    success: true,
    count: turbos.length,
    data: turbos
  });

});

// @desc      Get single turbo
// @route     GET /api/v1/turbos/:id
// @access    Public
exports.getTurbo = asyncHandler(async (req, res, next) => {
  const turbo = await Turbo.findById(req.params.id).populate({
    path: 'brand',
    select: 'name photo'
  });

  if (!turbo) {
    return next(
      new ErrorResponse(`No turbo with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: turbo
  });
});

// @desc      Add turbo
// @route     POST /api/v1/turbos/:brandId/turbos
// @access    Private
exports.addTurbo = asyncHandler(async (req, res, next) => {
  // req.body.brand = req.params.brandId;
  // console.log(req.params.brandId);

  const brand = await Brand.findById(req.body.brand);

  if (!brand) {
    return next(
      new ErrorResponse(`No brand with the id of ${req.params.brandId}`),
      404
    );
  }

  const turbo = await Turbo.create(req.body);

  res.status(200).json({
    success: true,
    data: turbo
  });
});

// @desc      Update turbo
// @route     PUT /api/v1/turbos/:id
// @access    Private
exports.updateTurbo = asyncHandler(async (req, res, next) => {
  let turbo = await Turbo.findById(req.params.id);

  if (!turbo) {
    return next(
      new ErrorResponse(`No turbo with the id of ${req.params.id}`),
      404
    );
  }

  turbo = await Turbo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: turbo
  });
});

// @desc      Delete turbo
// @route     DELETE /api/v1/turbos/:id
// @access    Private
exports.deleteTurbo = asyncHandler(async (req, res, next) => {
  const turbo = await Turbo.findById(req.params.id);

  if (!turbo) {
    return next(
      new ErrorResponse(`No turbo with the id of ${req.params.id}`),
      404
    );
  }

  await turbo.remove();

  res.status(200).json({
    success: true,
    data: {}
  });

});