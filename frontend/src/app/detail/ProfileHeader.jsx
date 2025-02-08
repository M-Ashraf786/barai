"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import { PenLine, Save, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { updateUserProfile } from "@/service/memebers.service";
import userStore from "@/store/userStore";
import { useForm } from "react-hook-form";

const ProfileHeader = ({
  id,
  profileData,
  isOwner,
  setProfileData,
  fetchProfile,
}) => {
  const [isEditProfileModel, setIsEditProfileModel] = useState(false);

  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const [loading, setLaoding] = useState(false);
  const { setUser } = userStore();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: profileData?.username,
      ethnicGroup: profileData?.ethnicGroup,
      community: profileData?.community,
      clan: profileData?.clan,
      subgroup: profileData?.subgroup,
      countryOfOrigin: profileData?.countryOfOrigin,
      city: profileData?.city,
      liveInCountry: profileData?.liveInCountry,
    },
  });

  const profileImageInputRef = useRef();

  const onSubmitProfile = async (data) => {
    try {
      setLaoding(true);
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("ethnicGroup", data.ethnicGroup);
      formData.append("community", data.community);
      formData.append("clan", data.clan);
      formData.append("subgroup", data.subgroup);
      formData.append("countryoFOrigin", data.countryoFOrigin);
      formData.append("city", data.city);
      formData.append("liveInCountry", data.liveInCountry);

      if (profilePictureFile) {
        formData.append("profilePicture", profilePictureFile);
      }

      const updateProfile = await updateUserProfile(id, formData);
      setProfileData({ ...profileData, ...updateProfile });
      setIsEditProfileModel(false);
      setProfilePicturePreview(null);
      setUser(updateProfile);
      await fetchProfile();
    } catch (error) {
      console.error("error updating user profile", error);
    } finally {
      setLaoding(false);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePictureFile(file);

      const previewUrl = URL.createObjectURL(file);
      setProfilePicturePreview(previewUrl);
    }
  };

  return (
    <div className="relative mt-[110px]">
     <div className="relative h-28 md:h-80 bg-gray-300  overflow-hidden rounded-bl-[50%]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-5 ">
          <div className="relative mt-10">
            <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-700">
              <AvatarImage
                src={profileData?.profileImage}
                alt={profileData?.username}
              />
              <AvatarFallback className="dark:bg-gray-400">
                {profileData?.username
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="mt-4  font-sans  md:text-left flex-grow">
            <h1 className="text-3xl font-bold">
              {profileData?.username}{" "}
              {profileData?.clan && (
                <span className="text-green-400">{profileData?.clan}</span>
              )}
            </h1>
            <p className="text-gray-400 font-semibold ml-2">
              <span className="text-red-500">{profileData?.friendsCount}</span>{" "}
              {profileData?.friendsCount > 1 ? "friends" : "friend"}
            </p>
          </div>
          {isOwner && (
            <Button
              className="mt-4 md:mt-0 cursor-pointer"
              onClick={() => setIsEditProfileModel(true)}
            >
              <PenLine className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {isEditProfileModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed overflow-scroll inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className=" bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Edit Profile
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditProfileModel(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(onSubmitProfile)}
            >
              <div className="flex flex-col items-center mb-4">
                <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700 mb-2">
                  <AvatarImage
                    src={profilePicturePreview || profileData?.profileImage}
                    alt={profileData?.username}
                  />
                  <AvatarFallback className="dark:bg-gray-400">
                    {profileData?.username
                      ?.split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={profileImageInputRef}
                  onChange={handleProfilePictureChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => profileImageInputRef.current?.click()}
                  className="font-sans"
                >
                  <Upload className="h-4 w-4 mr-2 " />
                  Change Profile Picture
                </Button>
              </div>
              <div className="font-sans">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    userId="username"
                    {...register("username")}
                    placeholder="e.g. Muhammad"
                  />
                </div>

                <div>
                  <Label htmlFor="ethnicGroup">Ethnic group</Label>
                  <Input
                    userId="ethnicGroup"
                    {...register("ethnicGroup")}
                    placeholder="e.g. Kutchi"
                  />
                </div>

                <div>
                  <Label htmlFor="community">Community</Label>
                  <Input
                    userId="community"
                    {...register("community")}
                    placeholder="e.g. Loharwada"
                  />
                </div>

                <div>
                  <Label htmlFor="clan">Clan</Label>
                  <Input
                    userId="clan"
                    {...register("clan")}
                    placeholder="e.g. Barai"
                  />
                </div>

                <div>
                  <Label htmlFor="subgroup">Subgroup</Label>
                  <Input
                    userId="subgroup"
                    {...register("subgroup")}
                    placeholder="e.g. Dukka"
                  />
                </div>
                <div>
                  <Label htmlFor="countryoFOrigin">Country of origin</Label>
                  <Input
                    userId="countryoFOrigin"
                    {...register("countryoFOrigin")}
                    placeholder="e.g. Pakistan"
                  />
                </div>

                <div>
                  <Label htmlFor="city">City of residence</Label>
                  <Input
                    userId="city"
                    {...register("city")}
                    placeholder="e.g. Madeenah"
                  />
                </div>

                <div>
                  <Label htmlFor="liveInCountry">Country of residence</Label>
                  <Input
                    userId="liveInCountry"
                    {...register("liveInCountry")}
                    placeholder="e.g. Saudi Arabia"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-400 text-white"
                onClick={onSubmitProfile}
              >
                <Save className="w-4 h-4 mr-2 font-sans" />{" "}
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}

      <AnimatePresence></AnimatePresence>
    </div>
  );
};

export default ProfileHeader;
