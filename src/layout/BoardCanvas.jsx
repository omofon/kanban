import { useBoard } from "../context/BoardContext";

export default function BoardCanvas() {
  const { activeBoard, hasColumns } = useBoard();

  const columnIcon = {
    Todo: "bg-todo",
    Doing: "bg-doing",
    Done: "bg-done",
  };

  return (
    <div className="h-full">
      {hasColumns ? (
        <div className="flex gap-6 h-full w-max p-6">
          {/* columns will go here */}
          {activeBoard.columns.map((column) => (
            <section
              key={column.id}
              className="w-70 shrink-0 flex flex-col gap-6 items-start"
            >
              <div className="flex gap-3">
                <div className={`w-3.75 h-3.75 rounded-full`}></div>
                <h2 className="text-ink-muted heading-s uppercase">
                  {column?.name} ({column?.tasks?.length ?? 0})
                </h2>
              </div>
            </section>
          ))}
        </div>
      ) : (
        // if the board doesn't have any column
        <div className="h-full flex flex-col items-center justify-center gap-6">
          <p className="text-ink-muted text-lg font-bold text-center">
            This board is empty. Create a new column to get started.
          </p>
          <button className="px-6 py-4 bg-brand hover:bg-brand-hover text-ink-white font-bold rounded-full transition-colors cursor-pointer">
            + Add New Column
          </button>
        </div>
      )}
    </div>
  );
}
