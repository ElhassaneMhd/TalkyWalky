import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useUser } from "./UserContext";
import { toast } from "sonner";

export const ThemeContext = createContext();

export function AuthProvider({ children }) {
  const [stompClient, setStompClient] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const { user } = useUser();
  let stpClient = null;

  const connect = (u, x) => {
    const socket = new SockJS("http://[fe80::d533:515d:ae9:aed6]:8000/ws");
    stpClient = Stomp.over(socket);
    stpClient.connect(
      { name: u ?? user },
      () => {
        stpClient.subscribe("/topic/messages", (msg) => {
          setMsgs((e) => [...e, JSON.parse(msg.body)]);
        });
        stpClient.subscribe("/topic/users", (msg) => {
          const users = JSON.parse(msg.body)?.filter((us) => us.name !== user);
          setConnectedUsers(users);
        });
        x(stpClient);
      },
      (error) => {
        console.log(error);
      }
    );
    if (stompClient) toast.success("Connected to chat server");
  };

  const sendMessage = (msg) => {
    stompClient.send("/app/chat", {}, JSON.stringify({ ...msg }));
  };

  useEffect(() => {
    return () => {
      if (stompClient) {
        stompClient.disconnect();
        toast.error("Disconnected from chat server");
      }
    };
  }, [user]);

  return (
    <ThemeContext.Provider
      value={{
        stompClient,
        msgs,
        sendMessage,
        connectedUsers,
        setMsgs,
        setStompClient,
        setConnectedUsers,
        connect,
        stpClient,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");

  return context;
}
