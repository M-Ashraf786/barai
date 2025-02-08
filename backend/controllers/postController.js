const BaraiPost = require("../models/Post");
const response = require("../utils/responceHandler");
const { uploadFileToCloudinary } = require("../config/cloudinary");

// create post
const createPost = async (req, res) => {
  try {
    const userId = req?.user?.userId;
    
    const { content } = req?.body;
    const file = req?.file;
    let mediaUrl = null;
    let mediaType = null;

    if (file) {
      const uploadResult = await uploadFileToCloudinary(file);
      mediaUrl = uploadResult?.secure_url;
      mediaType = file.mimetype.startsWith("video") ? "video" : "image";
    }

    const newPost = await new BaraiPost({
      postOwner: userId,
      content,
      mediaUrl,
      mediaType,
    });

    await newPost.save();
    return response(res, 201, "post created successfully", newPost);
  } catch (error) {
    return response(res, 500, "Something went wrong", error.message);
  }
};

// get all posts
const getAllPosts = async (req, res) => {
  try {
    const allPosts = await BaraiPost.find()
      .sort({ createdAt: -1 })
      .populate("postOwner", "_id username clan profileImage")
      .populate("likingPersons", "_id username  profileImage")
      .populate("dislikingPersons", "_id username  profileImage")
      .populate({
        path: "comments.commenter",
        select: "_id username profileImage",
      });

    if (!allPosts) {
      return response(res, 402, "getting posts failed");
    }
    console.log("allPosts  : ",allPosts)
    return response(res, 200, "Got posts successfully", allPosts);
  } catch (error) {
    return response(res, 402, "getting posts failed");
  }
};

const likePost = async (req, res) => {
  try {
    const { postId } = req?.params;
    const userId = req?.user?.userId;

    const post = await BaraiPost.findById(postId);
    const dislikeExist = post.dislikingPersons.includes(userId);
    if (dislikeExist) {
      return response(res, 401, "Unchoose dislike first");
    }
    const exist = post.likingPersons.includes(userId);
    if (exist) {
      // down two codes are ok too.
      //    const updaatedArray =  post.likingPersons.filter(id=>id === userId)
      //    post.likingPersons = updatedArray;
      post.likingPersons = post.likingPersons.filter(
        (id) => id.toString() !== userId.toString()
      );
      post.likesCount -= 1;
    } else {
      post.likingPersons.push(userId);
      post.likesCount += 1;
    }

    await post.save();
    return response(res, 200, "Post liked successfully", post);
  } catch (error) {
    console.error("c.error error.message : ", error.message);
  }
};

const dislikePost = async (req, res) => {
  try {
    const { postId } = req?.params;
    const userId = req?.user?.userId;

    const post = await BaraiPost.findById(postId);
    const likeExists = post?.likingPersons?.includes(userId);
    if (likeExists) {
      return response(res, 401, "Unchoose like first");
    }
    const exist = post.dislikingPersons.includes(userId);
    if (exist) {
      // down two codes are ok too.
      //    const updaatedArray =  post.likingPersons.filter(id=>id === userId)
      //    post.likingPersons = updatedArray;
      post.dislikingPersons = post.dislikingPersons.filter(
        (id) => id.toString() !== userId.toString()
      );
      post.dislikesCount -= 1;
    } else {
      post.dislikingPersons.push(userId);
      post.dislikesCount += 1;
    }

    await post.save();
    return response(res, 200, "Post disliked successfully", post);
  } catch (error) {
    console.error("c.error error.message : ", error.message);
  }
};

// add comment
const addCommentToPost = async (req, res) => {
  try {
    const { postId } = req?.params;
    const userId = req?.user?.userId;
    const { text } = req?.body;

    const post = await BaraiPost.findById(postId);
    if (!post) {
      return response(res, 404, "post not found");
    }

    post.comments.push({ commenter: userId, comment: text });
    post.commentsCount += 1;

    //save the post with new comments
    await post.save();
    return response(res, 201, "comments added successfully", post);
  } catch (error) {
    return response(res, 500, "Internal server error", error.message);
  }
};

const getParticularPosts = async (req, res) => {
  try {
    const userId = req?.user?.userId;
    const { memberId } = req?.params;
    if (!userId) {
      return response(res, 401, "User not found");
    }
    const particularPosts1 = await BaraiPost.find()
      .sort({ createdAt: -1 })
      .populate("postOwner", "_id username  profileImage clan")
      .populate("likingPersons", "_id username  profileImage")
      .populate("dislikingPersons", "_id username  profileImage")
      .populate({
        path: "comments.commenter",
        select: "_id username profileImage",
      });

    const particularPosts = particularPosts1?.filter(
      (post) => post.postOwner.id.toString() === memberId.toString()
    );

    return response(res, 200, "Posts got successfully", particularPosts);
  } catch (error) {
    return response(res, 500, "Internal Server Error");
  }
};

module.exports = {
  createPost,
  getAllPosts,
  likePost,
  dislikePost,
  addCommentToPost,
  getParticularPosts,
};
