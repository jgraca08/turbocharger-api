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
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

   // Create query string
   let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  query = Turbo.find(JSON.parse(queryStr)).populate('comments','ratings');

   // Select Fields
   if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

   // Pagination
   const page = parseInt(req.query.page, 10) || 1;
   const limit = parseInt(req.query.limit, 10) || 10;
   const startIndex = (page - 1) * limit;
   const endIndex = page * limit;
   const total = await Turbo.countDocuments();
 
   query = query.skip(startIndex).limit(limit);

  const turbos = await query;

   // Pagination result
   const pagination = {};

   if (endIndex < total) {
     pagination.next = {
       page: page + 1,
       limit
     };
   }

   if (startIndex > 0) {
     pagination.prev = {
       page: page - 1,
       limit
     };
   }

  res.status(200).json({
    success: true,
    count: turbos.length,
    pagination,
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