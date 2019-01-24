const express = require('express');
const User = require('../models/user.model');
const errorHandler = require('../middlewares/errorhandler');
const router = express.Router();
const bcrypt = require('bcryptjs');

const authCheck = require('../middlewares/auth');
const getUserController = require('../controllers/user/getUsers');
const signupController = require('../controllers/user/signup');
const loginController = require('../controllers/user/login');

router.get('/', authCheck, getUserController)
router.post('/signup', signupController)
router.post('/login', loginController)


module.exports = router;