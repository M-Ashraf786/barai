import {
  getAllPosts,
  likePost,
  dislikePost,
  commentsPost,
  createPost,
  getParticularPosts,
} from "@/service/post.service";
import { create } from "zustand";
import toast from "react-hot-toast";

export const postStore = create((set) => ({
  allPosts: [],
  allParticularPosts: [],
  loading: false,
  error: null,

  fetchAllPosts: async () => {
    set({ loading: true });
    try {
      const allPosts = await getAllPosts();

      set({ allPosts, loading: false });
      return allPosts;
    } catch (error) {
      set({ error, loading: false });
    }
  },

  fetchLike: async (postId) => {
    set({ loading: true });
    try {
      await likePost(postId);
    } catch (error) {
      set({ error, loading: false });
    }
  },

  fetchDislike: async (postId) => {
    set({ loading: true });
    try {
      await dislikePost(postId);
    } catch (error) {
      set({ error, loading: false });
    }
  },

  handleCommentPost: async (postId, text) => {
    set({ loading: true });
    try {
      const newComments = await commentsPost(postId, { text });
      set((state) => ({
        allPosts: state.allPosts.map((post) =>
          post?._id === postId
            ? { ...post, comments: [...post.comments, newComments] } 
            : post
        ),
      }));
      //   toast.success("Comments added successfully");
    } catch (error) {
      set({ error, loading: false });
      // toast.error("failed to add comments");
    }
  },

  handleCreatePost: async (postData) => {
    set({ loading: true });
    try {
      const newPost = await createPost(postData);
      set((state) => ({
        allPosts: [newPost, ...state.allPosts],
       
        loading: false,
      }));
      toast.success("Post created successfully");
    } catch (error) {
      set({ error, loading: false });
      toast.error("Failed to create post");
    }
  },

  fetchParticularPosts: async (memberId) => {
    set({ loading: true });
    try {
      const allParticularPosts = await getParticularPosts(memberId);

      set({ allParticularPosts, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));
