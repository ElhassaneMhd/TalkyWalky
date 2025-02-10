import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { MessageSquare, Unplug, UserRound } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import { toast } from "sonner";

export default function Header() {
  const [parent] = useAutoAnimate({ duration: 300 });
  const { user } = useUser();
  const { stompClient } = useAuth();

  return (
    <header
      ref={parent}
      className="flex justify-between items-center px-1 md:px-6 py-4 bg-background-secondary  border border-border rounded-lg shadow-sm"
    >
      <div className="flex items-center space-x-2">
        <MessageSquare className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          TWalky
        </h1>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4" ref={parent}>
        {user && <LoggedUser />}

        {user && stompClient && <UunPlug />}
        <ThemeSwitcher />
      </div>
    </header>
  );
}

const LoggedUser = () => {
  const { user } = useUser();
  const { stompClient } = useAuth();
  const [parent] = useAutoAnimate({ duration: 300 });
  return (
    <div className="flex  gap-2">
      <div
        className=" font-bold text-text-secondary flex relative gap-2 items-center bg-background-tertiary text-right border border-border p-2 rounded-lg"
        ref={parent}
      >
        {user && stompClient && (
          <span className="hidden md:flex ">{user} </span>
        )}
        <UserRound />
      </div>
    </div>
  );
};

const UunPlug = () => {
  const { user } = useUser();
  const { stompClient } = useAuth();
  const handelLogout = () => {
    if (!stompClient || !user) {
      toast.error("You are not connected");
      return;
    }
    stompClient.disconnect();
    toast.success("You have left the chat");
    window.location.reload();
  };
  return (
    <button
      className="  p-2.5 bg-background-tertiary text-text-primary border border-border rounded-lg flex items-center space-x-2 gap-2 capitalize font"
      onClick={handelLogout}
    >
      <Unplug size={20} />
    </button>
  );
};
