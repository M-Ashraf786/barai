const response = require("../utils/responceHandler");
const BaraiUser = require("../models/User");
const { uploadFileToCloudinary } = require("../config/cloudinary");

// send friend request / get input yourself in someone's follower field
const sendFriendRequest = async (req, res) => {
  try {
    const myId = req?.user?.userId;
    const personToRequstId = req?.params?.memberId;

    if (!myId || !personToRequstId) {
      return response(res, 200, "Auth token may have expired");
    }
    if (myId === personToRequstId) {
      return response(res, 200, "You cant follow yourself");
    }

    const userToSendFriendRequest = await BaraiUser.findById(personToRequstId);
    const me = await BaraiUser.findById(myId);

    if (!userToSendFriendRequest || !me) {
      return response(res, 200, "User not found");
    }

    if (me.following.includes(personToRequstId)) {
      return response(res, 200, "Friend request already sent");
    }

    if (userToSendFriendRequest.following.includes(myId)) {
      return response(res, 200, "You cannot follow back");
    }

    if (me.friends.includes(personToRequstId)) {
      return response(res, 200, "Already a friend");
    }

    await userToSendFriendRequest?.followers?.push(myId);
    await me.following.push(personToRequstId);

    userToSendFriendRequest.followerCount += 1;
    me.followingCount += 1;

    await userToSendFriendRequest.save();
    await me.save();

    return response(
      res,
      200,
      "Request sent successfully",
      userToSendFriendRequest
    );
  } catch (error) {
    return response(res, 200, "Internal server error");
  }
};
// get all users/ members
const getAllMembers = async (req, res) => {
  try {
    const members = await BaraiUser.find();
    return response(res, 200, "Members got successfully", members);
  } catch (error) {
    console.log(error);
  }
};

const getAllFriends = async (req, res) => {
  try {
    const userId = req?.user?.userId;
    const myFriends = await BaraiUser.findById(userId)
      .select("friends")
      .populate("friends", "username profileImage friendsCount clan");

    return response(res, 200, "Friends got successfully", myFriends);
  } catch (error) {
    console.log(error);
  }
};

const beFriends = async (req, res) => {
  try {
    const myId = req?.user?.userId;
    const { friendId } = req?.params;

    const me = await BaraiUser.findById(myId);
    const he = await BaraiUser.findById(friendId);
    if (!me || !he) {
      return response(res, 401, "No User fount");
    }
    if(me === he){
      return response(res,401,"You can't be friends with yourself")
    }
    await me.friends.push(friendId);
    await he.friends.push(myId);
    me.friendsCount += 1;
    he.friendsCount += 1;
    me.followers = await me.followers.filter(
      (userMongoId1) => userMongoId1.toString() !== friendId.toString()
    );
    he.following = await he.following.filter(
      (userMongoId2) => userMongoId2.toString() !== myId.toString()
    );
    me.followerCount = Math.max(0, (me.followerCount -= 1));
    he.followingCount = Math.max(0, (he.followingCount -= 1));
    await me.save();
    await he.save();
    return response(res, 200, "You become friend successfully", me);
  } catch (error) {
    return response(res, 401, " becoming friend failed : ");
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const myId = req?.user?.userId;
    const requestsToMe = await BaraiUser.findById(myId)
      .select("followers")
      .populate("followers", "username friendsCount profileImage clan");

    return response(res, 200, "Request got successfully", requestsToMe);
  } catch (error) {
    console.log(" Internal Server Error :   ", error.message);
  }
};

// Decline user Request
const rejectUserRequest = async (req, res) => {
  try {
    const myId = req?.user?.userId;
    const { friendToDeclineId } = req.params;

    if (!myId || !friendToDeclineId) {
      return response(res, 401, "Token may have invalid");
    }

    const myDocument = await BaraiUser.findById(myId);
    const hisDocument = await BaraiUser.findById(friendToDeclineId);

    if (!myDocument || !hisDocument) {
      return response(res, 401, "User not found");
    }

    myDocument.followers = await myDocument.followers.filter(
      (follower1) => follower1.toString() !== friendToDeclineId.toString()
    );
    hisDocument.following = await hisDocument.following.filter(
      (follower2) => follower2.toString() !== myId.toString()
    );
    myDocument.followerCount = Math.max(0, (myDocument.followerCount -= 1));
    hisDocument.followingCount = Math.max(0, (hisDocument.followingCount -= 1));
    await myDocument.save();
    await hisDocument.save();
    return response(res, 200, "Successfully rejected friend request");
  } catch (error) {
    return response(res, 401, "Internal server error");
  }
};

