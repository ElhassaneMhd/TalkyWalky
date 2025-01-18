import Chat from "../components/overview/Chat";
import { ChevronsRight } from "lucide-react";
import { OnlineUsers } from "../components/overview/UsersList";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export function Overview() {
  const [isOpen, setIsOpen] = useState(false);
  const [parent] = useAutoAnimate({ duration: 1000 });
  return (
    <div
      ref={parent}
      className={`relative  md:p-0 grid ${
        isOpen ? "ps-0" : "ps-4"
      } grid-cols-1 md:grid-cols-[1fr,2fr] gap-5 h-full `}
    >
      <Toggler isOpen={isOpen} setIsOpen={setIsOpen} />
      <OnlineUsers isOpen={isOpen} />
      <Chat />
    </div>
  );
}

function Toggler({ isOpen, setIsOpen }) {
  return (
    <button
      onClick={() => setIsOpen((e) => !e)}
      className={`flex md:hidden  z-50 absolute  hover:scale-110  p-2 rounded-full transition-transform duration-300 ${
        isOpen ? "rotate-180 top-3 right-2 " : "rotate-0 top-[40%] -left-5"
      }`}
    >
      <ChevronsRight />
    </button>
  );
}
