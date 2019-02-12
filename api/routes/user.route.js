const express = require('express');
const router = express.Router();
const multer = require('multer');

const authCheck = require('../middlewares/auth');
const getUserController = require('../controllers/user/getUsers');
const signupController = require('../controllers/user/signup');
const loginController = require('../controllers/user/login');
const editController = require('../controllers/user/editUser');
const imageUpload = require('../middlewares/imageUpload');

router.get('/', authCheck, getUserController)
router.post('/signup', signupController)
router.post('/login', loginController)
router.patch('/:id', authCheck, imageUpload.single('image'), editController)


module.exports = router;