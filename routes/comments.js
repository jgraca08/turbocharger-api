const express = require('express');
const {
    getComments,
    getComment,
    addComment,
    updateComment,
    deleteComment
  } = require('../controllers/comments');

  const { protect, authorize } = require('../middleware/auth')

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getComments)
  .post(protect, authorize('publisher','user','admin'), addComment);

router
  .route('/:id')
  .get(getComment)
  .put(protect, authorize('publisher','user','admin'), updateComment)
  .delete(protect, authorize('publisher','user','admin'), deleteComment);

module.exports = router;