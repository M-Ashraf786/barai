// "use client";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { AnimatePresence } from "framer-motion";
// import { MapPin, PenLine, Save, Upload, X } from "lucide-react";
// import React, { useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { updateUserProfile } from "@/service/memebers.service";
// import userStore from "@/store/userStore";
// import { useForm } from "react-hook-form";
// import PostCard from "../posts/postCard";
// import { postStore } from "@/store/postStore";

// const MySettings = ({
//   userId,
//   profileData,
//   isOwner,
//   setProfileData,
//   fetchProfile,
//   allParticularPosts,
//   particularFriends,
// }) => {
//   const [isEditProfileModel, setIsEditProfileModel] = useState(false);

//   const [profilePicturePreview, setProfilePicturePreview] = useState(null);
//   const [profilePictureFile, setProfilePictureFile] = useState(null);

//   const [loading, setLaoding] = useState(false);
//   const { setUser } = userStore();

//   const { register, handleSubmit } = useForm({
//     defaultValues: {
//       username: profileData?.username,
//       ethnicGroup: profileData?.ethnicGroup,
//       community: profileData?.community,
//       clan: profileData?.clan,
//       subgroup: profileData?.subgroup,
//       countryOfOrigin: profileData?.countryOfOrigin,
//       city: profileData?.city,
//       liveInCountry: profileData?.liveInCountry,
//     },
//   });

//   const profileImageInputRef = useRef();

//   const { fetchLike, fetchDislike, handleCommentPost, fetchParticularPosts } =
//     postStore();

//   const onSubmitProfile = async (data) => {
//     try {
//       setLaoding(true);
//       const formData = new FormData();
//       formData.append("username", data.username);
//       formData.append("ethnicGroup", data.ethnicGroup);
//       formData.append("community", data.community);
//       formData.append("clan", data.clan);
//       formData.append("subgroup", data.subgroup);
//       formData.append("countryoFOrigin", data.countryoFOrigin);
//       formData.append("city", data.city);
//       formData.append("liveInCountry", data.liveInCountry);

//       if (profilePictureFile) {
//         formData.append("profilePicture", profilePictureFile);
//       }

//       const updateProfile = await updateUserProfile(userId, formData);
//       setProfileData({ ...profileData, ...updateProfile });

//       setIsEditProfileModel(false);
//       setProfilePicturePreview(null);
//       setUser(updateProfile);
//       await fetchProfile();
//     } catch (error) {
//       console.error("error updating user profile", error);
//     } finally {
//       setLaoding(false);
//     }
//   };

//   const handleProfilePictureChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePictureFile(file);

//       const previewUrl = URL.createObjectURL(file);
//       setProfilePicturePreview(previewUrl);
//     }
//   };

//   const handleLike = async (postId) => {
//     try {
//       await fetchLike(postId);
//       await fetchParticularPosts(userId);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDislike = async (postId) => {
//     try {
//       await fetchDislike(postId);
//       await fetchParticularPosts(userId);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <>
//       <div
//         className="custom-bg bg-black bg-opacity-50 mb-2 "
//         style={{ backgroundImage: `url(${profileData?.profileImage})` }}
//       >
//         <div className="relative overflow-visible">
//           {/* edit profile model */}
//           <AnimatePresence>
//             {isEditProfileModel && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="fixed overflow-scroll inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//               >
//                 <motion.div
//                   initial={{ scale: 0.9, y: 20 }}
//                   animate={{ scale: 1, y: 0 }}
//                   exit={{ scale: 0.9, y: 20 }}
//                   className=" bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
//                 >
//                   <div className="flex justify-between items-center mb-1">
//                     <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//                       Edit Profile
//                     </h2>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setIsEditProfileModel(false)}
//                     >
//                       <X className="w-4 h-4" />
//                     </Button>
//                   </div>
//                   <form
//                     className="space-y-4"
//                     onSubmit={handleSubmit(onSubmitProfile)}
//                   >
//                     <div className="flex flex-col items-center mb-4">
//                       <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700 mb-2">
//                         <AvatarImage
//                           src={
//                             profilePicturePreview || profileData?.profileImage
//                           }
//                           alt={profileData?.username}
//                         />
//                         <AvatarFallback className="dark:bg-gray-400">
//                           {profileData?.username
//                             ?.split(" ")
//                             .map((name) => name[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         ref={profileImageInputRef}
//                         onChange={handleProfilePictureChange}
//                       />
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => profileImageInputRef.current?.click()}
//                         className="font-sans"
//                       >
//                         <Upload className="h-4 w-4 mr-2 " />
//                         Change Profile Picture
//                       </Button>
//                     </div>
//                     <div className="font-sans">
//                       <div>
//                         <Label htmlFor="username">Username</Label>
//                         <Input
//                           userId="username"
//                           {...register("username")}
//                           placeholder="e.g. Muhammad"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor="ethnicGroup">Ethnic group</Label>
//                         <Input
//                           userId="ethnicGroup"
//                           {...register("ethnicGroup")}
//                           placeholder="e.g. Kutchi"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor="community">Community</Label>
//                         <Input
//                           userId="community"
//                           {...register("community")}
//                           placeholder="e.g. Loharwada"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor="clan">Clan</Label>
//                         <Input
//                           userId="clan"
//                           {...register("clan")}
//                           placeholder="e.g. Barai"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor="subgroup">Subgroup</Label>
//                         <Input
//                           userId="subgroup"
//                           {...register("subgroup")}
//                           placeholder="e.g. Dukka"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="countryoFOrigin">
//                           Country of origin
//                         </Label>
//                         <Input
//                           userId="countryoFOrigin"
//                           {...register("countryoFOrigin")}
//                           placeholder="e.g. Pakistan"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor="city">City of residence</Label>
//                         <Input
//                           userId="city"
//                           {...register("city")}
//                           placeholder="e.g. Madeenah"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor="liveInCountry">
//                           Country of residence
//                         </Label>
//                         <Input
//                           userId="liveInCountry"
//                           {...register("liveInCountry")}
//                           placeholder="e.g. Saudi Arabia"
//                         />
//                       </div>
//                     </div>
//                     <Button
//                       type="submit"
//                       className="w-full bg-blue-600 hover:bg-blue-400 text-white"
//                       onClick={onSubmitProfile}
//                     >
//                       <Save className="w-4 h-4 mr-2" />{" "}
//                       {loading ? "Saving..." : "Save changes"}
//                     </Button>
//                   </form>
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* edit cover model */}
//           <AnimatePresence></AnimatePresence>
//         </div>

