import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Welcome, Overview } from "@/pages";
import { Home } from "@/layouts";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Toaster } from "sonner";
import { Loader } from "lucide-react";
import { useTheme } from "./context/ThemeContext";

function App() {
  const [parent] = useAutoAnimate({ duration: 300 });
  const { theme } = useTheme();
  return (
    <>
      <div className="h-dvh w-full" ref={parent}>
        <BrowserRouter>
          <Routes>
            <Route element={<Home />}>
              <Route index element={<Welcome />} />
              <Route
                path="/chat"
                element={<Navigate to="/chat/general" replace={true} />}
              >
                <Route path=":receiver" element={<Overview />} />
              </Route>
              <Route path="/chat/general" element={<Overview />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      <Toaster
        icons={{
          loading: <Loader size={20} className=" animate-spin" />,
        }}
        expand={true}
        position={"bottom-right"}
        theme={theme === "dark" ? "dark" : "light"}
        toastOptions={{ className: "sonner-toast", duration: 2000 }}
      />
    </>
  );
}

export default App;
