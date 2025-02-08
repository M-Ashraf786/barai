import axiosInstance from "./url.service";

export const getAllPosts = async () => {
  try {
    const result = await axiosInstance.get("postCollection/getAllPosts");
    return result?.data?.data;
  } catch (error) {
    console.log("error : ", error);
  }
};

export const likePost = async (postId) => {
  try {
    const result = await axiosInstance.post(
      `postCollection/likePost/${postId}`
    );
    return result.data.data;
  } catch (error) {
    console.log("error : ", error);
  }
};

export const dislikePost = async (postId) => {
  try {
    const result = await axiosInstance.post(
      `postCollection/dislikePost/${postId}`
    );
    return result.data.data;
  } catch (error) {
    console.log("error : ", error);
  }
};

export const commentsPost = async (postId, comment) => {
  try {
    const result = await axiosInstance.post(
      `/postCollection/comments/${postId}`,
      comment
    );
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//create method for posts
export const createPost = async (postData) => {
  try {
    const result = await axiosInstance.post("/postCollection/createPost",postData);
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getParticularPosts = async (memberId) => {
  try {
    const responce = await axiosInstance.get(
      `/postCollection/getParticularPostsServ/${memberId}`
    );
    return responce?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
