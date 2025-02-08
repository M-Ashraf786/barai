"use client";

import { membersStore } from "@/store/membersDataStore";
import { beFriends, rejectRequest } from "@/service/memebers.service";
import { useEffect, useState } from "react";
import Friends from "@/app/friends/Friends";
import FriendRequests from "@/app/friends/FriendRequests";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function Page() {
  const {
    fetchFriends,
    friends,
    fetchFriendRequests,
    friendRequests,
    deleteFriend,
  } = membersStore();

  useEffect(() => {
    const runFirst = async () => {
      await fetchFriendRequests();
      await fetchFriends();
    };
    runFirst();
  // }, []);
  // deployment change 4 from abov to down
}, [fetchFriendRequests,fetchFriends]);


  const becomeFriend = async (friendId) => {
    try {
      await beFriends(friendId);
      await fetchFriendRequests();
      await fetchFriends();
    } catch (error) {
      console.error(error);
    }
  };

  const declineFriend = async (friendToDeclineId) => {
    try {
      await rejectRequest(friendToDeclineId);

      await fetchFriendRequests();

      await fetchFriends();
    } catch (error) {
      console.error(error);
    }
  };

  const unFriends = async (memberId) => {
    try {
      await deleteFriend(memberId);
      await fetchFriendRequests();
      await fetchFriends();
    } catch (error) {
      console.error(error);
    }
  };
  const closeAllTabs = () => {
    setIsFriendRequestSelect(false);
    setIsMyFriendsSelect(false);
  };

  const [isFriendRequestSelect, setIsFriendRequestSelect] = useState(false);
  const [isMyFriendsSelect, setIsMyFriendsSelect] = useState(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-[120px] ml-[30px] pb-10 w-[95%]"
      >
        <div className=" ml-[10px]">
          <div className="flex  space-x-6 ">
            <h1 className="fonts-sans font-bold text-[x-large] mb-[30px] ">
              Friend requests
            </h1>
            <p
              className="mt-3"
              onClick={() =>
                setIsFriendRequestSelect(!isFriendRequestSelect === true)
              }
            >
              {isFriendRequestSelect ? (
                <img src="/eye-open.png" className="w-5 h-3 " alt="eyeopen" />
              ) : (
                <img src="/eye-close.png" className="w-5 h-4 " alt="eyeclose" />
              )}
            </p>
          </div>

          {isFriendRequestSelect && (
            <div>
              {friendRequests?.length > 0 ? (
                friendRequests?.map((request, index) => (
                  <FriendRequests
                    key={index}
                    request={request}
                    goFriend={() => becomeFriend(request?._id)}
                    decline={() => declineFriend(request?._id)}
                  />
                ))
              ) : (
                <p className="font-sans font-semibold text-gray-400 ml-4">
                  No friend request found
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-[30px] ml-[10px]">
          <div className="flex space-x-6 ">
            <h1 className="font-sans  font-bold text-[x-large] mb-[30px]">
              My friends
            </h1>
            <p
              className="mt-3"
              onClick={() => setIsMyFriendsSelect(!isMyFriendsSelect === true)}
            >
              {isMyFriendsSelect ? (
                <img src="/eye-open.png" className="w-5 h-3 " alt="eyeopen" />
              ) : (
                <img src="/eye-close.png" className="w-5 h-4 " alt="eyeclose" />
              )}
            </p>
          </div>
          {isMyFriendsSelect && (
            <div>
              {friends?.length > 0 ? (
                friends?.map((friend, index) => (
                  <Friends
                    key={index}
                    friend={friend}
                    unFriend={() => unFriends(friend?._id)}
                  />
                ))
              ) : (
                <p className="font-sans font-semibold text-gray-400 ml-4">
                  No friend found
                </p>
              )}
            </div>
          )}
        </div>
        {(isFriendRequestSelect || isMyFriendsSelect) && (
          <Button
            variant="outline"
            className="font-sans text-[pink] fixed top-[500px] right-5"
            onClick={closeAllTabs}
          >
            Close
          </Button>
        )}
      </motion.div>
    </>
  );
}

export default Page;
