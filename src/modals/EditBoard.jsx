import { useState } from "react";
import { useBoard } from "../context/BoardContext";

export default function EditBoard({ isOpen, onClose }) {
  const { updateBoard, activeBoard } = useBoard();

  const [name, setName] = useState(activeBoard.name);
  const [nameError, setNameError] = useState(false);

  if (!isOpen) return null;

  function validate() {
    const isEmpty = name.trim() === "";
    setNameError(isEmpty);
    return !isEmpty;
  }

  const handleSubmit = () => {
    if (!validate()) return;

    const newBoard = {
      name: name,
    };
    updateBoard(newBoard);

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
        className="bg-surface rounded-lg w-full max-w-120 p-6 md:p-8 shadow-lg
          flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="heading-l text-ink">Create New Board</span>

        {/* Board name */}
        <section className="flex flex-col gap-2">
          <div className="flex justify-between">
            <label className="body-m text-ink-muted" htmlFor="task-name">
              Name
            </label>
            {nameError && (
              <span className="body-l text-danger text-right">
                Can't be empty
              </span>
            )}
          </div>
          <input
            id="task-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(false);
            }}
            placeholder="e.g. School Study"
            className={`w-full bg-surface border rounded-md px-4 py-2 body-l text-ink
              outline-none placeholder:text-ink-muted/40 focus:border-brand transition-colors
              ${nameError ? "border-danger" : "border-edge"}`}
          />
        </section>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded-full bg-brand text-white body-l
            hover:bg-brand-hover transition-colors cursor-pointer"
        >
          Save Changes
        </button>
      </article>
    </div>
  );
}
