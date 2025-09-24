"use client";

import { FormEvent, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTaskStore } from "../store/useTaskStore";
import { TaskItem } from "./TaskItem";

export default function TasksList() {
  // Get tasks and actions from Zustand store
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const removeTask = useTaskStore((state) => state.removeTask);
  const reorderTasks = useTaskStore((state) => state.reorderTasks);

  // Local state for draft task text
  const [draft, setDraft] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (draft.trim()) {
      addTask(draft);
      setDraft(""); // Clear draft after adding
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-[26rem] w-full max-w-xl flex-col rounded-3xl bg-slate-50 p-6 shadow-2xl">
        <header className="mb-4">
          <h2 className="text-xl font-semibold text-slate-700">Tasks</h2>
          <p className="text-sm text-slate-500">
            What are your plans? (drag to reorder)
          </p>
        </header>

        {/* TasksList */}
        <div className="flex-1 overflow-y-auto pr-2">
          <ul className="space-y-3">
            {tasks.map((task, index) => (
              <li key={task.id}>
                <TaskItem
                  task={task}
                  index={index}
                  moveTask={reorderTasks}
                  toggleTask={toggleTask}
                  removeTask={removeTask}
                />
              </li>
            ))}
          </ul>

          {/* Empty List State */}
          {tasks.length === 0 && (
            <p className="rounded-2xl bg-white p-4 text-center text-sm text-slate-400">
              Nothing here yet - add your first task below.
            </p>
          )}
        </div>

        {/* Input Field to Add New Tasks */}
        <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Add a new task..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            {draft.trim().length > 0 && (
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-indigo-500 p-2 text-white shadow transition hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                aria-label="Add task"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path d="M2.94 2.94a1.5 1.5 0 0 1 1.53-.37l12.03 3.87a1.5 1.5 0 0 1 .07 2.84l-5.33 1.97a.5.5 0 0 0-.3.3l-1.97 5.33a1.5 1.5 0 0 1-2.84-.07L2.57 4.47a1.5 1.5 0 0 1 .37-1.53z" />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </DndProvider>
  );
}
