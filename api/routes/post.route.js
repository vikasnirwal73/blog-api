const express = require('express');
const router = express.Router();


const checkAuth = require('../middlewares/auth');
const postController = require('../controllers/post/post.controller');
const getPostsController = require('../controllers/post/getPosts.controller');
const getSinglePostController = require('../controllers/post/getSinglePost.controller');
const editPostController = require('../controllers/post/editPost');
const imageUpload = require('../middlewares/imageUpload');

router.post('/', checkAuth, imageUpload.single('image'), postController);
router.get('/', getPostsController);
router.get('/:id', getSinglePostController);
router.patch('/:id', checkAuth, imageUpload.single('image'), editPostController);

module.exports = router;