//         <div className=" mt-16 mb-2 ml-1 md:ml-64">
//           <h1 className="font-sans font-bold text-[x-large] mb-7 text-white">
//             About
//           </h1>
//           <div className="flex flex-col space-y-3 ml-3 text-white font-sans font-semibold">
//             <>
//               <div>
//                 <p>Ethnic group :</p>
//                 {profileData?.ethnicGroup ? (
//                   <p
//                     className="ml-14 text-[#c2c281]
//     "
//                   >
//                     {profileData?.ethnicGroup}
//                   </p>
//                 ) : (
//                   <p className="ml-14 font-sans">Not defined</p>
//                 )}
//               </div>

//               <div>
//                 <p className="mt-2">Community :</p>
//                 {profileData?.community ? (
//                   <div>
//                     <p
//                       className="ml-14 text-[#c2c281]
//     "
//                     >
//                       {profileData?.community}
//                     </p>
//                   </div>
//                 ) : (
//                   <p className="ml-14 font-sans">Not defined</p>
//                 )}
//               </div>

//               <div>
//                 <p className="mt-2">Clan :</p>
//                 {profileData?.clan ? (
//                   <p
//                     className="ml-14 text-[#c2c281]
// "
//                   >
//                     {profileData?.clan}
//                   </p>
//                 ) : (
//                   <p className="ml-14 font-sans">Not defined</p>
//                 )}
//               </div>

//               <div>
//                 <p className="mt-2">Subgroup :</p>
//                 {profileData?.subgroup ? (
//                   <p
//                     className="ml-14 text-[#c2c281]

//   "
//                   >
//                     {profileData?.subgroup}
//                   </p>
//                 ) : (
//                   <p className="ml-14 font-sans">Not defined</p>
//                 )}
//               </div>

//               <div>
//                 <p className="mt-2">Country of origin :</p>
//                 {profileData?.countryoFOrigin ? (
//                   <p
//                     className="ml-14 text-[#c2c281]
//   "
//                   >
//                     {profileData?.countryoFOrigin}
//                   </p>
//                 ) : (
//                   <p className="ml-14 font-sans">Not defined</p>
//                 )}
//               </div>

//               <div className="flex items-center  space-x-1 ">
//                 <MapPin className="text-[red] " />
//                 <p>
//                   {" "}
//                   <span> {profileData?.city},</span>{" "}
//                   <span className="text-xl">{profileData?.liveInCountry}</span>
//                 </p>
//               </div>
//             </>
//           </div>

//           <div className="mt-7 font-sans bg-[black] rounded-[50%]">
//             <h1 className="text-3xl font-semibold text-[#c2c281]">
//               {profileData?.username}{" "}
//               {profileData?.clan && (
//                 <span className="text-green-400">{profileData?.clan}</span>
//               )}
//             </h1>
//             <p className="font-sans text-gray-300 ml-2">
//               <span className=" text-red-500">{profileData?.friendsCount}</span>{" "}
//               <span className="font-sans">
//                 {profileData?.friendsCount > 1 ? "friends" : "friend"}
//               </span>
//             </p>
//           </div>
//           <div className=" px-4 sm:px-6 lg:px-8 ml-40  ">
//             {isOwner && (
//               <Button
//                 className="mt-4 md:mt-0 cursor-pointer  font-mono"
//                 onClick={() => setIsEditProfileModel(true)}
//               >
//                 <PenLine className="w-4 h-4 mr-2" />
//                 Edit Profile
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>

