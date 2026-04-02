import { useTheme } from "../hooks/useTheme";
import BoardIcon from "../ui/BoardIcon";

export default function Sidebar({
  boards,
  activeBoardId,
  onSelectBoard,
  onCreateBoard,
}) {
  const { isDark, toggle } = useTheme();

  return (
    <aside
      className="
      w-[261px] lg:w-[300px] shrink-0
      h-full bg-surface border-r border-edge
      hidden md:flex flex-col justify-between
    "
    >
      {/* Board list */}
      <nav className="flex flex-col pt-4">
        <p className="text-ink-muted px-6 lg:px-8 mb-4 tracking-[2.4px] text-xs font-bold uppercase">
          All Boards ({boards.length})
        </p>

        <ul>
          {boards.map((board) => {
            const isActive = board.id === activeBoardId;
            return (
              <li key={board.id}>
                <button
                  onClick={() => onSelectBoard(board.id)}
                  className={`
                    w-full flex items-center gap-3
                    h-12 pl-6 lg:pl-8 pr-6
                    rounded-r-full cursor-pointer
                    transition-colors duration-150
                    ${
                      isActive
                        ? "bg-brand text-ink-white"
                        : "text-ink-muted hover:bg-brand-subtle hover:text-brand"
                    }
                  `}
                >
                  <BoardIcon active={isActive} />
                  <span className="font-bold text-[15px]">{board.name}</span>
                </button>
              </li>
            );
          })}

          {/* Create new board */}
          <li>
            <button
              onClick={onCreateBoard}
              className="
                w-full flex items-center gap-3
                h-12 pl-6 lg:pl-8 pr-6
                rounded-r-full cursor-pointer
                text-brand font-bold text-[15px]
                hover:bg-brand-subtle transition-colors duration-150
              "
            >
              <BoardIcon create />+ Create New Board
            </button>
          </li>
        </ul>
      </nav>

      {/* Bottom — theme toggle + hide sidebar */}
      <div className="pb-8 flex flex-col gap-2">
        {/* Theme toggle */}
        <div className="mx-4 lg:mx-6 bg-canvas rounded-full flex items-center justify-center gap-6 py-3">
          {/* Sun */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="text-ink-muted"
          >
            <path
              d="M9 13.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M9 1.5v1.125M9 15.375V16.5M1.5 9h1.125M15.375 9H16.5M3.698 3.698l.795.795M13.507 13.507l.795.795M3.698 14.302l.795-.795M13.507 4.493l.795-.795"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Toggle pill */}
          <button
            onClick={toggle}
            className="relative w-10 h-5 bg-brand rounded-full cursor-pointer transition-colors duration-200"
          >
            <span
              className={`
              absolute top-0.5 w-4 h-4 bg-white rounded-full
              transition-transform duration-200
              ${isDark ? "translate-x-5" : "translate-x-0.5"}
            `}
            />
          </button>

          {/* Moon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-ink-muted"
          >
            <path
              d="M6 2a6 6 0 1 0 8 8 4.5 4.5 0 0 1-8-8Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Hide sidebar */}
        <button className="flex items-center gap-3 pl-6 lg:pl-8 h-12 text-ink-muted hover:text-brand hover:bg-brand-subtle rounded-r-full transition-colors duration-150 cursor-pointer">
          <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
            <path
              d="M8.533 1H1.467A1.467 1.467 0 0 0 0 2.467v11.066A1.467 1.467 0 0 0 1.467 15H8.533A1.467 1.467 0 0 0 10 13.533V2.467A1.467 1.467 0 0 0 8.533 1Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M13 5l3 3-3 3M10 8h6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-bold text-[15px]">Hide Sidebar</span>
        </button>
      </div>
    </aside>
  );
}
