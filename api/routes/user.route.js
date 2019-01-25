const express = require('express');
const router = express.Router();

const authCheck = require('../middlewares/auth');
const getUserController = require('../controllers/user/getUsers');
const signupController = require('../controllers/user/signup');
const loginController = require('../controllers/user/login');

router.get('/', authCheck, getUserController)
router.post('/signup', signupController)
router.post('/login', loginController)


module.exports = router;