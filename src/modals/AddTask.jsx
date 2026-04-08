import { useState } from "react";
import { useBoard } from "../context/BoardContext";
import { generateId } from "../utils";

export default function AddTask({ isOpen, onClose }) {
  const { activeBoard, addTask } = useBoard();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(activeBoard?.columns[0]?.name ?? "");
  const [subtasks, setSubtasks] = useState([
    { id: generateId(), value: "", error: false },
  ]);
  const [titleError, setTitleError] = useState(false);

  if (!isOpen) return null;

  // --- Subtask helpers --- //

  const handleAddSubtask = () => {
    setSubtasks((prev) => [
      ...prev,
      { id: generateId(), value: "", error: false },
    ]);
  };

  const handleSubtaskChange = (id, value) => {
    setSubtasks((prev) =>
      prev.map((subtask) =>
        subtask.id !== id ? subtask : { ...subtask, value, error: false },
      ),
    );
  };

  const handleRemoveSubtask = (id) => {
    setSubtasks((prev) => prev.filter((subtask) => subtask.id !== id));
  };

  // --- Submit --- //

  const handleSubmit = () => {
    // Validate title
    const isTitleEmpty = title.trim() === "";
    setTitleError(isTitleEmpty);

    // Validate subtasks
    const validatedSubtasks = subtasks.map((subtask) => ({
      ...subtask,
      error: subtask.value.trim() === "",
    }));
    setSubtasks(validatedSubtasks);

    const hasSubtaskErrors = validatedSubtasks.some((s) => s.error);

    if (isTitleEmpty || hasSubtaskErrors) return;

    addTask(
      title.trim(),
      description.trim(),
      status,
      subtasks.map((s) => s.value.trim()),
    );

    onClose();
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
        {/* Heading */}
        <span className="heading-l text-ink">Add New Task</span>

        {/* Title */}
        <section className="flex flex-col gap-2">
          <label className="body-m text-ink-muted" htmlFor="task-title">
            Title
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
            placeholder="e.g. Take coffee break"
            className={`w-full bg-surface border rounded-md px-4 py-2 body-l text-ink
              outline-none placeholder:text-ink-muted/40 focus:border-brand transition-colors
              ${titleError ? "border-red" : "border-edge"}`}
          />
          {titleError && (
            <span className="body-l text-red">Can't be empty</span>
          )}
        </section>

        {/* Description */}
        <section className="flex flex-col gap-2">
          <label className="body-m text-ink-muted" htmlFor="task-description">
            Description
          </label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            rows={4}
            className="w-full bg-surface border border-edge rounded-md px-4 py-2 body-l text-ink
              outline-none placeholder:text-ink-muted/40 focus:border-brand resize-none transition-colors"
          />
        </section>

        {/* Subtasks */}
        <section className="flex flex-col gap-2">
          <span className="body-m text-ink-muted">Subtasks</span>

          <ul className="flex flex-col gap-3">
            {subtasks.map((subtask) => (
              <li key={subtask.id} className="flex items-center gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={subtask.value}
                    onChange={(e) =>
                      handleSubtaskChange(subtask.id, e.target.value)
                    }
                    placeholder="e.g. Make coffee"
                    className={`w-full bg-surface border rounded-md px-4 py-2 body-l text-ink
                      outline-none placeholder:text-ink-muted/40 focus:border-brand transition-colors
                      ${subtask.error ? "border-red" : "border-edge"}`}
                  />
                  {subtask.error && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 body-l text-red whitespace-nowrap">
                      Can't be empty
                    </span>
                  )}
                </div>

                {/* Remove subtask */}
                <button
                  onClick={() => handleRemoveSubtask(subtask.id)}
                  className="cursor-pointer shrink-0 text-ink-muted hover:text-red transition-colors"
                  aria-label="Remove subtask"
                >
                  <svg
                    width="15"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="currentColor" fillRule="evenodd">
                      <path d="M12.728 0l2.122 2.122L2.122 14.85 0 12.728z" />
                      <path d="M0 2.122L2.122 0 14.85 12.728l-2.122 2.122z" />
                    </g>
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleAddSubtask}
            className="w-full mt-1 py-2 rounded-full bg-brand/10 text-brand body-l
              hover:bg-brand/20 transition-colors cursor-pointer"
          >
            + Add New Subtask
          </button>
        </section>

        {/* Status */}
        <section className="flex flex-col gap-2">
          <span className="body-m text-ink-muted">Status</span>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-surface border border-edge rounded-md px-4 py-3 body-l text-ink
                cursor-pointer outline-none focus:border-brand appearance-none"
            >
              {activeBoard?.columns.map((column) => (
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

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded-full bg-brand text-white body-l
            hover:bg-brand-hover transition-colors cursor-pointer"
        >
          Create Task
        </button>
      </article>
    </div>
  );
}
