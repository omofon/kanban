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

  const moveTask = (taskId, newStatus) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id !== activeBoard.id) return board;

        let taskToMove = null;

        // Remove task from its current column
        const updatedColumns = board.columns.map((col) => {
          const found = col.tasks.find((t) => t.id === taskId);
          if (found) {
            taskToMove = { ...found, status: newStatus };
            return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
          }
          return col;
        });

        // Insert task into the matching column
        return {
          ...board,
          columns: updatedColumns.map((col) =>
            col.name === newStatus
              ? { ...col, tasks: [...col.tasks, taskToMove] }
              : col,
          ),
        };
      }),
    );
  };

  const toggleSubtask = (taskId, subtaskIndex) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id !== activeBoard.id) return board;
        return {
          ...board,
          columns: board.columns.map((col) => ({
            ...col,
            tasks: col.tasks.map((task) => {
              if (task.id !== taskId) return task;
              return {
                ...task,
                subtasks: task.subtasks.map((subtask, i) =>
                  i === subtaskIndex
                    ? { ...subtask, isCompleted: !subtask.isCompleted }
                    : subtask,
                ),
              };
            }),
          })),
        };
      }),
    );
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        activeBoard,
        activeBoardId,
        hasColumns,
        setActiveBoardId,
        moveTask,
        toggleSubtask,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export const useBoard = () => useContext(BoardContext);
