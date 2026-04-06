import { useTheme } from "../hooks/useTheme";

import iconMoon from "../assets/icon-dark-theme.svg";
import iconSun from "../assets/icon-light-theme.svg";

export default function Sidebar({
  isOpen,
  onHide,
  boards,
  activeBoardId,
  onSelectBoard,
  onCreateBoard,
}) {
  const { isDark, toggle } = useTheme();

  const boardIcon = (
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <aside
      className={`
      w-[261px] lg:w-[300px] shrink-0 py-8
      h-full bg-surface border-r border-edge
      hidden md:flex flex-col justify-between items-start
      transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      {/* Board list */}
      <nav className="flex flex-col w-60 lg:w-69 ">
        <p className="text-ink-muted px-6 lg:px-8 mb-4 heading-s uppercase">
          All Boards ({boards.length})
        </p>

        <ul className="w-full space-y-1">
          {boards.map((board) => {
            const isActive = board.id === activeBoardId;
            return (
              <li key={board.id}>
                <button
                  onClick={() => onSelectBoard(board.id)}
                  className={`
                    w-full flex items-center justify-start gap-4
                    h-11 pl-6 lg:pl-8 pr-6
                    rounded-r-full cursor-pointer
                    transition-colors duration-150 hover:bg-menu-hover hover:text-brand
                    ${isActive ? "bg-brand text-ink-white" : "text-ink-muted"}
                  `}
                >
                  {boardIcon}
                  <span className="heading-m tracking-wide">{board.name}</span>
                </button>
              </li>
            );
          })}

          {/* Create new board */}
          <li>
            <button
              onClick={onCreateBoard}
              className="
                w-full flex items-center justify-s gap-3
                h-11 pl-6 lg:pl-8 pr-6
                rounded-r-full cursor-pointer
                text-brand heading-m tracking-wide
                hover:bg-menu-hover transition-colors duration-150
              "
            >
              {boardIcon}+ Create New Board
            </button>
          </li>
        </ul>
      </nav>

      {/* Bottom — theme toggle + hide sidebar */}
      <div className="flex flex-col gap-2 w-full">
        {/* Theme toggle */}
        <div className="h-12 w-60 mx-auto bg-canvas rounded-lg flex items-center justify-center gap-6">
          {/* Sun */}
          <img src={iconSun} alt="Light theme icon" />

          {/* Toggle pill */}
          <button
            onClick={toggle}
            className="relative w-10 h-5 bg-brand rounded-full cursor-pointer transition-colors duration-200"
          >
            <span
              className={`
              absolute top-0.75 w-3.5 h-3.5 bg-white rounded-full
              transition-transform duration-200
              ${isDark ? "-translate-x-4.25" : "translate-x-0.75"}
            `}
            />
          </button>

          {/* Moon */}
          <img src={iconMoon} alt="Dark theme icon" />
        </div>

        {/* Hide sidebar */}
        <button
          className="w-60 lg:w-69 flex items-center justify-start gap-4
                    h-11 pl-6 lg:pl-8 pr-6
                    rounded-r-full cursor-pointer
                    transition-colors duration-150 text-ink-muted hover:bg-menu-hover hover:text-brand"
          onClick={onHide}
        >
          <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
              fill="currentColor"
            />
          </svg>
          <span className="heading-m tracking-wide">Hide Sidebar</span>
        </button>
      </div>
    </aside>
  );
}
