import { useBoard } from "../context/BoardContext";

import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import { useState } from "react";

export default function ViewTask({ isOpen, onClose, task }) {
  const { activeBoard } = useBoard();
  const [subtasks, setSubtasks] = useState(task.subtasks);

  if (!isOpen) return null;

  const completedCount = subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;

  const toggleSubtask = (index) => {
    setSubtasks((prev) =>
      prev.map((subtask, i) =>
        i === index
          ? { ...subtask, isCompleted: !subtask.isCompleted }
          : subtask,
      ),
    );
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Modal */}
      <article
        className="bg-surface rounded-lg w-full max-w-120 p-6 md:p-8 shadow-lg flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <div className="w-full flex gap-6 items-center">
          <span className="heading-l text-ink">{task.title}</span>
          <button
            onClick={() => {}}
            className="cursor-pointer p-1 rounded-full"
          >
            <img src={ellipsis} alt="Open menu" />
          </button>
        </div>

        {/* Description */}
        <span className="body-l text-ink-muted">{task.description}</span>

        {/* Subtasks */}
        <section className="w-full flex-col">
          <span className="body-m text-ink-muted mb-4">
            Subtasks ({completedCount}
            of {task.subtasks.length})
          </span>
          <ul className="flex flex-col gap-2">
            {subtasks.map((subtask, index) => (
              <li
                key={index}
                onClick={() => toggleSubtask(index)}
                className="flex items-center gap-4 bg-canvas p-3 rounded cursor-pointer hover:bg-brand-hover transition-colors"
              >
                <input
                  type="checkbox"
                  name={subtask.title}
                  checked={subtask.isCompleted}
                  onChange={() => toggleSubtask(index)}
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
        
      </article>
    </div>
  );
}
