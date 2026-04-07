import { useBoard } from "../context/BoardContext";

import ellipsis from "../assets/icon-vertical-ellipsis.svg";

export default function ViewTask({ isOpen, onClose, task }) {
  const { activeBoard } = useBoard();

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Modal */}
      <article
        className="bg-surface rounded-lg w-full max-w-120 p-6 md:p-8 shadow-lg
        flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex gap-6 items-center">
          <span className="heading-l text-ink">{task.title}</span>
          <button
            onClick={() => {}}
            className="cursor-pointer p-1 rounded-full"
          >
            <img src={ellipsis} alt="Board options" />
          </button>
        </div>
        <span className="body-l text-ink-muted">{task.description}</span>
      </article>
    </div>
  );
}