const excludeFriend = async (req, res) => {
  try {
    const myId = req?.user?.userId;
    const { memberId } = req.params;

    const myDocument = await BaraiUser.findById(myId);
    const hisDocument = await BaraiUser.findById(memberId);
    if (!myDocument || !hisDocument) {
      return response(res, 401, "User not found");
    }

    myDocument.friends = await myDocument.friends.filter(
      (friend) => friend.toString() !== memberId.toString()
    );
    hisDocument.friends = await hisDocument.friends.filter(
      (friend) => friend.toString() !== myId.toString()
    );
    myDocument.friendsCount = Math.max(0, (myDocument.friendsCount -= 1));
    hisDocument.friendsCount = Math.max(0, (hisDocument.friendsCount -= 1));
    await myDocument.save();
    await hisDocument.save();
    return response(res, 200, "Unfriend successfully");
  } catch (error) {
    return response(res, 500, "Internal server error");
  }
};

//check if user is authenticated or not
const checkUserAuth = async (req, res) => {
  try {
    const userId = req?.user?.userId;
    if (!userId)
      return response(
        res,
        404,
        "unauthenticated ! please login before access the data"
      );

    //fetch the user details and excude sensitive information
    //    const user = await BaraiUser.findById(userId).select('-password _id');
    const user = await BaraiUser.findById(userId)
      .select("-password")
      .select("_id");
    if (!user) return response(res, 403, "User not found");

    return response(res, 201, "user retrived and allow to use facebook", user);
  } catch (error) {
    return response(res, 500, "Internal server error", error.message);
  }
};

const fetchMemberProfileController = async (req, res) => {
  try {
    const { userId } = req?.params;

    const member1 = await BaraiUser.findById(userId).populate(
      "friends",
      "_id username profileImage friendsCount"
    );

    return response(res, 200, "Member Bio got successfully", member1);
  } catch (error) {
    return response(res, 500, "Internal server error");
  }
};

const getParticularFriendsController = async (req, res) => {
  try {
    const userId = req?.user?.userId;
    if (!userId) {
      return response(res, 500, "Token may have expired");
    }
    const { memberId } = req.params;
    const owner = userId === memberId;
    const forParticularFriends = await BaraiUser.findById(memberId).populate(
      "friends",
      "_id username profileImage friendsCount clan"
    );

    return response(res, 200, "Friends got successfully", forParticularFriends);
  } catch (error) {
    return response(res, 500, "Internal server error");
  }
};

//

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req?.params;
    const loggedInUserId = req?.user?.userId;

    //fetch the user details and excude sensitive information
    // const userProfile = await BaraiUser.findById(userId).select('-password').populate('bio').exec();
    const userProfile = await BaraiUser.findById(userId).select("-password");

    if (!userProfile) return response(res, 403, "User not found");

    const isOwner = loggedInUserId === userId;

    return response(res, 201, "user profile get successfully", {
      profile: userProfile,
      isOwner,
    });
  } catch (error) {
    return response(res, 500, "Internal server error", error.message);
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req?.params;
    const {
      username,
      ethnicGroup,
      community,
      clan,
      subgroup,
      countryoFOrigin,
      city,
      liveInCountry,
    } = req.body;
    const file = req.file;
    let profileImage = null;

    if (file) {
      const uploadResult = await uploadFileToCloudinary(file);
      profileImage = uploadResult.secure_url;
    }

    //update user profile with cover photo
    await BaraiUser.updateOne(
      { _id: userId },
      {
        $set: {
          username,
          ethnicGroup,
          community,
          clan,
          subgroup,
          countryoFOrigin,
          city,
          liveInCountry,
          ...(profileImage && { profileImage }),
        },
      }
    );

    const updateUser = await BaraiUser.findById(userId);

    if (!updateUser) {
      return response(res, 404, "user not found with this id");
    }

    return response(res, 200, "user profile update successfully", updateUser);
  } catch (error) {
    return response(res, 500, "Internal server error", error.message);
  }
};

const updateLocalStorage = async(req,res)=>{
  try {
    const userId = req?.user?.userId
    if(!userId){
      return response(res,401,"User not fount")
    }
    const user = await BaraiUser.findById(userId)
    .select("-password")
    
    return response(res,200,"Successfully got updated local storage", user)
  } catch (error) {
    console.error(error)
  }
 
}

module.exports = {
  getAllMembers,
  getAllFriends,
  sendFriendRequest,
  beFriends,
  getFriendRequests,
  rejectUserRequest,
  excludeFriend,
  checkUserAuth,
  fetchMemberProfileController,
  getParticularFriendsController,
  getUserProfile,
  updateUserProfile,
  updateLocalStorage,
};