//       <Tabs defaultValue="posts" className="w-full font-sans">
//         <TabsList className="w-[450px] mx-auto grid grid-cols-2">
//           <TabsTrigger value="posts">Posts</TabsTrigger>
//           <TabsTrigger value="friends">Friends</TabsTrigger>
//         </TabsList>
//         <TabsContent value="posts">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {allParticularPosts?.length > 0 ? (
//               <div className="flex-1 px-4 py-6  md:ml-64 lg:mr-64 lg:max-w-2xl xl:max-w-3xl mx-auto">
//                 <div className="lg:ml-2 xl:ml-72 ">
//                   {allParticularPosts?.map((post, index) => (
//                     <PostCard
//                       key={index}
//                       postData={post}
//                       onLike={() => handleLike(post?._id)}
//                       onDislike={() => handleDislike(post?._id)}
//                       onComment={async (comment) => {
//                         await handleCommentPost(post?._id, comment?.text);
//                         await fetchParticularPosts(userId);
//                       }}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <p className="md:ml-[600px] mt-[40px] font-sans font-semibold ml-10 mb-10 text-gray-400">
//                 No any post
//               </p>
//             )}
//           </motion.div>
//           {}
//         </TabsContent>

//         <TabsContent value="friends">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {particularFriends?.length > 0 ? (
//               <div className="flex-1 px-4 py-6  md:ml-64 lg:mr-64 lg:max-w-2xl xl:max-w-3xl mx-auto">
//                 <div className="lg:ml-2 xl:ml-72 ">
//                   {particularFriends?.map((friend,index) => (
//                     <div className=" ml-12 pb-8 flex items-center space-x-2 space-y-2 w-full " key={index}>
//                       <Avatar>
//                         {friend?.profileImage ? (
//                           <AvatarImage
//                             src={friend?.profileImage}
//                             alt={friend.username}
//                           />
//                         ) : (
//                           <AvatarFallback>
//                             {friend?.username?.slice(0, 1)}
//                           </AvatarFallback>
//                         )}
//                       </Avatar>
//                       <div className="">
//                         <p className="">
//                           {friend?.username} {friend?.clan && <span className="text-green-400">{friend?.clan}</span>}
//                         </p>
//                         <p className="">
//                           <span className="text-red-600">{friend?.friendsCount}</span> {friend?.friendsCount > 1 ? "friends" : "friend"}{" "}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <p className="mt-[40px] md:ml-[600px] font-sans font-semibold ml-10 mb-10 text-gray-400">
//                 No any friend
//               </p>
//             )}
//           </motion.div>
//         </TabsContent>
//       </Tabs>
//     </>
//   );
// };

// export default MySettings;


// "use client";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { AnimatePresence } from "framer-motion";
// import { Camera, PenLine, Save, Upload, X } from "lucide-react";
// import React, { useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsList, TabsTrigger ,TabsContent} from '@/components/ui/tabs'
// import { updateUserCoverPhoto, updateUserProfile } from "@/service/memebers.service";
// import userStore from "@/store/userStore";
// import { useForm } from "react-hook-form";
// import PostCard from "../posts/postCard";


// const MySettings = ({
//   userId,
//   profileData,
//   isOwner,
//   setProfileData,
//   fetchProfile,
//   allParticularPosts,
//   particularFriends,
//   fetchParticularPosts
// }) => {
//   const [isEditProfileModel, setIsEditProfileModel] = useState(false);
//   const [isEditCoverModel, setIsEditCoverModel] = useState(false);
//   const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
//   const [profilePicturePreview, setProfilePicturePreview] = useState(null);
//   const [profilePictureFile, setProfilePictureFile] = useState(null);
//   const [coverPhotoFile, setCoverPhotoFile] = useState(null);
//   const [loading, setLaoding] = useState(false);
//   const { user,setUser,clearUser } = userStore();
 

//    const {register,handleSubmit,setValue} = useForm({
//     defaultValues:{
//       username: profileData?.username,
//       community: profileData?.gender,
//       caste: profileData?.caste,
//       subgroup: profileData?.subgroup,
//       country: profileData?.country,
//        city: profileData?.city
//     }
//    })

//   const profileImageInputRef = useRef();
//   const coverImageInputRef = useRef();


//   const onSubmitProfile = async (data) => {
    
//     try {
//       setLaoding(true);
//       const formData = new FormData();
//       formData.append("username", data.username);
//       formData.append("gender", data.gender);
//       formData.append("caste", data.caste);
//       formData.append("subgroup", data.subgroup);
//       formData.append("country", data.country);
//       formData.append("city", data.city);

      

//       if (profilePictureFile) {
//         formData.append("profilePicture", profilePictureFile);
//       }

//       const updateProfile = await updateUserProfile(userId, formData);
//       setProfileData({ ...profileData, ...updateProfile });
     
