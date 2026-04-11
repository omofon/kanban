import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useBoard } from "../context/BoardContext";
import { useUI } from "../context/UIContext";
import TaskCard from "../ui/TaskCard";

export default function BoardCanvas() {
  const { activeBoard, hasColumns } = useBoard();
  const { openModal } = useUI();

  const columnIcon = {
    Todo: "bg-todo",
    Doing: "bg-doing",
    Done: "bg-done",
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const handleDragEnd = (event) => {
    if (event.canceled) return;

    const { source, target } = event.operation;
    if (!target) return;

    // Find source and target columns
    const sourceColumn = activeBoard.columns.find((col) =>
      col.tasks.some((t) => t.id === source.id),
    );

    // Find which column it was dropped into
    const targetColumn = activeBoard.columns.find(
      (col) => col.id === target.id,
    );

    if (!sourceColumn || !targetColumn) return;

    if (sourceColumn.id === targetColumn.id) {
      // Same column — reorder
      const fromIndex = sourceColumn.tasks.findIndex((t) => t.id === source.id);
      const toIndex = event.operation.targetIndex ?? fromIndex;
      reorderTask(sourceColumn.id, fromIndex, toIndex);
    } else {
      // Different column — move and update status
      moveTask(source.id, targetColumn.name);
    }
  };

  return (
    <div className="h-full">
      {hasColumns ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 h-full w-max">
            {activeBoard.columns.map((column) => (
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

                {/* Sortable Tasks */}
                <SortableContext
                  items={column.tasks.map((t) => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <ul className="flex flex-col gap-5 w-full min-h-10">
                    {column.tasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </ul>
                </SortableContext>
              </section>
            ))}

            {/* New Column Button */}
            <button
              onClick={() => openModal("addColumn")}
              className="w-70 shrink-0 my-10 rounded-lg cursor-pointer
                flex items-center justify-center
              bg-lines-light dark:bg-lines-dark
              text-ink-muted hover:text-brand transition-colors duration-150"
            >
              <span className="heading-xl">+ New Column</span>
            </button>
          </div>
        </DndContext>
      ) : (
        <div className="h-full flex flex-col items-center justify-center gap-6">
          <p className="text-ink-muted text-lg font-bold text-center">
            This board is empty. Create a new column to get started.
          </p>
          <button
            onClick={() => openModal("addColumn")}
            className="px-6 py-4 bg-brand hover:bg-brand-hover text-ink-white font-bold rounded-full transition-colors cursor-pointer"
          >
            + Add New Column
          </button>
        </div>
      )}
    </div>
  );
}
