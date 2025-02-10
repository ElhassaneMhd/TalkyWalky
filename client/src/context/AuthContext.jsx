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
    const socket = new SockJS("http://[fe80::e0e7:a130:e63:3678]:8089/ws");
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
          console.log("Connected users:", users);
        });
        
        x(stpClient);
      },
      (error) => {
        console.log(error);
      }
    );
    if (stompClient) toast.success("Connected to chat server");
  };

  const sendMessage = (msg, receiver = null) => {
    stompClient.send(
      `/app/chat${receiver ? "/private" : ""}`,
      {
        receiver,
      },
      JSON.stringify({ ...msg })
    );
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
