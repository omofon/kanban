import { useDroppable } from "@dnd-kit/react";
import TaskCard from "./TaskCard";

export default function BoardColumn({ column }) {
  const { ref } = useDroppable({ id: column.id });

  const columnIcon = {
    Todo: "bg-todo",
    Doing: "bg-doing",
    Done: "bg-done",
  };

  return (
    <section
      key={column.id}
      className="w-70 shrink-0 flex flex-col gap-6 items-start"
    >
      {/* Column header */}
      <div className="flex gap-3">
        <div
          className={`w-3.75 h-3.75 rounded-full ${columnIcon?.[column.name] ?? "bg-todo"}`}
        />
        <h2 className="text-ink-muted heading-s uppercase">
          {column?.name} ({column?.tasks?.length ?? 0})
        </h2>
      </div>

      {/* Tasks */}
      <ul ref={ref} className="flex flex-col gap-5 w-full">
        {column.tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} />
        ))}
      </ul>
    </section>
  );
}
