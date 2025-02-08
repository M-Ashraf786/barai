import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

     const FriendRequests = ({request , goFriend , decline})=>{
        const alphabet = request?.username.slice(0,1)
    return(
        <>
        
         <div className="flex-1 px-4 py-4 md:ml-64 lg:mr-64 lg:max-w-2xl xl:max-w-3xl mx-auto ">
         <div className="cursor-pointer  flex items-center space-x-4 w-full font-sans font-semibold ">
        <Avatar>
          
                {
                   
                    request?.profileImage ? (<AvatarImage src={request?.profileImage} alt={request?.username}/>):
                    ( <AvatarFallback>{alphabet}</AvatarFallback>)
                    
                }
              
               
            </Avatar>
            <div>
            <p className="">{request?.username} {request?.clan && <span className="text-green-400">{request?.clan}</span>}</p>
            <p className=""><span className="text-red-600">{request?.friendsCount} </span>{request?.friendsCount>1 ? "friends": "friend"}</p>
          
            </div>
            </div>
        <div className="ml-14 mt-[10px] font-sans ">
            <Button 
            onClick = {goFriend}
            className="mr-2"
            variant="outline"
            >Accept</Button>

            <Button 
            onClick = {decline}
           variant="outline"
           >Decline</Button>
            </div>
           
        
        </div>
        <Separator className="mb-2 dark:bg-gray-400 w-4/5 mx-auto " />
      
        </>
    )
}

export default FriendRequests