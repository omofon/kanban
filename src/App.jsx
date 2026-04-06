import { useState } from "react";

import BoardProvider from "./context/BoardContext";
import Header from "../src/layout/Header";
import Sidebar from "../src/layout/Sidebar";
import ShowSidebarButton from "./ui/ShowSidebarButton";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <BoardProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header
          isSidebarOpen={isSidebarOpen}
          boardName={activeBoard?.name}
          onAddTask={() => {}}
          hasColumns={hasColumns}
        />

        <main className="flex flex-1 overflow-hidden">
          <Sidebar
            isOpen={isSidebarOpen}
            onHide={() => setIsSidebarOpen(false)}
            boards={data.boards}
            activeBoardId={activeBoardId}
            onSelectBoard={setActiveBoardId}
            onCreateBoard={() => {}}
          />

          {/* Board canvas */}
          <section className="flex-1 bg-canvas overflow-auto p-6">
            <ShowSidebarButton
              isSidebarOpen={isSidebarOpen}
              onShow={() => setIsSidebarOpen(true)}
            />
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
          </section>
        </main>
      </div>
    </BoardProvider>
  );
}
