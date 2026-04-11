import { useSortable } from "@dnd-kit/sortable";
import { useUI } from "../context/UIContext";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task }) {
  const { openModal } = useUI();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
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