//       setIsEditProfileModel(false);
//       setProfilePicturePreview(null);
//       setUser(updateProfile);
//       await fetchProfile();
//     } catch (error) {
//       console.error("error updating user profile", error);
//     } finally {
//       setLaoding(false);
//     }
//   };

//   const handleProfilePictureChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePictureFile(file);

//       const previewUrl = URL.createObjectURL(file);
//       setProfilePicturePreview(previewUrl);
//     }
//   };

//   const onSubmitCoverPhoto = async (e) => {
//     e.preventDefault();
//     try {
//       setLaoding(true);
//       const formData = new FormData();
//       if (coverPhotoFile) {
//         formData.append("coverPhoto", coverPhotoFile);
//       }
//       const updateProfile = await updateUserCoverPhoto(userId, formData);
//       setProfileData({ ...profileData, coverPhoto:updateProfile.coverPhoto });
//     setProfileData(updateProfile);
//       setIsEditCoverModel(false);
//       setCoverPhotoFile(null);
//       setUser(updateProfile);
//     } catch (error) {
//       console.error("error updating user cover photo", error);
//     } finally {
//       setLaoding(false);
//     }
//   };

//   const handleCoverPhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setCoverPhotoFile(file);

//       const previewUrl = URL.createObjectURL(file);
//       setCoverPhotoPreview(previewUrl);
//     }
   
//   };
// return (
//     <>
//     <div className="relative overflow-visible">
//       <div className="relative h-64 md:h-80 bg-gray-300 overflow-visible pointer-events-auto">
//         <img
//           src={profileData?.coverPhoto}
//           alt="cover"
//           className=" w-full h-full object-cover "
//         />
//        {isOwner && (
//                  <Button
//                    className=" absolute bottom-4 right-4  cursor-pointer"
//                    variant="secondary"
//                    size="sm"
//                    onClick={() => setIsEditCoverModel(true)}
//                  >
//                    <Camera className=" mr-0 h-4 w-4" />
                  
//                  </Button>
//         )}
//       </div>
     
//        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
//               <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-5 ">
//                 <div className="relative">
//                 <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-700">
//                   <AvatarImage
//                     src={profileData?.profileImage}
//                      alt={profileData?.username}
//                   />
//                   <AvatarFallback className="dark:bg-gray-400">
//                     {profileData?.username
//                       ?.split(" ")
//                       .map((name) => name[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>
               
                
//                 </div>
                
//                 <div className="mt-4 mdLmt-0 text-center md:text-left flex-grow">
//                   <h1 className="text-3xl font-bold">{profileData?.username} 
//                     {profileData?.caste && (<span> {profileData?.caste}</span>)}
//                   </h1>
//                   <p className="text-gray-400 font-semibold">
//                     {profileData?.friendsCount} {profileData?.friendsCount>1? "friends" : "friend"}
//                   </p>
//                 </div>
//             {isOwner && (
//                      <Button
//                        className="mt-4 md:mt-0 cursor-pointer  font-mono"
//                        onClick={() => setIsEditProfileModel(true)}
//                      >
//                        <PenLine className="w-4 h-4 mr-2" />
//                        Edit Profile
//                      </Button>
//                    )}
//                  </div>
//                </div>

//       {/* edit profile model */}
//       <AnimatePresence>
//              {isEditProfileModel && (
//                <motion.div
//                  initial={{ opacity: 0 }}
//                  animate={{ opacity: 1 }}
//                  exit={{ opacity: 0 }}
//                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//                >
//                  <motion.div
//                    initial={{ scale: 0.9, y: 20 }}
//                    animate={{ scale: 1, y: 0 }}
//                    exit={{ scale: 0.9, y: 20 }}
//                    className=" bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
//                  >
//                    <div className="flex justify-between items-center mb-4">
//                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//                        Edit Profile
//                      </h2>
//                      <Button
//                        variant="ghost"
//                        size="icon"
//                        onClick={() => setIsEditProfileModel(false)}
//                      >
//                        <X className="w-4 h-4" />
//                      </Button>
//                </div>
//                             <form className="space-y-4" onSubmit={handleSubmit(onSubmitProfile)}>
//                               <div className="flex flex-col items-center mb-4">
//                                 <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700 mb-2">
//                                   <AvatarImage
//                                     src={profilePicturePreview || profileData?.profilePicture}
//                                     alt={profileData?.username}
//                                   />
//                                   <AvatarFallback className="dark:bg-gray-400">
//                                     {profileData?.username
//                                       ?.split(" ")
//                                       .map((name) => name[0])
//                                       .join("")}
//                                   </AvatarFallback>
//                                 </Avatar>
//                                 <input type="file" accept="image/*" className="hidden" ref={profileImageInputRef}  onChange={handleProfilePictureChange}/>
//                                 <Button type="button" variant="outline" size="sm" onClick={() => profileImageInputRef.current?.click()} className="">
//                                   <Upload className="h-4 w-4 mr-2" />
//                                   Change Profile Picture
//                                 </Button>
//                               </div>
//                               <div>
//                                 <Label htmlFor="username">Username</Label>
//                                 <Input userId="username"  {...register("username")}/>
//                               </div>
//                               <div>
//                                 <Label htmlFor="gender">Community</Label>
//                                 <Input userId="gender" {...register("gender")}/>
//                               </div>

