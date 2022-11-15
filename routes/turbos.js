const express = require('express');
const { getTurbos } = require('../controllers/turbos');

const router = express.Router({ mergeParams: true });

router.route('/').get(getTurbos);

module.exports = router;