import { useSortable } from "@dnd-kit/react/sortable";
import { useUI } from "../context/UIContext";

export default function TaskCard({ task, index }) {
  const { openModal } = useUI();
  const { taskRef } = useSortable({
    id: task.id,
    index,
  });
  return (
    <li ref={taskRef}>
      <button
        onClick={() => openModal("viewTask", { task })}
        className="bg-surface w-full px-4 py-6 rounded-lg shadow-lg flex flex-col gap-2 text-left cursor-pointer group"
      >
        <span className="heading-m text-ink group-hover:text-brand transition-colors duration-150">
          {task.title}
        </span>
        <span className="body-m text-ink-muted">
          {task.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
          {task.subtasks.length} subtasks
        </span>
      </button>
    </li>
  );
}