//                 <div>
//                 <Label htmlFor="caste">Caste</Label>
//                 <Input userId="caste" {...register("caste")}/>
//                 </div>

//                 <div>
//                 <Label htmlFor="subgroup">Subgroup</Label>
//                 <Input userId="subgroup" {...register("subgroup")}/>
//                 </div>
//                 <div>
//                 <Label htmlFor="country">Country</Label>
//                 <Input userId="country" {...register("country")}/>
//                 </div>

//                 <div>
//                 <Label htmlFor="city">City</Label>
//                 <Input userId="city" {...register("city")}/>
//                 </div>
                




//                   <Button
//                               type="submit"
//                               className="w-full bg-blue-600 hover:bg-blue-400 text-white"
//                               onClick={onSubmitProfile} 
//                             >
//                               <Save className="w-4 h-4 mr-2" /> {loading ? "Saving...": "Save changes"}
//                             </Button>
//                           </form>
//                         </motion.div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
            
//                   {/* edit cover model */}
//                   <AnimatePresence>
//                     {isEditCoverModel && (
//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//                       >
//                         <motion.div
//                           initial={{ scale: 0.9, y: 20 }}
//                           animate={{ scale: 1, y: 0 }}
//                           exit={{ scale: 0.9, y: 20 }}
//                           className=" bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
//                         >
//                           <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//                               Edit Cover Photo
//                             </h2>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               onClick={() => setIsEditCoverModel(false)}
//                             >
//                               <X className="w-4 h-4" />
//                             </Button>
//                           </div>
//                           <form className="space-y-4">
//                             <div className="flex flex-col items-center mb-4">
//                               {coverPhotoPreview && (
//                                 <img
//                                   src={coverPhotoPreview}
//                                   alt="cover-photo"
//                                   className="w-full h-40 object-cover rounded-lg mb-4"
//                                 />
//                               )}
//                               <input type="file" accept="image/*" className="hidden" ref={coverImageInputRef}  onChange={handleCoverPhotoChange}/>
//                               <Button type="button" variant="outline" size="sm" onClick={() => coverImageInputRef.current?.click()}>
//                                 <Upload className="h-4 w-4 mr-2" />
//                                 Select New Cover Photo
//                               </Button>
//                             </div>
            
//                             <Button
//                               className="w-full bg-blue-600 hover:bg-blue-400 text-white"
//                               onClick={onSubmitCoverPhoto}
//                               disabled = {!coverPhotoFile}
//                               type="button"
//                             >
//                               <Save className="w-4 h-4 mr-2" /> {loading ? "Saving..." :"Save Cover Photo"}
//                             </Button>
//                           </form>
//                         </motion.div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//                 // tt
//                 <div className=" mt-14 mb-14 ml-10 md:ml-64">
//  <h1 className="font-sans font-bold text-[x-large] mb-7">About</h1>
//  <div className="flex flex-col space-y-3 ml-12 font-sans font-semibold">
//  {profileData && (
//     <>
//  <p >Community :</p>
//  <p className="ml-12
//  ">{profileData?.gender}</p>  

// <p>Caste :</p>
// <p className="ml-14


// ">{profileData.caste}</p> 


//  <p>Subgroup :</p>
// <p className="ml-14

// ">{profileData.subgroup}</p>

// <p>Country : </p>
// <p className="ml-14


// ">{profileData.country}</p>

// <p>City : </p>
// <p className="ml-14


// ">{profileData.city}</p> 
// </>

//   )}
        
//  </div>
 
        
//         </div> 

    
    
//             <Tabs defaultValue='posts' className='w-full font-sans'>
//                 <TabsList className="w-[450px] mx-auto grid grid-cols-2">
//                     <TabsTrigger value="posts">
//                         Posts
//                     </TabsTrigger>
//                     <TabsTrigger value="friends">
//                         Friends
//                     </TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="posts">
//                 <motion.div 
// initial={{opacity:0, y:20}}
// animate={{opacity:1, y:0}}
// transition={{duration:0.5}}

// >
//                     {
//                         allParticularPosts.length > 0 ? 
//                         (
                        
//                         <div className="flex-1 px-4 py-6  md:ml-64 lg:mr-64 lg:max-w-2xl xl:max-w-3xl mx-auto">
//                         <div className="lg:ml-2 xl:ml-72 ">
//                             {
//                               allParticularPosts.map((post,index)=><PostCard
//           key={index}
//              postData={post}
//              onLike = {()=>handleLike(post?._id)}
//              onDislike = {()=>handleDislike(post?._id)}
 
