const express =require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const secure = require('../middlewares/secure.mid');

router.get('/:id', user.getProfile);
router.put('/edit/:id', user.editProfile);

module.exports = router;