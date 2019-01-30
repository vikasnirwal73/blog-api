const express = require('express');
const router = express.Router();


const checkAuth = require('../middlewares/auth');
const postController = require('../controllers/post/post.controller');
const getPostsController = require('../controllers/post/getPosts.controller');
const getSinglePostController = require('../controllers/post/getSinglePost.controller');
const editPostController = require('../controllers/post/editPost.controller');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({
    storage
});

router.post('/', checkAuth, upload.single('image'), postController);
router.get('/', getPostsController);
router.get('/:id', getSinglePostController);
router.patch('/:id', checkAuth, upload.single('image'), editPostController);

module.exports = router;