//              onComment={async(comment) => {
//     await handleCommentPost(post?._id,comment.text);
//     await fetchParticularPosts(userId)
//   }}
//              />)
                             
//                              }
//                         </div>
//                         </div>
//                         )
//                         :(<p className="md:ml-[600px] mt-[40px] font-sans font-semibold ml-10 mb-10 text-gray-400">No any post</p>) 
//                     }
//                     </motion.div>
//                       {
       
//         }
                    

//                 </TabsContent>
                
//                 <TabsContent value="friends">
                
// <motion.div 
// initial={{opacity:0, y:20}}
// animate={{opacity:1, y:0}}
// transition={{duration:0.5}}

// >
//     {
//         particularFriends.length > 0 ? 
//         (
                      
//                       <div className="flex-1 px-4 py-6  md:ml-64 lg:mr-64 lg:max-w-2xl xl:max-w-3xl mx-auto">
//                        <div className="lg:ml-2 xl:ml-72 ">
//            {               
            
//             particularFriends.map(friend=> <div className=" ml-12 pb-8 flex items-center space-x-2 space-y-2 w-full " >
//                 <Avatar>
//                          {
//                              friend?.profileImage ? (<AvatarImage src={friend?.profileImage} alt={friend.username}/>):
//                               ( <AvatarFallback>{friend.username.slice(0,1)}</AvatarFallback>)
//                           }
                        
                         
//               </Avatar>
//                       <div>
//                       <p className="">{friend.username} {friend?.caste && (<span>{friend?.caste}</span>)}</p>
//                       <p className="">{friend.friendsCount} {friend.friendsCount >1? "friends":"friend"} </p>
//                       </div>
                      
//                      </div>

//                      )
//                     }
//                      </div>
//                      </div>
                    

//         )
//         :
//         (<p  className="mt-[40px] md:ml-[600px] font-sans font-semibold ml-10 mb-10 text-gray-400">No any friend</p>)
      
        

//     }
   
    

    
// </motion.div>

//                     </TabsContent>

//             </Tabs>
        

    
//     </>     
//   );
// };

// export default MySettings;

// copy from other foler to test

// "use client";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { AnimatePresence } from "framer-motion";
// import { MapPin, PenLine, Save, Upload, X } from "lucide-react";
// import React, { useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { updateUserProfile } from "@/service/memebers.service";
// import userStore from "@/store/userStore";
// import { useForm } from "react-hook-form";
// import PostCard from "../posts/postCard";
// import { postStore } from "@/store/postStore";

// const MySettings = ({
//   userId,
//   profileData,
//   isOwner,
//   setProfileData,
//   fetchProfile,
//   allParticularPosts,
//   particularFriends,
// }) => {
//   const [isEditProfileModel, setIsEditProfileModel] = useState(false);

//   const [profilePicturePreview, setProfilePicturePreview] = useState(null);
//   const [profilePictureFile, setProfilePictureFile] = useState(null);

//   const [loading, setLaoding] = useState(false);
//   const { setUser } = userStore();

//   const { register, handleSubmit } = useForm({
//     defaultValues: {
//       username: profileData?.username,
//       ethnicGroup: profileData?.ethnicGroup,
//       community: profileData?.community,
//       clan: profileData?.clan,
//       subgroup: profileData?.subgroup,
//       countryOfOrigin: profileData?.countryOfOrigin,
//       city: profileData?.city,
//       liveInCountry: profileData?.liveInCountry,
//     },
//   });

//   const profileImageInputRef = useRef();

//   const { fetchLike, fetchDislike, handleCommentPost, fetchParticularPosts } =
//     postStore();

//   const onSubmitProfile = async (data) => {
//     try {
//       setLaoding(true);
//       const formData = new FormData();
//       formData.append("username", data.username);
//       formData.append("ethnicGroup", data.ethnicGroup);
//       formData.append("community", data.community);
//       formData.append("clan", data.clan);
//       formData.append("subgroup", data.subgroup);
//       formData.append("countryoFOrigin", data.countryoFOrigin);
//       formData.append("city", data.city);
//       formData.append("liveInCountry", data.liveInCountry);

//       if (profilePictureFile) {
//         formData.append("profilePicture", profilePictureFile);
//       }

//       const updateProfile = await updateUserProfile(userId, formData);
//       setProfileData({ ...profileData, ...updateProfile });

//       setIsEditProfileModel(false);
//       setProfilePicturePreview(null);
//       setUser(updateProfile);
//       await fetchProfile();
//     } catch (error) {
//       console.error("error updating user profile", error);
//     } finally {
//       setLaoding(false);
//     }
//   };

//   const handleProfilePictureChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePictureFile(file);

//       const previewUrl = URL.createObjectURL(file);
//       setProfilePicturePreview(previewUrl);
//     }
//   };

