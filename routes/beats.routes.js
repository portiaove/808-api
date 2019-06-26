const express = require('express');
const router = express.Router();
const beat = require('../controllers/beats.controller');

router.post('/', beat.create);

module.exports = router;