// import PostCard from "../posts/postCard";
// import { postStore } from "@/store/postStore";
// import { motion } from "framer-motion";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { MapPin } from "lucide-react";

// function ProfileDetails({
//   profileData,
//   allParticularPosts,
//   fetchParticularPosts,
//   particularFriends,
//   id,
//   loading
// }) {
//   const { fetchLike, fetchDislike, handleCommentPost } = postStore();
//   const handleLike = async (postId) => {
//     try {
//       await fetchLike(postId);
//       await fetchParticularPosts(id);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDislike = async (postId) => {
//     try {
//       await fetchDislike(postId);
//       await fetchParticularPosts(id);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <>
//     {loading?"Loading":(<div className=" mb-14 ml-10 md:ml-64">
//         <h1 className="font-sans font-bold text-[x-large] mb-7 mt-4">About</h1>
//         <div className="flex flex-col space-y-3 ml-12 font-sans font-semibold">
//           <div>
//             <p>Ethnic group :</p>
//             {profileData?.ethnicGroup ? (
//               <p
//                 className="ml-14 
//     "
//               >
//                 {profileData?.ethnicGroup}
//               </p>
//             ) : (
//               <p className="ml-14 font-sans">Not defined</p>
//             )}
//           </div>

//           <div>
//             <p className="mt-2">Community :</p>
//             {profileData?.community ? (
//               <div>
//                 <p
//                   className="ml-14 
//     "
//                 >
//                   {profileData?.community}
//                 </p>
//               </div>
//             ) : (
//               <p className="ml-14 font-sans">Not defined</p>
//             )}
//           </div>

//           <div>
//             <p className="mt-2">Clan :</p>
//             {profileData?.clan ? (
//               <p
//                 className="ml-14 
// "
//               >
//                 {profileData?.clan}
//               </p>
//             ) : (
//               <p className="ml-14 font-sans">Not defined</p>
//             )}
//           </div>

//           <div>
//             <p className="mt-2">Subgroup :</p>
//             {profileData?.subgroup ? (
//               <p
//                 className="ml-14 

//   "
//               >
//                 {profileData?.subgroup}
//               </p>
//             ) : (
//               <p className="ml-14 font-sans">Not defined</p>
//             )}
//           </div>

//           <div>
//             <p className="mt-2">Country of origin :</p>
//             {profileData?.countryoFOrigin ? (
//               <p
//                 className="ml-14 
//   "
//               >
//                 {profileData?.countryoFOrigin}
//               </p>
//             ) : (
//               <p className="ml-14 font-sans">Not defined</p>
//             )}
//           </div>

//           <div className="flex items-center  space-x-1 ">
//             <MapPin className="text-[red] " />
//             <p>
//               {" "}
//               <span> {profileData?.city},</span>{" "}
//               <span className="text-xl">{profileData?.liveInCountry}</span>
//             </p>
//           </div>
//         </div>
//       </div>)}
      

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Tabs defaultValue="posts" className="w-full font-sans">
//           <TabsList className="w-[450px] mx-auto grid grid-cols-2">
//             <TabsTrigger value="posts">Posts</TabsTrigger>
//             <TabsTrigger value="friends">Friends</TabsTrigger>
//           </TabsList>
//           <TabsContent value="posts">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               {allParticularPosts?.length > 0 ? (
//                 <div className="flex-1 px-4 py-6  md:ml-64 lg:mr-64 lg:max-w-2xl xl:max-w-3xl mx-auto">
//                   <div className="lg:ml-2 xl:ml-72 ">
//                     {allParticularPosts?.map((post, index) => (
//                       <PostCard
//                         key={index}
//                         postData={post}
//                         onLike={() => handleLike(post?._id)}
//                         onDislike={() => handleDislike(post?._id)}
//                         onComment={async (comment) => {
//                           await handleCommentPost(post?._id, comment.text);
//                           await fetchParticularPosts(id);
//                         }}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <p className="md:ml-[600px] mt-[40px] font-sans font-semibold ml-10 mb-10 text-gray-400">
//                   No any post
//                 </p>
//               )}
//             </motion.div>
//             {}
//           </TabsContent>

//           <TabsContent value="friends">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               {particularFriends.length > 0 ? (
//                 <div className="flex-1 px-4 py-6  md:ml-64 lg:mr-64 lg:max-w-2xl xl:max-w-3xl mx-auto">
//                   <div className="lg:ml-2 xl:ml-72 ">
//                     {particularFriends.map((friend) => (
//                       <div className="cursor-pointer ml-12 pb-8 flex items-center space-x-2 space-y-2 w-full ">
//                         <Avatar>
//                           {friend?.profileImage ? (
//                             <AvatarImage
//                               src={friend?.profileImage}
//                               alt={friend?.username}
//                             />
//                           ) : (
//                             <AvatarFallback>
//                               {friend?.username.slice(0, 1)}
//                             </AvatarFallback>
//                           )}
//                         </Avatar>
//                         <div>
//                           <p>
//                             {friend?.username} {friend?.clan && (
//                               <span className="text-green-400">
//                                 {friend?.clan}
//                               </span>
//                             )}
//                           </p>
//                           <p>
//                             <span className="text-red-600">{friend?.friendsCount} </span>
//                             {friend?.friendsCount > 1 ? "friends" : "friend"}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <p className="mt-[40px] md:ml-[600px] font-sans font-semibold ml-10 mb-10 text-gray-400">
//                   No any friend
//                 </p>
//               )}
//             </motion.div>
//           </TabsContent>
//         </Tabs>
//       </motion.div>
//     </>
//   );
// }

// export default ProfileDetails;


// deployment change 2 above to down

function ProfileDetails(){
  return(

    <p className="mt-[500px]">ashraf</p>
  )
}
export default ProfileDetails;