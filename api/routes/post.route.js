const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth');
const postContrller = require('../controllers/post/post.controller');

router.get('/', (req, res, next) => {
    res.status(200).json({
        posts: [{
            title: 'sample post.'
        }]
    })
})

router.post('/', checkAuth, postContrller);

module.exports = router;