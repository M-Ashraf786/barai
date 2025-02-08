const {signUp, signIn, signOut ,getAllUsers ,getUserByUserId} = require('../controllers/userController')
const express = require('express');
const router = express.Router();
router.post('/signUp', signUp);
router.post('/signIn',signIn);
router.get('/signOut',signOut);
router.get('/getAllUsers',getAllUsers )
module.exports = router;