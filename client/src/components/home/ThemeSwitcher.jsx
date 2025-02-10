import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export function ThemeSwitcher() {
  const { theme: currentTheme, changeTheme } = useTheme();

  return (
    <>
      <button
        className="  p-5 overflow-hidden bg-background-tertiary text-text-primary border border-border rounded-lg flex items-center space-x-2 gap-2 capitalize font"
        onClick={() => changeTheme(currentTheme === "dark" ? "light" : "dark")}
      >
        <div className="relative  ">
          <Moon
            className={`absolute bottom-0 -right-3 -top-3 transition-transform duration-300 ${
              currentTheme === "light" ? " translate-y-10 " : " translate-y-0"
            }`}
          />
          <SunMedium
            className={`absolute -right-3 -top-3 bottom-0 transition-transform duration-300 ${
              currentTheme === "light" ? " translate-y-0 " : " translate-y-10"
            }`}
          />
        </div>
      </button>
    </>
  );
}
