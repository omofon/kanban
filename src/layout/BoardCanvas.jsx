import { DragDropProvider } from "@dnd-kit/react";
import { useBoard } from "../context/BoardContext";
import { useUI } from "../context/UIContext";
import BoardColumn from "../ui/BoardColumn";

export default function BoardCanvas() {
  const { activeBoard, hasColumns } = useBoard();
  const { openModal } = useUI();

  const handleDragEnd = (event) => {
    if (event.canceled) return;

    const { source, target } = event.operation;
    if (!target) return;

    // Find which column the dragged task came from
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
        <DragDropProvider onDragEnd={handleDragEnd}>
          <div className="flex gap-6 h-full w-max">
            {activeBoard.columns.map((column) => (
              <BoardColumn key={column.id} column={column} />
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
        </DragDropProvider>
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
