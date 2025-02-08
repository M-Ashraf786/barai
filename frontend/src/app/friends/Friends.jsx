import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
function Friends({ friend, unFriend }) {
  const alphabet = friend.username.slice(0, 1);
  return (
    <>
      <div className="flex-1 px-4 py-4 md:ml-64 lg:mr-64 lg:max-w-2xl xl:max-w-3xl mx-auto ">
        
        <div className="cursor-pointer flex items-center space-x-4 w-full font-sans font-semibold ">
          <Avatar>
            {friend?.profileImage ? (
              <AvatarImage src={friend?.profileImage} alt={friend?.username} />
            ) : (
              <AvatarFallback>{alphabet}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="">
              {friend?.username}{" "}
              {friend?.clan && (
                <span className="text-green-400">{friend?.clan}</span>
              )}
            </p>
            <p className="">
              <span className="text-red-600">{friend?.friendsCount}</span>{" "}
              {friend?.friendsCount > 1 ? "friends" : "friend"}
            </p>
          </div>
        </div>
        <Button
          onClick={unFriend}
          className="ml-14 mt-[10px] font-sans "
          variant="outline"
        >
          Unfriend
        </Button>
      </div>

      <Separator className="mb-2 dark:bg-gray-400 w-4/5 mx-auto " />
    </>
  );
}

export default Friends;