//   const handleLike = async (postId) => {
//     try {
//       await fetchLike(postId);
//       await fetchParticularPosts(userId);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDislike = async (postId) => {
//     try {
//       await fetchDislike(postId);
//       await fetchParticularPosts(userId);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <>
//       <div
//         className="custom-bg bg-black bg-opacity-50 mb-2 mt-[70px]"
//         style={{ backgroundImage: `url(${profileData?.profileImage})` }}
//       >
//         <div className="relative overflow-visible">
//           {/* edit profile model */}
//           <AnimatePresence>
//             {isEditProfileModel && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="fixed overflow-scroll inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//               >
//                 <motion.div
//                   initial={{ scale: 0.9, y: 20 }}
//                   animate={{ scale: 1, y: 0 }}
//                   exit={{ scale: 0.9, y: 20 }}
//                   className=" bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
//                 >
//                   <div className="flex justify-between items-center mb-1">
//                     <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//                       Edit Profile
//                     </h2>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setIsEditProfileModel(false)}
//                     >
//                       <X className="w-4 h-4" />
//                     </Button>
//                   </div>
//                   <form
//                     className="space-y-4"
//                     onSubmit={handleSubmit(onSubmitProfile)}
//                   >
//                     <div className="flex flex-col items-center mb-4">
//                       <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700 mb-2">
//                         <AvatarImage
//                           src={
//                             profilePicturePreview || profileData?.profileImage
//                           }
//                           alt={profileData?.username}
//                         />
//                         <AvatarFallback className="dark:bg-gray-400">
//                           {profileData?.username
//                             ?.split(" ")
//                             .map((name) => name[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         ref={profileImageInputRef}
//                         onChange={handleProfilePictureChange}
//                       />
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => profileImageInputRef.current?.click()}
//                         className="font-sans"
//                       >
//                         <Upload className="h-4 w-4 mr-2 " />
//                         Change Profile Picture
//                       </Button>
//                     </div>
//                     <div className="font-sans">
//                       <div>
//                         <Label htmlFor="username">Username</Label>
//                         <Input
//                           userId="username"
//                           {...register("username")}
//                           placeholder="e.g. Muhammad"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor="ethnicGroup">Ethnic group</Label>
//                         <Input
//                           userId="ethnicGroup"
//                           {...register("ethnicGroup")}
//                           placeholder="e.g. Kutchi"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor="community">Community</Label>
//                         <Input
//                           userId="community"
//                           {...register("community")}
//                           placeholder="e.g. Loharwada"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor="clan">Clan</Label>
//                         <Input
//                           userId="clan"
//                           {...register("clan")}
//                           placeholder="e.g. Barai"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor="subgroup">Subgroup</Label>
//                         <Input
//                           userId="subgroup"
//                           {...register("subgroup")}
//                           placeholder="e.g. Dukka"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="countryoFOrigin">
//                           Country of origin
//                         </Label>
//                         <Input
//                           userId="countryoFOrigin"
//                           {...register("countryoFOrigin")}
//                           placeholder="e.g. Pakistan"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor="city">City of residence</Label>
//                         <Input
//                           userId="city"
//                           {...register("city")}
//                           placeholder="e.g. Madeenah"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor="liveInCountry">
//                           Country of residence
//                         </Label>
//                         <Input
//                           userId="liveInCountry"
//                           {...register("liveInCountry")}
//                           placeholder="e.g. Saudi Arabia"
//                         />
//                       </div>
//                     </div>
//                     <Button
//                       type="submit"
//                       className="w-full bg-blue-600 hover:bg-blue-400 text-white"
//                       onClick={onSubmitProfile}
//                     >
//                       <Save className="w-4 h-4 mr-2" />{" "}
//                       {loading ? "Saving..." : "Save changes"}
//                     </Button>
//                   </form>
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* edit cover model */}
//           <AnimatePresence></AnimatePresence>
//         </div>

//         <div className=" mt-36 mb-2 ml-1 md:ml-64">
//           <h1 className="font-sans font-bold text-[x-large] mb-7 text-white">
//             About
//           </h1>
//           <div className="flex flex-col space-y-3 ml-3 text-white font-sans font-semibold">
//             <>
//               <div>
//                 <p>Ethnic group :</p>
//                 {profileData?.ethnicGroup ? (
//                   <p
//                     className="ml-14 text-[#c2c281]
//     "
//                   >
//                     {profileData?.ethnicGroup}
//                   </p>
//                 ) : (
//                   <p className="ml-14 font-sans">Not defined</p>
//                 )}
//               </div>

//               <div>
//                 <p className="mt-2">Community :</p>
//                 {profileData?.community ? (
//                   <div>
//                     <p
//                       className="ml-14 text-[#c2c281]
//     "
//                     >
//                       {profileData?.community}
//                     </p>
//                   </div>
//                 ) : (
//                   <p className="ml-14 font-sans">Not defined</p>
//                 )}
//               </div>

//               <div>
//                 <p className="mt-2">Clan :</p>
//                 {profileData?.clan ? (
//                   <p
//                     className="ml-14 text-[#c2c281]
// "
//                   >
//                     {profileData?.clan}
//                   </p>
//                 ) : (
//                   <p className="ml-14 font-sans">Not defined</p>
//                 )}
//               </div>

