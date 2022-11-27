const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Rating = require('../models/Rating');
const Turbo = require('../models/Turbo');

// @desc      Get ratings
// @route     GET /api/v1/ratings
// @route     GET /api/v1/turbos/:turboId/ratings
// @access    Public
exports.getRatings = asyncHandler(async (req, res, next) => {
    let query;
  
    if (req.params.turboId) {
      query = Rating.find({ turbo: req.params.turboId });
    } else {
      //Populate
      query = Rating.find().populate({
          path: 'turbo',
        select: 'title photo'
      });
    }
  
    const ratings = await query;
  
    res.status(200).json({
      success: true,
      count: ratings.length,
      data: ratings
    });
  
  });

// @desc      Get single rating
// @route     GET /api/v1/ratings/:id
// @access    Public
exports.getRating = asyncHandler(async (req, res, next) => {
    const rating = await Rating.findById(req.params.id).populate({
      path: 'turbo',
      select: 'title photo'
    });
  
    if (!rating) {
      return next(
        new ErrorResponse(`No rating with the id of ${req.params.id}`),
        404
      );
    }
  
    res.status(200).json({
      success: true,
      data: rating
    });
  });

// @desc      Add rating
// @route     POST /api/v1/ratings/:turboId/ratings
// @access    Private
exports.addRating = asyncHandler(async (req, res, next) => {

    const turbo = await Turbo.findById(req.body.turbo);
  
    if (!turbo) {
      return next(
        new ErrorResponse(`No rating with the id of ${req.params.turboId}`),
        404
      );
    }
  
    const rating = await Rating.create(req.body);
  
    res.status(200).json({
      success: true,
      data: rating
    });
  });

  // @desc    Update rating
// @route     PUT /api/v1/ratings/:id
// @access    Private
exports.updateRating = asyncHandler(async (req, res, next) => {
    let rating = await Rating.findById(req.params.id);
  
    if (!rating) {
      return next(
        new ErrorResponse(`No rating with the id of ${req.params.id}`),
        404
      );
    }
  
    rating = await Rating.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      success: true,
      data: rating
    });
  });

// @desc      Delete rating
// @route     DELETE /api/v1/ratings/:id
// @access    Private
exports.deleteRating = asyncHandler(async (req, res, next) => {
    const rating = await Rating.findById(req.params.id);
    if (!rating) {
      return next(
        new ErrorResponse(`No rating with the id of ${req.params.id}`),
        404
      );
    }
  
    await rating.remove();
  
    res.status(200).json({
      success: true,
      data: {}
    });
  
  });