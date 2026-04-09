import { createContext, useContext, useState, useEffect } from "react";
import data from "../data.json";
import { generateId } from "../utils";

const BoardContext = createContext();

export default function BoardProvider({ children }) {
  const [boards, setBoards] = useState(
    () => JSON.parse(localStorage.getItem("boards")) ?? data.boards,
  );
  const [activeBoardId, setActiveBoardId] = useState(boards[0]?.id);

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  const activeBoard = boards.find((board) => board.id === activeBoardId);
  const hasColumns = activeBoard?.columns?.length > 0;

  // --- Board functions --- //

  const addBoard = (newBoard = {}) => {
    setBoards((prev) => {
      if (prev.length >= 10) return prev;
      if (prev.some((board) => board.name === newBoard.name)) return prev;

      return [...prev, newBoard];
    });
  };

  const updateBoard = (updatedFields) => {
    setBoards((prev) =>
      prev.map((board) =>
        board.id !== activeBoardId ? board : { ...board, ...updatedFields },
      ),
    );
  };

  const deleteBoard = () => {
    setBoards((prev) => prev.filter((board) => board.id !== activeBoardId));

    // Switch active board to first remaining board after deletion
    setActiveBoardId((prev) => {
      const remaining = boards.filter((board) => board.id !== activeBoardId);
      return remaining[0]?.id ?? null;
    });
  };

  // --- Column functions --- //

  const addColumn = (columnName) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id !== activeBoardId) return board;
        return {
          ...board,
          columns: [
            ...(board.columns ?? []),
            { name: columnName, id: generateId(6), tasks: [] },
          ],
        };
      }),
    );
  };

  // --- Task functions --- //

  const addTask = (newTitle, newDescription, newStatus, newSubtasks) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id !== activeBoardId) return board;
        return {
          ...board,
          columns: board.columns.map((column) => {
            if (column.name !== newStatus) return column;
            return {
              ...column,
              tasks: [
                ...column.tasks,
                {
                  title: newTitle,
                  description: newDescription,
                  status: newStatus,
                  id: generateId(),
                  subtasks: newSubtasks.map((subtaskTitle) => ({
                    title: subtaskTitle,
                    isCompleted: false,
                  })),
                },
              ],
            };
          }),
        };
      }),
    );
  };

  const updateTask = (
    taskId,
    newTitle,
    newDescription,
    newStatus,
    newSubtasks,
  ) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id !== activeBoardId) return board;
        return {
          ...board,
          columns: board.columns.map((column) => ({
            ...column,
            tasks: column.tasks.map((task) => {
              if (task.id !== taskId) return task;
              return {
                ...task,
                title: newTitle,
                description: newDescription,
                status: newStatus,
                subtasks: newSubtasks.map((subtask) => ({
                  title: subtask.title,
                  isCompleted: subtask.isCompleted ?? false,
                })),
              };
            }),
          })),
        };
      }),
    );

    const currentTask = activeBoard?.columns
      .flatMap((col) => col.tasks)
      .find((t) => t.id === taskId);

    if (currentTask && currentTask.status !== newStatus) {
      moveTask(taskId, newStatus);
    }
  };

  const deleteTask = (columnName, taskId) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id !== activeBoard.id) return board;
        return {
          ...board,
          columns: board.columns.map((column) => {
            if (column.name !== columnName) return column;
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            };
          }),
        };
      }),
    );
  };

  const moveTask = (taskId, newStatus) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id !== activeBoard.id) return board;

        let taskToMove = null;

        const updatedColumns = board.columns.map((col) => {
          const found = col.tasks.find((t) => t.id === taskId);
          if (found) {
            taskToMove = { ...found, status: newStatus };
            return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
          }
          return col;
        });

        if (!taskToMove) return board;

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
        addBoard,
        updateBoard,
        deleteBoard,
        addColumn,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        toggleSubtask,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export const useBoard = () => useContext(BoardContext);
