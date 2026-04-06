import { createContext, useContext, useState, useEffect } from "react";
import data from "../data.json";

const BoardContext = createContext();

export default function BoardProvider({ children }) {
  const [boards, setBoards] = useState(
    () => JSON.parse(localStorage.getItem("boards")) ?? data.boards,
  );
  const [activeBoardId, setActiveBoardId] = useState(boards[0]?.id);

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(data.boards));
  }, [boards]);

  const activeBoard = boards.find((board) => board.id === activeBoardId);
  const hasColumns = activeBoard?.columns?.length > 0;

  return (
    <BoardContext.Provider
      value={{
        boards,
        activeBoard,
        activeBoardId,
        hasColumns,
        setActiveBoardId,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export const useBoard = () => useContext(BoardContext);
