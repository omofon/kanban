import { useBoard } from "../context/BoardContext";

export default function DeleteTask({ isOpen, onClose, task }) {
  const { deleteTask } = useBoard();

  if (!isOpen) return null;

  return (
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
        <span className="heading-l text-danger">Delete this task?</span>
        <span className="body-l text-ink-muted">
          Are you sure you want to delete the '{task.title}’ task? This action
          will remove task and subtasks and cannot be reversed.
        </span>
        <div className="flex gap-6 w-full justify-start items-center">
          <button
            onClick={() => {
              deleteTask(task.status, task.id);
              onClose();
            }}
            className="w-full py-2 rounded-full bg-danger text-white body-l
            hover:bg-danger-hover transition-colors cursor-pointer"
          >
            Delete
          </button>

          <button
            onClick={() => {
              onClose();
            }}
            className="w-full py-2 rounded-full bg-white text-brand body-l
            hover:bg-menu-hover transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </article>
    </div>
  );
}
