import { useTheme } from "../hooks/useTheme";
import logoDark from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";
import logoMobile from "../assets/logo-mobile.svg";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import downChevron from "../assets/icon-chevron-down.svg";
import upChevron from "../assets/icon-chevron-up.svg";
import Button from "../ui/Button";
import { useState } from "react";

function Header({ isSidebarOpen, boardName, onAddTask, hasColumns }) {
  const { isDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-surface w-full flex items-center justify-between h-16 md:h-20 lg:h-24 shrink-0">
      {/* Logo area */}
      <div
        className={`flex items-center h-full px-4 md:px-6 
          md:w-[261px] lg:w-[300px] 
          md:border-r md:border-edge shrink-0
          transition-transform duration-300 ease-in-out
           ${!isSidebarOpen ? "border-b" : ""}`}
      >
        <img src={logoMobile} alt="Kanban" className="md:hidden" />
        <img
          src={isDark ? logoLight : logoDark}
          alt="Kanban"
          className="hidden md:block"
        />
      </div>
      {/* Board name + actions */}
      <nav className="flex flex-1 items-center justify-between px-4 md:px-6 lg:px-8 h-full border-b border-edge">
        {/* Mobile: tappable heading with caret */}
        <button
          className="relative flex items-center justify-start gap-1 md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span className="heading-l">{boardName ?? "No Active Board"}</span>
          <img
            src={isMobileMenuOpen ? upChevron : downChevron}
            alt={isMobileMenuOpen ? "Collapse menu" : "Expand menu"}
          />
        </button>

        {/* Tablet and above: static heading */}
        <h1 className="hidden md:block heading-xl">
          {boardName ?? "No Active Board"}
        </h1>

        <div className="flex items-center gap-4 md:gap-6">
          {/* Mobile: icon-only add button */}
          <Button
            onClick={onAddTask}
            disabled={!hasColumns}
            size="S"
            className="md:hidden"
          >
            +
          </Button>

          {/* Tablet+: full add button */}
          <Button
            onClick={onAddTask}
            disabled={!hasColumns}
            className="hidden md:flex"
          >
            <span className="relative top-[0.5px]">+</span> Add New Task
          </Button>

          <button className="cursor-pointer p-1 rounded-full">
            <img src={ellipsis} alt="Board options" />
          </button>
        </div>
      </nav>{" "}
    </header>
  );
}

export default Header;
