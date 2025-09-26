import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define task type
export type Task = {
  id: string;
  title: string;
  createdAt: Date;
  done: boolean;
  assignedDay: string;
};

// Define store state and actions
interface TaskState {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (taskId: string) => void;
  removeTask: (taskId: string) => void;
  reorderTasks: (dragIndex: number, hoverIndex: number) => void; // Add this
}

// Helper function to create a new task
const createTask = (title: string): Task => ({
  id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  title,
  createdAt: new Date(),
  done: false,
  assignedDay: "default"
});

// Create the store with persistence
export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (title: string) => {
        const trimmed = title.trim();
        if (!trimmed) return;

        set((state) => ({
          tasks: [createTask(trimmed), ...state.tasks],
        }));
      },

      toggleTask: (taskId: string) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, done: !task.done } : task
          ),
        })),

      removeTask: (taskId: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),

      // Add the reorderTasks function
      reorderTasks: (dragIndex: number, hoverIndex: number) =>
        set((state) => {
          const newTasks = [...state.tasks];
          const [draggedTask] = newTasks.splice(dragIndex, 1);
          newTasks.splice(hoverIndex, 0, draggedTask);
          return { tasks: newTasks };
        }),
    }),
    {
      name: "task-storage", // Name for localStorage key
      // Custom serialization to handle Date objects correctly
      partialize: (state) => ({
        tasks: state.tasks.map((task) => ({
          ...task,
          createdAt: task.createdAt.toISOString(),
        })),
      }),
      // Custom deserialization to convert ISO strings back to Date objects
      onRehydrateStorage: () => (state) => {
        if (state && state.tasks) {
          state.tasks = state.tasks.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
          }));
        }
      },
    }
  )
);
