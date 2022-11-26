const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Comment = require('../models/Comment');
const Turbo = require('../models/Turbo');

// @desc      Get comments
// @route     GET /api/v1/comments
// @route     GET /api/v1/turbos/:turboId/comments
// @access    Public
exports.getComments = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.turboId) {
    query = Comment.find({ turbo: req.params.turboId });
  } else {
    //Populate
    query = Comment.find().populate({
        path: 'turbo',
      select: 'title photo'
    });
  }

  const comments = await query;

  res.status(200).json({
    success: true,
    count: comments.length,
    data: comments
  });


});

// @desc      Get single comment
// @route     GET /api/v1/comments/:id
// @access    Public
exports.getComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id).populate({
    path: 'turbo',
    select: 'title photo'
  });

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: comment
  });
});

// @desc      Add comment
// @route     POST /api/v1/comments/:turboId/comments
// @access    Private
exports.addComment = asyncHandler(async (req, res, next) => {

  const turbo = await Turbo.findById(req.body.turbo);

  if (!turbo) {
    return next(
      new ErrorResponse(`No turbo with the id of ${req.params.turboId}`),
      404
    );
  }

  const comment = await Comment.create(req.body);

  res.status(200).json({
    success: true,
    data: comment
  });
});

// @desc      Update comment
// @route     PUT /api/v1/comments/:id
// @access    Private
exports.updateComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`),
      404
    );
  }

  comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: comment
  });
});

// @desc      Delete comment
// @route     DELETE /api/v1/comments/:id
// @access    Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`),
      404
    );
  }

  await comment.remove();

  res.status(200).json({
    success: true,
    data: {}
  });

});