"use client";

import SeachBar from "./SeachBar";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const NavBar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-[90%] mx-auto py-4 flex items-center justify-end text-2xl ">
      <SeachBar />
      <Button
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="bg-secondary-background mx-1"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};

export default NavBar;
