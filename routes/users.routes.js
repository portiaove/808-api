const express =require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const secure = require('../middlewares/secure.mid');

router.get('/likes', secure.isAuthenticated, user.getLikes);
router.get('/:id/beats', secure.isAuthenticated, user.getProfileBeats);
router.get('/:id', secure.isAuthenticated, user.getProfile);
router.put('/edit/:id', secure.isAuthenticated, user.editProfile);

module.exports = router;