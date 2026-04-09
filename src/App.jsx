import { useState } from "react";

import BoardProvider from "./context/BoardContext";

import Header from "../src/layout/Header";
import Sidebar from "../src/layout/Sidebar";
import ShowSidebarButton from "./ui/ShowSidebarButton";
import BoardCanvas from "./layout/BoardCanvas";
import UIProvider from "./context/UIContext";
import ModalManager from "./modals/ModalManager";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <BoardProvider>
      <UIProvider>
        <div className="flex flex-col h-screen overflow-hidden">
          <Header
            isSidebarOpen={isSidebarOpen}
            onHide={() => setIsSidebarOpen(false)}
          />
          <main className="flex flex-1 overflow-hidden">
            <Sidebar
              isOpen={isSidebarOpen}
              onHide={() => setIsSidebarOpen(false)}
            />
            <section className="flex-1 bg-canvas overflow-auto p-6">
              <ShowSidebarButton
                isSidebarOpen={isSidebarOpen}
                onShow={() => setIsSidebarOpen(true)}
              />
              <BoardCanvas />
            </section>
          </main>
        </div>
        <ModalManager />
      </UIProvider>
    </BoardProvider>
  );
}
