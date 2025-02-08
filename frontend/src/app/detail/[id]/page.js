// "use client";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { postStore } from "@/store/postStore";
// import { membersStore } from "@/store/membersDataStore";
// import { fetchUserProfile } from "@/service/memebers.service";
// import ProfileHeader from "../ProfileHeader";
// import ProfileDetails from "../ProfileDetails";
// function Page() {
//   const { fetchParticularPosts, allParticularPosts } = postStore();
//   const { particularFriends, getParticularFriends } = membersStore();
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isOwner, setIsOwner] = useState(false);

//   const params = useParams();
//   const id = params.id;

//   const fetchProfile = async () => {
//     setLoading(true);
//     try {
//       const result = await fetchUserProfile(id); 
//       setProfileData(result.profile);
//       setIsOwner(result.isOwner);
//       await fetchParticularPosts(id);
//       await getParticularFriends(id);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     if (id) {
//       fetchProfile();
//     }
//   }, [id]);

//   if (!profileData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <ProfileHeader
//         profileData={profileData}
//         setProfileData={setProfileData}
//         isOwner={isOwner}
//         id={id}
//         fetchProfile={fetchProfile}
        
//       />

//       <ProfileDetails
//         profileData={profileData}
//         allParticularPosts={allParticularPosts}
//         fetchParticularPosts={fetchParticularPosts}
//         particularFriends={particularFriends}
//         id={id}
//         loading={loading}
//       />
//     </>
//   );
// }

// export default Page;


// deployment change 3 above to down

function Page(){
  return(

    <p className="mt-[500px]">ashraf</p>
  )
}
export default Page;