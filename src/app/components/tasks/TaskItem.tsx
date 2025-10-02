"use client";

import { useDraggable } from "@dnd-kit/core";
import { Task } from "../../store/useTaskStore";

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  listName: string;
}

export const TaskItem = ({
  task,
  index,
  toggleTask,
  removeTask,
  listName,
}: TaskItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: {
        type: "task",
        task,
        index,
        list: listName,
      },
    });

  // Format date for display
  const formatDisplayDate = (date: Date) =>
    date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 rounded-lg bg-white p-2 shadow-lg ring-1 ring-slate-100 hover:ring-indigo-200 ${
        isDragging ? "opacity-80 cursor-grabbing shadow-md" : ""
      }`}

    >
      {/* Compact drag handle */}
      <div 
        {...listeners}
        {...attributes}
        className="cursor-grab flex items-center justify-center w-3 h-3 text-slate-400 hover:text-slate-600 flex-shrink-0">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <circle cx="3" cy="3" r="2" />
          <circle cx="9" cy="3" r="2" />
          <circle cx="3" cy="9" r="2" />
          <circle cx="9" cy="9" r="2" />
        </svg>
      </div>

      {/* Compact checkbox */}
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => toggleTask(task.id)}
        className="h-3 w-3 rounded border-slate-300 text-indigo-500 focus:ring-indigo-400 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Compact content */}
      <div className="flex-1 min-w-0">
        <p
          className={`select-all text-xs font-mediu  truncate ${
            task.done ? "line-through text-slate-400" : "text-slate-700"
          }`}
        >
          {task.title}
        </p>
        <p className="text-[10px] text-slate-400 truncate">
          {formatDisplayDate(task.createdAt)}
        </p>
      </div>

      {/* Compact delete button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          removeTask(task.id);
        }}
        className="text-slate-400 hover:text-red-500 transition-colors p-0.5 flex-shrink-0"
        aria-label="Delete task"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path
            fillRule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </button>
    </div>
  );
};
