"use client";
import { useState } from "react";
import PostCard from "../posts/postCard";
import { useEffect } from "react";
import { postStore } from "@/store/postStore";
import NewPostForm from "../posts/NewPostForm";
function Homepage() {
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
 
  const {
    allPosts,
    fetchAllPosts,
    fetchLike,
    fetchDislike,
    handleCommentPost,
  } = postStore();



const accessAllPosts = async()=>{
  
  await fetchAllPosts();
  
  
}

useEffect(()=>{
  accessAllPosts();
// },[fetchAllPosts])
// deployment change 1 above to down
},[allPosts])
// if I doesn't give allPosts dependency in above useEffect,new post doesn't instant show username and no of friends count without reload

  const handleLike = async (postId) => {
    try {
      await fetchLike(postId);
      await fetchAllPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      await fetchDislike(postId);
      await fetchAllPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex-1 px-4 py-6 md:ml-64 lg:mr-64 lg:max-w-2xl xl:max-w-3xl mx-auto mt-[30px] ">
        <div className="lg:ml-2 xl:ml-28">
          <NewPostForm
            isPostFormOpen={isPostFormOpen}
            setIsPostFormOpen={setIsPostFormOpen}
          />
          {
            
             allPosts?.map((post, index) => (
              
                
                  <PostCard
                  key={index}
                  post={post}
                  onLike={() => handleLike(post?._id)}
                  onDislike={() => handleDislike(post?._id)}
                  onComment={async (comment) => {
                    await handleCommentPost(post?._id, comment.text);
                    await fetchAllPosts();
                  }}
                />
                                
              ))

}
          
         
        </div>
      </div>
    </>
  );
}

export default Homepage;
