import { useState } from "react";
import Header from "../src/layout/Header";
import Sidebar from "../src/layout/Sidebar";
import data from "./data.json";

export default function App() {
  const [activeBoardId, setActiveBoardId] = useState(data.boards[0]?.id);

  const activeBoard = data.boards.find((b) => b.id === activeBoardId);
  const hasColumns = activeBoard?.columns?.length > 0;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header
        boardName={activeBoard?.name}
        onAddTask={() => {}}
        hasColumns={hasColumns}
      />

      <main className="flex flex-1 overflow-hidden">
        <Sidebar
          boards={data.boards}
          activeBoardId={activeBoardId}
          onSelectBoard={setActiveBoardId}
          onCreateBoard={() => {}}
        />

        {/* Board canvas */}
        <div className="flex-1 bg-canvas overflow-auto p-6">
          {!hasColumns && (
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
      </main>
    </div>
  );
}
