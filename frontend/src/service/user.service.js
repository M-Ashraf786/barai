import axiosInstance from "./url.service";


export const members =async ()=>{
    try {
        const result =  await axiosInstance.get('/userCollection/getAllUsers') ;
    
        
       return result?.data?.data;
    } catch (error) {
        console.error(error);
    throw error;
    }
   
}

export const likePost = async(userName)=>{  // C
    try {
        const result = await axiosInstance.post(`/userAuth/getUserById/user/${userName}`)  // CONTROLLER getUserById
        return result?.data?.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const registerUser = async(newUserData)=>{
    try {
        const result = await axiosInstance.post('/userCollection/signUp',newUserData);
        // return result?.data?.data
        return result?.data
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}

export const loginUser = async(logingUserData)=>{
    try {
        const result = await axiosInstance.post('/userCollection/signIn', logingUserData)
    // return result?.data?.data;
    return result?.data
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}


export const logout = async()=>{
    try {
        const result = await axiosInstance.get('/userCollection/signOut')
        return result?.data
 } catch (error) {
    console.error(error);
    throw error;
    } 
}


export const checkUserAuth = async() =>{
    try {
         const response= await axiosInstance.get('members/check-auth'); // controller
         if(response.data.status === 'success'){
            return {isAuthenticated :true, user:response?.data?.data}
         }else if(response.status === 'error'){
            return {isAuthenticated :false}
         }
    } catch (error) {
        
        return {isAuthenticated :false}
    }
}










// delete 10 3

//get all users posts 
// export const getUserByUserId = async(userName)=>{
//     try {
//         const result = await axiosInstance.get(`/userAuth/getUserById/user/${userName}`)
//         return result?.data?.data;
//     } catch (error) {
//         console.error(error)
//         throw error;
//     }
// }

// delete 10 3



