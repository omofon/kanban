import { useBoard } from "../context/BoardContext";

export default function BoardCanvas() {
  const { hasColumns } = useBoard();
  return (
    //         {!hasColumns && (
    //   <div className="h-full flex flex-col items-center justify-center gap-6">
    //     <p className="text-ink-muted text-lg font-bold text-center">
    //       This board is empty. Create a new column to get started.
    //     </p>
    //     <button className="px-6 py-4 bg-brand hover:bg-brand-hover text-ink-white font-bold rounded-full transition-colors cursor-pointer">
    //       + Add New Column
    //     </button>
    //   </div>
    // )}
    <></>
  );
}
