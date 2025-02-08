const authMiddleware = require('../authMiddleware/authMiddleware')
const {getAllMembers ,getAllFriends,getFriendRequests,sendFriendRequest, beFriends, rejectUserRequest , excludeFriend,checkUserAuth ,fetchMemberProfileController, getParticularFriendsController, getUserProfile,updateUserProfile,updateLocalStorage} = require('../controllers/userDataController')
// const {updateCoverPhoto} = require('../controllers/createOrUpdateController')
const { multerMiddleware } = require('../config/cloudinary');
const express = require('express')
const router = express()

router.get('/getMembers',authMiddleware, getAllMembers)
router.get('/friend-requests',authMiddleware,getFriendRequests)

router.get('/friendsData/:userId', authMiddleware, getAllFriends)
router.post('/friend-request/:memberId', authMiddleware,sendFriendRequest)
router.post('/beFriends/:friendId', authMiddleware, beFriends)
router.post('/rejectRequest/:friendToDeclineId', authMiddleware, rejectUserRequest)
router.post('/removeFriend/:memberId' , authMiddleware, excludeFriend)
router.get('/check-auth',authMiddleware,checkUserAuth)
router.get('/fetchMemberProfiles/:userId', authMiddleware,fetchMemberProfileController )
router.get('/getParticularFriends/:memberId', authMiddleware, getParticularFriendsController)
// bio down
router.get('/profile/:userId',authMiddleware,getUserProfile)
router.get('/localstorage/:userId',authMiddleware,updateLocalStorage)
router.put('/profile/:userId',authMiddleware, multerMiddleware.single('profilePicture'),updateUserProfile)
// update user cover
// router.put('/profile/cover-photo/:userId',authMiddleware,multerMiddleware.single('coverPhoto') ,updateCoverPhoto)
module.exports = router;