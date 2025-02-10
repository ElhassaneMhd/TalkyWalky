import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { PlugZap, Workflow } from "lucide-react";

export function Connect() {
  const { user, changeUser } = useUser();
  const [newUser, setNewUser] = useState(user ?? "");
  const navigate = useNavigate();
  const { connect, setStompClient, stompClient } = useAuth();

  const handleConnect = (e) => {
    e?.preventDefault();

    if (!newUser) {
      toast.error("Name can't be empty");
      return;
    }
    changeUser(newUser);

    if (!stompClient) {
      connect(newUser, setStompClient);
      toast.success("Connected to chat server");
    }
    navigate("/chat");
  };
  useEffect(() => {
    if (user && stompClient) {
      connect(user, setStompClient);
      toast.success("Connected to chat server");
      navigate("/chat");
    }

    return () => {
      stompClient && stompClient.disconnect();
    };
  }, []);
  return (
    <>
      <h1 className="text-2xl font-medium text-text-primary sm:text-3xl ">
        Connect to
        <span className="font-extrabold text-primary"> Talky Walky </span>
      </h1>
      <p className="text-sm font-medium text-text-secondary">Enter your Name</p>
      <form onSubmit={handleConnect} className="flex justify-center">
        <div className="relative flex gap-2 justify-center text-center w-full md:w-1/3 ">
          <input
            type="text"
            className="p-2 border border-border rounded-lg w-full focus:outline-none bg-background-tertiary "
            placeholder="Name"
            focus="true"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
          />
          <button className="absolute right-0 border border-border flex gap-1 justify-center items-center p-2 rounded-lg bg-background-tertiary ">
            <PlugZap className=" hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </form>
    </>
  );
}
