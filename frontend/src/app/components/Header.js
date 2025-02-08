import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { logout } from "@/service/user.service";
import userStore from "@/store/userStore";
import { Home, Users, Handshake, UserPen, LogOut, Palette } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { membersStore } from "@/store/membersDataStore";
import { updateLocalStorage } from "@/service/memebers.service";

function Header() {
  const { friendRequests } = membersStore();
  const { user, setUser, clearUser } = userStore();

  const localStorage = async (req, res) => {
    const updatedStore = await updateLocalStorage(user?.id);

    setUser(updatedStore);
  };

  // useEffect(() => {
  //   localStorage();
  // }, [friendRequests]);

  const router = useRouter();

  const [activeTab, setActiveTab] = useState("home");

  const userPlaceholder = user?.username
    ?.split(" ")
    .map((name) => name[0])
    .join("");

  const handleNavigation = (path, item) => {
    router.push(path);
    setActiveTab(item);
  };

  const [colourDiv, setColourDiv] = useState(false);
  const [colour, setColour] = useState("bg-[linear-gradient(45deg,#ede574,#e1f5c4)]");

  useEffect(() => {
    setColourDiv((prev) => !prev);
  }, [colour]);

  return (
    <header
      className={` ${colour} dark:bg-[rgb(36,37,38)] text-foreground shadow-md fixed top-0 left-0 right-0 z-50 p-2 `}
    >
      <div className="flex font-sans items-center justify-between w-[90%] mx-auto">
        <div className=" font-extrabold text-3xl text-[#002765] ">
          b a r a i
        </div>

        <div className="border-[2px] border-[solid] border-[white] rounded-full">
          <Avatar>
            {user?.profileImage ? (
              <AvatarImage src={user?.profileImage} alt={user?.username} />
            ) : (
              <AvatarFallback className="dark:bg-gray-400">
                {userPlaceholder}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>
      <Separator className="mt-2 mb-2" />
      <nav className=" flex justify-around ">
        {[
          { icon: Home, path: "/", name: "home" },
          { icon: Users, path: "/members", name: "members" },
          { icon: Handshake, path: "/friends", name: "friends" },
          { icon: UserPen, path: "/settings", name: "settings" },
        ].map(({ icon: Icon, path, name }) => (
          <Button
            key={name}
            variant="ghost"
            size="icon"
            className={`relative [box-shadow:0_0_20px_rgba(0,_0,_0,_0.3)] text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-transparent  ${
              activeTab === name ? "text-blue-600" : " "
            }`}
            onClick={() => handleNavigation(path, name)}
          >
            <Icon className="relative" />
            {name === "friends" && user?.followerCount > 0 ? (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {user?.followerCount}
              </span>
            ) : (
              ""
            )}
          </Button>
        ))}

        <Button
          key={"logout"}
          variant="ghost"
          size="icon"
          className="relative cursor-pointer [box-shadow:0_0_20px_rgba(0,_0,_0,_0.3)]  text-gray-600 hover:text-blue-600 hover:bg-transparent"
          onClick={async () => {
            await logout();
            clearUser();
            router.push("/login");
          }}
        >
          <LogOut />
        </Button>

        <Button
          key={"color"}
          variant="ghost"
          size="icon"
          className="relative cursor-pointer [box-shadow:0_0_20px_rgba(0,_0,_0,_0.3)]  text-gray-600 hover:text-blue-600 hover:bg-transparent"
          onClick={() => setColourDiv(!colourDiv === true)}
        >
          <Palette />
        </Button>
      </nav>
      {colourDiv && (
        <div className="absolute right-8 flex space-x-2 top-24 bg-gray-400 p-1 rounded-xl">
          <p
            className="w-5 h-5 rounded-full bg-[linear-gradient(45deg,#06beb6,#48b1bf)]"
            onClick={() => {
              setColour("bg-[linear-gradient(45deg,#06beb6,#48b1bf)]");
            }}
          ></p>

          <p
            className="w-5 h-5 rounded-full bg-[linear-gradient(45deg,#4AC29A,#BDFFF3)]"
            onClick={() => {
              setColour("bg-[linear-gradient(45deg,#4AC29A,#BDFFF3)]");
            }}
          ></p>

          <p
            className="w-5 h-5 rounded-full bg-[linear-gradient(45deg,#da22ff,#9733ee)]"
            onClick={() => {
              setColour("bg-[linear-gradient(45deg,#da22ff,#9733ee)]");
            }}
          ></p>

          <p
            className="w-5 h-5 rounded-full bg-[linear-gradient(45deg,#ede574,#e1f5c4)]"
            onClick={() => {
              setColour("bg-[linear-gradient(45deg,#ede574,#e1f5c4)]");
            }}
          ></p>

          <p
            className="w-5 h-5 rounded-full bg-[linear-gradient(45deg,#85FFBD,#FFFB7D)]"
            onClick={() => {
              setColour("bg-[linear-gradient(45deg,#85FFBD,#FFFB7D)]");
            }}
          ></p>

          <p
            className="w-5 h-5 rounded-full bg-[linear-gradient(45deg,#F0FF00,#58CFFB)]"
            onClick={() => {
              setColour("bg-[linear-gradient(45deg,#F0FF00,#58CFFB)]");
            }}
          ></p>

          <p
            className="w-5 h-5 rounded-full bg-[linear-gradient(45deg,#81FFEF,#F067B4)]"
            onClick={() => {
              setColour("bg-[linear-gradient(45deg,#81FFEF,#F067B4)]");
            }}
          ></p>

          <p
            className="w-5 h-5 rounded-full bg-[linear-gradient(120deg,_#fdfbfb_0%,_#ebedee_100%)]"
            onClick={() => {
              setColour(
                "bg-[linear-gradient(120deg,_#fdfbfb_0%,_#ebedee_100%)]"
              );
            }}
          ></p>

          <p
            className="w-5 h-5 rounded-full bg-[linear-gradient(60deg,_#abecd6_0%,_#fbed96_100%)]"
            onClick={() => {
              setColour(
                "bg-[linear-gradient(60deg,_#abecd6_0%,_#fbed96_100%)]"
              );
            }}
          ></p>

          <p
            className="w-5 h-5 rounded-full bg-[linear-gradient(43deg,_#4158D0_0%,_#C850C0_46%,_#FFCC70_100%)]"
            onClick={() =>
              setColour(
                " bg-[linear-gradient(43deg,_#4158D0_0%,_#C850C0_46%,_#FFCC70_100%)]"
              )
            }
          ></p>

<p
            className="w-5 h-5 rounded-full bg-[linear-gradient(60deg,_#abecd6_0%,_#fbed96_100%)]"
            onClick={() => {
              setColour(
                "bg-[#EDEED9]"
              );
            }}
          ></p>
        </div>
      )}
    </header>
  );
}

export default Header;
