"use client";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formateDate } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import userStore from "@/store/userStore";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";

import PostComments from "./PostComments";

function PostCard({ post, onLike, onDislike, onComment }) {
  const { user } = userStore();

  const [showComments, setShowComments] = useState(false);
  const commentInputRef = useRef(null);

  const [isLikesClicked, setIsLikesClicked] = useState(false);
  const [isDislikesClicked, setIsDislikesClicked] = useState(false);
  const [isCommentsClicked, setIsCommentsClicked] = useState(false);

  const handleCommentClick = () => {
    setShowComments(true);
    setTimeout(() => {
      commentInputRef?.current?.focus();
    }, 0);
  };

  return (
    <>
      <motion.div
        key={post?._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {
          <Card className="mt-4">
            <CardContent className="p-6  dark:text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 cursor-pointer">
                  <Avatar>
                    {post?.postOwner?.profileImage ? (
                      <AvatarImage
                        src={post?.postOwner?.profileImage}
                        alt={post?.postOwner?.username}
                      />
                    ) : (
                      <AvatarFallback>
                       {post?.postOwner?.username?.slice(0, 1)}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div>
                    <p className="font-sans text-black font-medium">
                      {post?.postOwner?.username} {post?.postOwner?.clan && (
                        <span className="text-green-400">
                          {post?.postOwner?.clan}
                        </span>
                      )}
                    </p>

                    <p className="text-gray-500 text-sm font-sans">
                      {formateDate(post?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-5">
                {post?.mediaUrl && post?.mediaType === "image" && (
                  <img src={post?.mediaUrl}  alt="post_image"
                  className="w-full h-auto rounded-lg mb-4" />
                )}
                {post?.mediaUrl && post?.mediaType === "video" && (
                  <video controls className="w-full h-[400px]  mb-4">
                    <source src={post?.mediaUrl}  type="video/mp4"/>
                    Your browser does not support the video tag
                  </video>
                )}
              </div>

              <div className="flex justify-between mx-[0] my-[15px]">
                <div
                  className="relative text-gray-500 hover:border-b-2 cursor-pointer font-sans"
                  onClick={() => {
                    setIsDislikesClicked(false);
                    setIsCommentsClicked(false);
                    setIsLikesClicked(isLikesClicked !== true);
                  }}
                >
                  {post?.likesCount} likes
                  {isLikesClicked && post?.likingPersons?.length > 0 && (
                    <Card className="absolute flex flex-col space-y-1  p-2 bg-white  bottom-[26px] w-[200px] max-h-[300px] overflow-y-scroll scrollbar-none touch-scroll">
                      {post?.likingPersons?.map((person, index) => (
                        <div className="flex space-x-3" key={index}>
                          <Avatar>
                            {person?.profileImage ? (
                              <AvatarImage
                                src={person?.profileImage}
                                alt={person?.username}
                              ></AvatarImage>
                            ) : (
                              <AvatarFallback className="bg-black border-[1px] border-[solid] text-white">
                                {person?.username?.slice(0, 1)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <p>{person?.username}</p>
                        </div>
                      ))}
                    </Card>
                  )}
                </div>

                <div
                  className="relative text-gray-500 hover:border-b-2 cursor-pointer font-sans"
                  onClick={() => {
                    setIsDislikesClicked(isDislikesClicked !== true);
                    setIsCommentsClicked(false);
                    setIsLikesClicked(false);
                  }}
                >
                  {post?.dislikesCount} dislikes
                  {isDislikesClicked &&
                    post?.dislikingPersons?.length > 0 && (
                      <Card className=" absolute flex flex-col space-y-1  p-2 bg-white  bottom-[26px] w-[200px]  max-h-[300px] overflow-y-auto ">
                        {post?.dislikingPersons?.map((person, index) => (
                          <div className="flex space-x-3" key={index}>
                            <Avatar>
                              {person?.profileImageImage ? (
                                <AvatarImage
                                  src={person?.profileImage}
                                  alt={person?.username}
                                ></AvatarImage>
                              ) : (
                                <AvatarFallback className="bg-black border-[1px] border-[solid] border-white">
                                  {person?.username}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <p>{person?.username}</p>
                          </div>
                        ))}
                      </Card>
                    )}
                </div>

                <div
                  className="relative text-gray-500 hover:border-b-2 cursor-pointer font-sans"
                  onClick={() => {
                    setIsDislikesClicked(false);
                    setIsCommentsClicked(isCommentsClicked !== true);
                    setIsLikesClicked(false);
                  }}
                >
                  {post?.commentsCount} comments
                  {isCommentsClicked && post?.commentsCount > 0 && (
                    <Card className="absolute flex flex-col space-y-1 p-2 right-2 bg-white bottom-[26px] w-[200px] max-h-[300px] overflow-y-auto  ">
                      {post?.comments?.map((person, index) => (
                        <div className="flex space-x-3" key={index}>
                          <Avatar>
                            {person?.commenter?.profileImage ? (
                              <AvatarImage
                                src={person?.commenter?.profileImage}
                                alt={person?.username}
                              ></AvatarImage>
                            ) : (
                              <AvatarFallback className="bg-black border-[1px] border-[solid] border-white text-white">
                                {person?.commenter?.username.slice(0, 1)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <p>{person?.commenter?.username}</p>
                        </div>
                      ))}
                    </Card>
                  )}
                </div>
              </div>
              <Separator />
              <div className="mx-[0] my-[5px] flex items-center justify-between">
                <Button variant="ghost" className="font-sans" onClick={onLike}>
                  <ThumbsUp
                    className={`${
                      post?.likingPersons?.some(
                        (person) => person?._id === user?._id
                      )
                        ? "fill-blue-500 stroke-blue-500"
                        : ""
                    }`}
                  />{" "}
                  Like
                </Button>
                <Button
                  variant="ghost"
                  className="font-sans"
                  onClick={onDislike}
                >
                  <ThumbsDown
                    className={`${
                      post?.dislikingPersons?.some(
                        (person) => person?._id === user?._id
                      )
                        ? "fill-black stroke-black"
                        : ""
                    }`}
                  />
                  Dislike
                </Button>

                <Button
                  variant="ghost"
                  className="font-sans"
                  onClick={handleCommentClick}
                >
                  <MessageCircle /> Comment
                </Button>
              </div>
              <Separator className="mb-2 dark:bg-gray-400" />
              <AnimatePresence>
                {showComments && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PostComments
                      post={post}
                      onComment={onComment}
                      commentInputRef={commentInputRef}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        }
      </motion.div>
    </>
  );
}

export default PostCard;
