const express = require('express');
const router = express.Router();
const {createPost, likePost , dislikePost , addCommentToPost,getParticularPosts} = require('../controllers/postController');
const authMiddleware = require('../authMiddleware/authMiddleware');
const { multerMiddleware } = require('../config/cloudinary');
const {getAllPosts} = require('../controllers/postController')
// create post route
router.post('/createPost',authMiddleware ,multerMiddleware.single('media'),createPost);
// get all posts route
  router.get('/getAllPosts',authMiddleware, getAllPosts)
 // like post route
router.post('/likePost/:postId',authMiddleware,likePost)
router.post('/dislikePost/:postId',authMiddleware,dislikePost)
 router.post('/comments/:postId',authMiddleware,addCommentToPost)
 router.get('/getParticularPostsServ/:memberId', authMiddleware, getParticularPosts)
 module.exports = router;
   