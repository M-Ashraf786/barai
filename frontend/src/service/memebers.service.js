import axiosInstance from "./url.service";

export const getAllMembers = async () => {
  try {
    const members = await axiosInstance.get("/members/getMembers");
    return members.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const xsendFriendRequest = async (memberId) => {
  try {
    const responce = await axiosInstance.post(
      `/members/friend-request/${memberId}`
    );
    return responce.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const memberProfilesr = async(userId)=>{
//     const responce = await axiosInstance.get(`/members/memberData/:${userId}`)
//     return response.data?.data
// }

export const fetchFriendss = async (userId) => {
  try {
    const responce = await axiosInstance.get(`/members/friendsData/${userId}`);
    return responce.data?.data?.friends;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const xfetchFriendRequests = async () => {
  try {
    const responce = await axiosInstance.get("/members/friend-requests");
    return responce.data?.data?.followers;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const beFriends = async (friendId) => {
  try {
    await axiosInstance.post(`/members/beFriends/${friendId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// to reject request
export const rejectRequest = async (friendToDeclineId) => {
  try {
    await axiosInstance.post(`/members/rejectRequest/${friendToDeclineId}`);
    
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteFriendService = async (memberId) => {
  try {
    await axiosInstance.post(`/members/removeFriend/${memberId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchMemberProfile = async (userId) => {
  try {
    const responce = await axiosInstance.get(
      `/members/fetchMemberProfiles/${userId}`
    );
    return responce.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getParticularFriendsService = async (memberId) => {
  try {
    const responce = await axiosInstance.get(
      `/members/getParticularFriends/${memberId}`
    );
    return responce.data.data.friends;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// down 3 copy past
export const fetchUserProfile = async (userId) => {
  try {
    const response = await axiosInstance.get(`/members/profile/${userId}`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/members/profile/${userId}`,
      updateData
    );
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateLocalStorage = async(userId)=>{
  try {
    const response = await axiosInstance.get(`/members/localstorage/${userId}`)
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export const updateUserCoverPhoto = async (userId, updateData) => {
//   try {
//     const response = await axiosInstance.put(
//       `/members/profile/cover-photo/${userId}`,
//       updateData
//     );
//     return response?.data?.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
