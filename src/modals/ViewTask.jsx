import { useState } from "react";
import { useBoard } from "../context/BoardContext";
import { useUI } from "../context/UIContext";

export default function ViewTask({ isOpen, onClose, task }) {
  const { activeBoard, moveTask, toggleSubtask } = useBoard();
  const { openModal } = useUI();
  const [status, setStatus] = useState(task.status);
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

  if (!isOpen) return null;

  const completedCount = subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;

  const handleToggle = (index) => {
    toggleSubtask(task.id, index);
    setSubtasks((prev) =>
      prev.map((subtask, i) =>
        i === index
          ? { ...subtask, isCompleted: !subtask.isCompleted }
          : subtask,
      ),
    );
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
        {/* Title + ellipsis */}
        <div className="w-full flex gap-6 items-center justify-between">
          <span className="heading-l text-ink">{task.title}</span>

          <div className="relative">
            <button
              onClick={() => setIsActionMenuOpen((prev) => !prev)}
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

            {/* Action menu for task */}
            {isActionMenuOpen && (
              <section className="absolute top-8 right-0 w-48 bg-surface rounded-lg z-50 shadow-lg p-4 space-y-4">
                <button
                  onClick={() => openModal("editTask", { task })}
                  className="text-left w-full rounded-md text-ink-muted body-l
                    cursor-pointer transition-colors duration-150 hover:text-brand"
                >
                  Edit Task
                </button>
                <button
                  onClick={() => openModal("deleteTask", { task })}
                  className="text-left w-full rounded-md text-danger body-l
                    cursor-pointer transition-colors duration-150 hover:text-danger-hover"
                >
                  Delete Task
                </button>
              </section>
            )}
          </div>
        </div>

        {/* Description */}
        <span className="body-l text-ink-muted">{task.description}</span>

        {/* Subtasks */}
        <section className="w-full flex flex-col">
          <span className="body-m text-ink mb-4">
            Subtasks ({completedCount} of {task.subtasks.length})
          </span>
          <ul className="flex flex-col gap-2">
            {subtasks.map((subtask, index) => (
              <li
                key={index}
                onClick={() => handleToggle(index)}
                className="flex items-center gap-4 bg-canvas p-3 rounded cursor-pointer hover:bg-brand/10 transition-colors"
              >
                <input
                  type="checkbox"
                  name={subtask.title}
                  checked={subtask.isCompleted}
                  onChange={() => handleToggle(index)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 accent-brand cursor-pointer"
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
                stroke="#635FC7"
                strokeWidth="2"
                fill="none"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </div>
        </section>
      </article>
    </div>
  );
}
