const express = require('express');
const router = express.Router();
const beat = require('../controllers/beats.controller');
const secure = require('../middlewares/secure.mid');


router.get('/', secure.isAuthenticated, beat.list);
router.get('/:id', secure.isAuthenticated, beat.detail);

router.post('/:id/like', secure.isAuthenticated, beat.like);
router.delete('/:id/like', secure.isAuthenticated, beat.notLike);
router.delete('/:id', secure.isAuthenticated, beat.delete);
router.post('/', secure.isAuthenticated, beat.create);

module.exports = router;