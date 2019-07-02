const express =require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const secure = require('../middlewares/secure.mid');

router.get('/likes', user.getLikes);
router.get('/:id/beats', user.getProfileBeats);
router.get('/:id', user.getProfile);
router.put('/edit/:id', user.editProfile);

module.exports = router;