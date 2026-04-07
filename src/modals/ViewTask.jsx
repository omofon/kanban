import { useBoard } from "../context/BoardContext";
import { useState } from "react";

export default function ViewTask({ isOpen, onClose, task }) {
  const { activeBoard, moveTask, toggleSubtask } = useBoard();
  const [status, setStatus] = useState(task.status);

  if (!isOpen) return null;

  const completedCount = task.subtasks.filter((s) => s.isCompleted).length;

  const handleToggle = (index) => {
    toggleSubtask(task.id, index);
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    moveTask(task.id, newStatus);
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Modal */}
      <article
        className="bg-surface rounded-lg w-full max-w-120 p-6 md:p-8 shadow-lg flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <div className="w-full flex gap-6 items-center justify-between">
          <span className="heading-l text-ink">{task.title}</span>
          <button
            onClick={() => {}}
            className="cursor-pointer p-1 rounded-full"
          >
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fillRule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308" />
                <circle cx="2.308" cy="10" r="2.308" />
                <circle cx="2.308" cy="17.692" r="2.308" />
              </g>
            </svg>
          </button>
        </div>

        {/* Description */}
        {task.description && (
          <span className="body-l text-ink-muted">{task.description}</span>
        )}

        {/* Subtasks */}
        <section className="w-full flex flex-col gap-4">
          <span className="body-m text-ink-muted">
            Subtasks ({completedCount} of {task.subtasks.length})
          </span>
          <ul className="flex flex-col gap-2">
            {task.subtasks.map((subtask, index) => (
              <li
                key={index}
                onClick={() => handleToggle(index)}
                className="flex items-center gap-4 bg-canvas p-3 rounded-md cursor-pointer
                hover:bg-brand/25 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={subtask.isCompleted}
                  onChange={() => handleToggle(index)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 accent-brand cursor-pointer shrink-0"
                />
                <span
                  className={`body-m transition-all ${
                    subtask.isCompleted
                      ? "line-through text-ink-muted"
                      : "text-ink"
                  }`}
                >
                  {subtask.title}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Current Status */}
        <section className="w-full flex flex-col gap-2">
          <span className="body-m text-ink-muted">Current Status</span>
          <div className="relative">
            <select
              value={status}
              onChange={handleStatusChange}
              className="w-full bg-surface border border-edge rounded-md px-4 py-3 body-l text-ink
              cursor-pointer outline-none focus:border-brand appearance-none"
            >
              {activeBoard.columns.map((column) => (
                <option
                  key={column.id}
                  value={column.name}
                  className="rounded-md bg-surface text-ink"
                >
                  {column.name}
                </option>
              ))}
            </select>
            {/* Chevron */}
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              width="10"
              height="7"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1l4 4 4-4"
                stroke="#635FC7"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </section>
      </article>
    </div>
  );
}
