import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkMode";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  return (
    <div className={`dark:bg-zinc-900 bg-[#4361ee] p-2 `}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="border-gray-50 border-[1px] rounded-md p-3 "
      >
        {!darkMode ? (
          <MoonIcon width={32} height={32} color="#F7EAC6" />
        ) : (
          <SunIcon width={32} height={32} color="#F7EAC6" />
        )}
      </button>
    </div>
  );
};

export default DarkModeToggle;
