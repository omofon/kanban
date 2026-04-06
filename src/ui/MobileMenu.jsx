// src/ui/MobileMenu.jsx
import { useBoard } from "../context/BoardContext";
import { useTheme } from "../hooks/useTheme";
import iconMoon from "../assets/icon-dark-theme.svg";
import iconSun from "../assets/icon-light-theme.svg";

export default function MobileMenu({ isOpen, onClose }) {
  const { boards, activeBoardId, setActiveBoardId } = useBoard();
  const { isDark, toggle } = useTheme();

  if (!isOpen) return null;

  const boardIcon = (
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Panel */}
      <section className="fixed top-20 left-1/2 -translate-x-1/2 w-66 bg-surface rounded-lg z-50 py-4 md:hidden shadow-lg">
        {/* Board List */}
        <nav className="flex flex-col w-60">
          <p className="text-ink-muted px-6 mb-4 heading-s uppercase">
            All Boards ({boards.length})
          </p>

          <ul className="w-full space-y-1">
            {boards.map((board) => {
              const isActive = board.id === activeBoardId;
              return (
                <li key={board.id}>
                  <button
                    onClick={() => {
                      setActiveBoardId(board.id);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-4 h-11 pl-6 pr-6 rounded-r-full
                    transition-colors duration-150 hover:bg-menu-hover hover:text-brand
                    ${isActive ? "bg-brand text-ink-white" : "text-ink-muted"}`}
                  >
                    {boardIcon}
                    <span className="heading-m">{board.name}</span>
                  </button>
                </li>
              );
            })}

            <li>
              <button
                onClick={onClose}
                className="w-full flex items-center gap-4 h-11 pl-6 pr-6 rounded-r-full
                text-brand heading-m hover:bg-menu-hover transition-colors cursor-pointer"
              >
                {boardIcon}+ Create New Board
              </button>
            </li>
          </ul>
        </nav>

        {/* Theme toggle */}
        <div className="h-12 w-60 mx-auto mt-4 bg-canvas rounded-lg flex items-center justify-center gap-6">
          <img src={iconSun} alt="Light theme" />
          <button
            onClick={toggle}
            className="relative w-10 h-5 bg-brand rounded-full cursor-pointer"
          >
            <span
              className={`absolute top-0.75 w-3.5 h-3.5 bg-white rounded-full
              transition-transform duration-200
              ${isDark ? "-translate-x-4.25" : "translate-x-0.75"}`}
            />
          </button>
          <img src={iconMoon} alt="Dark theme" />
        </div>
      </section>
    </>
  );
}
