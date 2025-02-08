import {getAllMembers, xsendFriendRequest,fetchFriendss, xfetchFriendRequests, deleteFriendService,getParticularFriendsService} from '@/service/memebers.service'


import {create} from 'zustand'


export const membersStore = create((set)=>({

    members:[],
    friends:[],
    particularFriends:[],
    friendRequests:[],
    sentFriendRequests:[],
    loading:false,
    
    // Fetch users/members
    fetchMembers: async()=> { 
       set({loading:true})
       try{
        const members = await getAllMembers();
        set({members,loading:false})
      } catch (error) {
        set({error, loading:false})
      }
    },
    // Fetch my friends
    fetchFriends: async(userId)=>{
      try{
      const friends = await fetchFriendss(userId)
      set({friends})
    } catch (error) {
      set({error, loading:false})
    }
    },

    // Fetch who I have requested for friends . Not in use
    fetchSentFriendRequests: async(memberId)=>{
      set({loading:true})
      try{
       const sentFriendRequests = await  xsendFriendRequest(memberId)
      set({sentFriendRequests,loading:false})
    } catch (error) {
      set({error, loading:false})
    }
    },

    // Fetch who have requested me for friends

    fetchFriendRequests: async()=>{
      try{
      const friendRequests =   await xfetchFriendRequests();
      set({friendRequests})
    } catch (error) {
      set({error, loading:false})
    }
    },


    sendFriendRequest: async(memberId)=>{
      try{
      await xsendFriendRequest(memberId)
    } catch (error) {
      set({error, loading:false})
    }
    },

    deleteFriend: async(memberId)=>{
      try{
      await deleteFriendService(memberId);
    } catch (error) {
      set({error, loading:false})
    }
    },

    getParticularFriends: async(memberId)=>{
      try{
      const particularFriends = await getParticularFriendsService(memberId)
      set({particularFriends})
    } catch (error) {
      set({error, loading:false})
    }
    }

   
    
  })
)




