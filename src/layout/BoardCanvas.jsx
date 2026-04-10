import { useBoard } from "../context/BoardContext";
import { useUI } from "../context/UIContext";

export default function BoardCanvas() {
  const { activeBoard, hasColumns } = useBoard();
  const { openModal } = useUI();

  const columnIcon = {
    Todo: "bg-todo",
    Doing: "bg-doing",
    Done: "bg-done",
  };

  const pickRandomColour = () => {
    const index = Math.floor(Math.random() * columnIcon.length );
    return columnIcon.at(index)
  };

  return (
    <div className="h-full">
      {hasColumns ? (
        <div className="flex gap-6 h-full w-max">
          {activeBoard.columns.map((column) => (
            <section
              key={column.id}
              className="w-70 shrink-0 flex flex-col gap-6 items-start"
            >
              {/* Column header */}
              <div className="flex gap-3">
                <div
                  className={`w-3.75 h-3.75 rounded-full ${columnIcon?.[column.name] ?? pickRandomColour()}`}
                />
                <h2 className="text-ink-muted heading-s uppercase">
                  {column?.name} ({column?.tasks?.length ?? 0})
                </h2>
              </div>

              {/* Tasks */}
              <ul className="flex flex-col gap-5 w-full">
                {column.tasks.map((task) => (
                  <li key={task.id}>
                    <button
                      onClick={() => openModal("viewTask", { task })}
                      className="bg-surface w-full px-4 py-6 rounded-lg shadow-lg flex flex-col gap-2 text-left cursor-pointer group"
                    >
                      <span className="heading-m text-ink group-hover:text-brand transition-colors duration-150">
                        {task.title}
                      </span>
                      <span className="body-m text-ink-muted">
                        {
                          task.subtasks.filter((subtask) => subtask.isCompleted)
                            .length
                        }{" "}
                        of {task.subtasks.length} subtasks
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
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
