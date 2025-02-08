"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Handshake } from "lucide-react";
import { useRouter } from "next/navigation";

export const MembersView = ({ member, friendRequest }) => {
  const alphabet = member.username.slice(0, 1);
  const router = useRouter();
  const goToProfile = (path) => {
    router.push(path);
  };
  return (
    <>
      <div className="flex-1 px-4 py-4 md:ml-64 lg:mr-64 lg:max-w-2xl xl:max-w-3xl mx-auto ">
        <div className="cursor-pointer  flex items-center space-x-4 w-full font-sans font-semibold ">
          <Avatar onClick={() => goToProfile(`/detail/${member._id}`)}>
            {member?.profileImage ? (
              <AvatarImage src={member?.profileImage} alt={member.username} />
            ) : (
              <AvatarFallback className="font-sans">{alphabet}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="">
              {member?.username}{" "}
              {member?.clan && (
                <span className="text-green-400">{member?.clan}</span>
              )}
            </p>
            <p className="">
              <span className="text-red-600">{member?.friendsCount}</span>{" "}
              {member?.friendsCount > 1 ? "friends" : "friend"}
            </p>
          </div>
        </div>
        <Button
          onClick={friendRequest}
          className="ml-14 mt-[10px] font-sans "
          variant="outline"
        >
          <Handshake />
          Request For Friend
        </Button>
      </div>
      <Separator className="mb-2 dark:bg-gray-400 w-4/5 mx-auto " />
    </>
  );
};
