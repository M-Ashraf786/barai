"use client";
import { MembersView } from "@/app/members/membersView";
import { motion } from "framer-motion";

import { membersStore } from "@/store/membersDataStore";
import { useEffect } from "react";

function People() {
 
  const { members, fetchMembers, sendFriendRequest } = membersStore();

  useEffect(() => {
    fetchMembers();
  // }, []);
  // deployment change 5 from above to down
}, [fetchMembers]);

  const friendRequstToMember = async (memberId) => {
    try {
      await sendFriendRequest(memberId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-[120px] ml-[30px] pb-10"
      >
        <h1 className="fonts-sans font-bold text-[x-large] mb-[30px]">
          All members
        </h1>
        {members.map((member) => (
          <MembersView
            key={member?._id}
            member={member}
            friendRequest={() => friendRequstToMember(member?._id)}
          />
        ))}
      </motion.div>
    </>
  );
}

export default People;
