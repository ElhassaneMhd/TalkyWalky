import { useAutoAnimate } from "@formkit/auto-animate/react";
import { CircleUser, UsersRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function OnlineUsers({ isOpen }) {
  const [parent] = useAutoAnimate({ duration: 300 });
  const { connectedUsers } = useAuth();
  const onlineUsers = connectedUsers.filter((user) => user.status == "online");
  const offlineUsers = connectedUsers.filter(
    (user) => user.status == "offline"
  );
  const all = [...onlineUsers, ...offlineUsers];
  return (
    <section
      className={` overflow-hidden absolute md:relative md:flex md:translate-x-0 md:m-0 w-full  transition-transform duration-500 h-full  items-center justify-center  bg-background-secondary z-40 rounded-lg border border-border max-h-[80vh] ${
        isOpen
          ? "flex translate-x-0 top-0 left-0 w-full  "
          : " -translate-x-[200%]"
      }`}
    >
      <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 right-0 p-2 bg-background-tertiary rounded-t-lg border border-border z-10">
          <h1 className="flex justify-start items-center gap-2 text-text-primary text-lg font-bold">
            <UsersRound size={20} />
            Connected Users
          </h1>
          <p className="text-text-secondary text-sm">
            {all.length} All Users | {onlineUsers.length} Online
          </p>
        </div>
        <ul
          className="w-full flex overflow-y-scroll h-[90%] rounded-b-lg mt-16 flex-col  "
          ref={parent}
        >
          {all?.map((user) => (
            <li
              key={user.id}
              className=" flex justify-start items-center gap-3 p-4 border-b border-border  bg-background-secondary"
            >
              <div className="relative">
                <CircleUser />
                <span
                  className={` absolute w-2 h-2 rounded-full right-0 bottom-0  ${
                    user.status == "online" ? " bg-green-600" : " bg-red-600"
                  }`}
                ></span>
              </div>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
