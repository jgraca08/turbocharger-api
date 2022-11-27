const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Rating = require('../models/Rating');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }

  // else
  if(req.cookies.token) {
    token = req.cookies.token
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorResponse(
            `User role ${req.user.role} is not authorized to access this route`,
            403
          )
        );
      }
      next();
    };
  };

  
// Grant access to Users edit and delete his own comments
  exports.authorizeComment = asyncHandler(async (req, res, next) => {
        const comment = await Comment.findById(req.params.id)
        if(comment.user == req.user.id)
           next();
       else 
        return next(new ErrorResponse(`User with id ${req.user.id} is not authorized to access this route`, 403))
  });


  // Grant access to Users edit and delete his own ratings
  exports.authorizeRating = asyncHandler(async (req, res, next) => {
        const rating = await Rating.findById(req.params.id)
        if(rating.user == req.user.id)
           next();
       else 
        return next(new ErrorResponse(`User with id ${req.user.id} is not authorized to access this route`, 403))
  });
