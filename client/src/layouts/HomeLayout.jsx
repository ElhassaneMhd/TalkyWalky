import { Footer } from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { Outlet, useNavigate } from "react-router";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export function Home() {
  const navigate = useNavigate();
  const { user, removeUser } = useUser();
  const { stompClient } = useAuth();
  const [parent] = useAutoAnimate({ duration: 300 });
  useEffect(() => {
    if (!stompClient ) {
      navigate("/");
    }
  }, []);
  return (
    <div ref={parent} className="flex flex-col h-full p-5 gap-5">
      <Header />
      <Outlet />
    </div>
  );
}
