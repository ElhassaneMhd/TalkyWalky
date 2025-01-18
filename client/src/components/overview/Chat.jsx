import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { MessagesSquare, SendHorizontal } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default function Chat() {
  const { user } = useUser();
  const [msg, setMsg] = useState({ name: user, content: "" });
  const [parent] = useAutoAnimate({ duration: 300 });

  const { sendMessage, msgs, setConnectedUsers } = useAuth();

  const handleChange = (e) => {
    setMsg({ ...msg, [e.target.name]: e.target.value });
  };

  const handelSend = (e) => {
    e.preventDefault();
    if (msg.content === "") {
      toast.error("Message can't be empty");
      return;
    }
    sendMessage(msg);
    setMsg({ ...msg, content: "" });
    sendMessage(msg, "med");
  };

  useEffect(() => {
    const socket = new SockJS("http://[fe80::e0e7:a130:e63:3678]:8089/ws");
    const stpClient = Stomp.over(socket);

    stpClient.connect(
      {
        type: "refresh",
      },
      () => {
        stpClient.subscribe("/topic/users", (msg) => {
          setConnectedUsers(JSON.parse(msg.body));
        });
        stpClient.subscribe("/med/queue/messages", (message) => {
          const parsedMessage = JSON.parse(message.body);
          console.log(parsedMessage);
        });
      }
    );
    setTimeout(() => stpClient.disconnect(), 2000);
  }, []);

  return (
    <section className="p-1 overflow-hidden flex items-center justify-center relative bg-gradient-to-br from-background-tertiary to-background-primary rounded-lg border border-border max-h-[80vh] ">
      <div className="absolute top-0 left-0 right-0 p-2 bg-background-tertiary rounded-t-lg border border-border z-10 h-[10%]">
        <div className="flex gap-2 justify-start items-center text-text-primary text-lg font-bold">
          <MessagesSquare />
          <h1>General Talk</h1>
        </div>
      </div>
      <ul
        className="w-full flex overflow-y-scroll h-[81%]  flex-col gap-2 py-4"
        ref={parent}
      >
        {msgs.map((msg, index) =>
          msg.name === user ? (
            <Message key={index} withName={false} msg={msg} />
          ) : (
            <Message
              withIcon={msgs[index - 1]?.name == msg?.name ? false : true}
              isOwn={false}
              key={index}
              msg={msg}
            />
          )
        )}
      </ul>
      <form
        onSubmit={handelSend}
        className="flex items-center absolute w-full bottom-0 left-0 gap-2 bg-background-tertiary  justify-between  p-2 border-t border-border h-[10%] "
      >
        <input
          className="flex-1 p-2 rounded-lg border border-border bg-background-tertiary focus:outline-none"
          type="text"
          name="content"
          onChange={handleChange}
          value={msg.content}
          placeholder="Message"
        />
        <button type="submit" className="px-2 py-2 ">
          <SendHorizontal size={20} />
        </button>
      </form>
    </section>
  );
}

function Message({ msg, isOwn = true, withName = true, withIcon }) {
  const date = new Date(msg.timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  return (
    <li
      className={` drop-shadow-lg  flex ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative bg-background-tertiary text-text-primary px-4 p-2 border border-border pb-4 rounded-xl  ${
          isOwn ? "rounded-tr-none me-1 " : "rounded-tl-none ms-10"
        }`}
      >
        <span className=" text-text-secondary font-mono ">{msg.content}</span>
        <span
          className={`rounded absolute text-[10px] font-bold  text-text-secondary  bottom-0 ${
            isOwn ? "right-1" : "left-1.5"
          }`}
        >
          {formattedTime}
        </span>
        {withName && withIcon && (
          <div className="rounded-full flex text-white drop-shadow-xl  items-center justify-center -top-4 text-center border h-10 w-10 border-border p-2 dark:bg-background-tertiary bg-gray-700 absolute text-sm font-bold -left-9   ">
            <span>{msg.name.slice(0, 2).toUpperCase()}</span>
          </div>
        )}
      </div>
    </li>
  );
}
