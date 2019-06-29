const express = require('express');
const router = express.Router();
const beat = require('../controllers/beats.controller');
const secure = require('../middlewares/secure.mid');


router.get('/', beat.list);
router.get('/:id', beat.detail);

router.post('/like/:id', beat.like);
router.delete('/:id', beat.delete);
router.post('/', beat.create);

module.exports = router;