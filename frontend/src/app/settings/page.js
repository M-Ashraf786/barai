'use client'
import userStore from "@/store/userStore";
import {fetchUserProfile} from '@/service/memebers.service'
import MySettings from "./MySettings";
import { useState,useEffect } from "react";
import { postStore } from "@/store/postStore";
import { membersStore } from '@/store/membersDataStore';

function Page() {
    const {user,setUser} = userStore();
     const {fetchParticularPosts,allParticularPosts} = postStore();
   const {particularFriends,getParticularFriends} = membersStore();
      const [profileData, setProfileData] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    
 
  const userId= user?._id
 
    const fetchProfile = async()=>{
      
 try {
     const result = await fetchUserProfile(userId);
      setProfileData(result?.profile)
      setIsOwner(result?.isOwner);
      await fetchParticularPosts(userId)  
      await getParticularFriends(userId)
     
    } catch (error) {
      console.error(error);
    }
    
    }
      useEffect(()=>{
      fetchProfile();
        
    // },[fetchProfile])
    // deployment change 6 from above to down
  },[fetchProfile])
   
   
  return (
    <div className="mt-[114px]">
   
    <MySettings
      userId={userId}
      profileData={profileData}
      setProfileData={setProfileData}
      fetchProfile={fetchProfile}
      isOwner={isOwner}
      allParticularPosts={allParticularPosts}
      particularFriends={particularFriends}
      fetchParticularPosts={fetchParticularPosts}
     /> 
   
    
   </div>
      )
}

export default Page

