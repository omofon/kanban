import { useBoard } from "../context/BoardContext";

export default function BoardCanvas() {
  const { activeBoard, hasColumns } = useBoard();

  return (
    <div className="h-full">
      {hasColumns ? (
        // <div className="flex gap-6 h-full w-max">
        //   {/* columns will go here */}
        //   {activeBoard.columns.map((column) => (
        //     <div key={column.id} className="w-[280px] shrink-0">
        //       {column.name}
        //     </div>
        //   ))}
        // </div>
        <div></div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center gap-6">
          <p className="text-ink-muted heading-l text-center">
            This board is empty. Create a new column to get started.
          </p>
          <button className="px-6 py-4 bg-brand hover:bg-brand-hover text-ink-white heading-m rounded-full transition-colors cursor-pointer">
            + Add New Column
          </button>
        </div>
      )}
    </div>
  );
}
