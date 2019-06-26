const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const secure = require('../middlewares/secure.mid');


router.get('/logout', auth.logout);
router.put('/profiles/:id', auth.editProfile);
router.get('/profile/:id', auth.getProfile);

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;