//               <div>
//                 <p className="mt-2">Subgroup :</p>
//                 {profileData?.subgroup ? (
//                   <p
//                     className="ml-14 text-[#c2c281]

//   "
//                   >
//                     {profileData?.subgroup}
//                   </p>
//                 ) : (
//                   <p className="ml-14 font-sans">Not defined</p>
//                 )}
//               </div>

//               <div>
//                 <p className="mt-2">Country of origin :</p>
//                 {profileData?.countryoFOrigin ? (
//                   <p
//                     className="ml-14 text-[#c2c281]
//   "
//                   >
//                     {profileData?.countryoFOrigin}
//                   </p>
//                 ) : (
//                   <p className="ml-14 font-sans">Not defined</p>
//                 )}
//               </div>

//               <div className="flex items-center  space-x-1 ">
//                 <MapPin className="text-[red] " />
//                 <p>
//                   {" "}
//                   <span> {profileData?.city},</span>{" "}
//                   <span className="text-xl">{profileData?.liveInCountry}</span>
//                 </p>
//               </div>
//             </>
//           </div>

//           <div className="mt-7 font-sans bg-[black] rounded-[50%]">
//             <h1 className="text-3xl font-semibold text-[#c2c281]">
//               {profileData?.username}{" "}
//               {profileData?.clan && (
//                 <span className="text-green-400">{profileData?.clan}</span>
//               )}
//             </h1>
//             <p className="font-sans text-gray-300 ml-2">
//               <span className=" text-red-500">{profileData?.friendsCount}</span>{" "}
//               <span className="font-sans">
//                 {profileData?.friendsCount > 1 ? "friends" : "friend"}
//               </span>
//             </p>
//           </div>
//           <div className=" px-4 sm:px-6 lg:px-8 ml-40  ">
//             {isOwner && (
//               <Button
//                 className="mt-4 md:mt-0 cursor-pointer  font-mono"
//                 onClick={() => setIsEditProfileModel(true)}
//               >
//                 <PenLine className="w-4 h-4 mr-2" />
//                 Edit Profile
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>

//       <Tabs defaultValue="posts" className="w-full font-sans">
//         <TabsList className="w-[450px] mx-auto grid grid-cols-2">
//           <TabsTrigger value="posts">Posts</TabsTrigger>
//           <TabsTrigger value="friends">Friends</TabsTrigger>
//         </TabsList>
//         <TabsContent value="posts">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {allParticularPosts?.length > 0 ? (
//               <div className="flex-1 px-4 py-6  md:ml-64 lg:mr-64 lg:max-w-2xl xl:max-w-3xl mx-auto">
//                 <div className="lg:ml-2 xl:ml-72 ">
//                   {allParticularPosts?.map((post, index) => (
//                     <PostCard
//                       key={index}
//                       postData={post}
//                       onLike={() => handleLike(post?._id)}
//                       onDislike={() => handleDislike(post?._id)}
//                       onComment={async (comment) => {
//                         await handleCommentPost(post?._id, comment?.text);
//                         await fetchParticularPosts(userId);
//                       }}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <p className="md:ml-[600px] mt-[40px] font-sans font-semibold ml-10 mb-10 text-gray-400">
//                 No any post
//               </p>
//             )}
//           </motion.div>
//           {}
//         </TabsContent>

//         <TabsContent value="friends">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {particularFriends?.length > 0 ? (
//               <div className="flex-1 px-4 py-6  md:ml-64 lg:mr-64 lg:max-w-2xl xl:max-w-3xl mx-auto">
//                 <div className="lg:ml-2 xl:ml-72 ">
//                   {particularFriends?.map((friend,index) => (
//                     <div className=" ml-12 pb-8 flex items-center space-x-2 space-y-2 w-full " key={index}>
//                       <Avatar>
//                         {friend?.profileImage ? (
//                           <AvatarImage
//                             src={friend?.profileImage}
//                             alt={friend.username}
//                           />
//                         ) : (
//                           <AvatarFallback>
//                             {friend?.username?.slice(0, 1)}
//                           </AvatarFallback>
//                         )}
//                       </Avatar>
//                       <div className="">
//                         <p className="">
//                           {friend?.username}{" "}
//                           {friend?.clan && <span>{friend?.clan}</span>}
//                         </p>
//                         <p className="">
//                           {friend?.friendsCount}{" "}
//                           {friend?.friendsCount > 1 ? "friends" : "friend"}{" "}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <p className="mt-[40px] md:ml-[600px] font-sans font-semibold ml-10 mb-10 text-gray-400">
//                 No any friend
//               </p>
//             )}
//           </motion.div>
//         </TabsContent>
//       </Tabs>
//     </>
//   );
// };

// export default MySettings;
export default function Page (){
  return(
<p className="mt-[500px]">THENGA</p>
  )
}
