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
interface TaskStore {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (taskId: string) => void;
  removeTask: (taskId: string) => void;
  reorderTasks: (
    taskId: string,
    dragIndex: number,
    hoverIndex: number,
    dragList: string,
    hoverList: string
  ) => void;
}

// Helper function to create a new task
const createTask = (title: string): Task => ({
  id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  title,
  createdAt: new Date(),
  done: false,
  assignedDay: "TasksList", 
});

// Create the store with persistence
export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
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

      // Fixed reorderTasks function
      reorderTasks: (
        taskId: string,
        dragIndex: number,
        hoverIndex: number,
        dragList: string,
        hoverList: string
      ) =>
        set((state) => {
          const newTasks = [...state.tasks];

          // Find the task being moved
          const taskToMove = newTasks.find((task) => task.id === taskId);
          if (!taskToMove) return state;

          // If moving between different lists
          if (dragList !== hoverList) {
            // Update the task's assignedDay
            const updatedTasks = newTasks.map((task) =>
              task.id === taskId ? { ...task, assignedDay: hoverList } : task
            );

            // Get tasks for the target list to determine the new position
            const targetListTasks = updatedTasks.filter(
              (task) => task.assignedDay === hoverList
            );
            const targetTaskIndex = updatedTasks.findIndex(
              (task) => task.id === taskId
            );

            // Remove task from current position
            updatedTasks.splice(targetTaskIndex, 1);

            // Find where to insert in the new list
            const targetListIndices = updatedTasks
              .map((task, index) => ({ task, index }))
              .filter(({ task }) => task.assignedDay === hoverList)
              .map(({ index }) => index);

            let insertIndex =
              targetListIndices[hoverIndex] || updatedTasks.length;

            // Insert task at new position
            updatedTasks.splice(insertIndex, 0, {
              ...taskToMove,
              assignedDay: hoverList,
            });

            return { tasks: updatedTasks };
          }
          // If reordering within the same list
          else {
            // Get only tasks from the current list
            const listTasks = newTasks.filter(
              (task) => task.assignedDay === dragList
            );
            const otherTasks = newTasks.filter(
              (task) => task.assignedDay !== dragList
            );

            // Find the actual task in the filtered list
            const draggedTask = listTasks[dragIndex];
            if (!draggedTask) return state;

            // Reorder within the list
            listTasks.splice(dragIndex, 1);
            listTasks.splice(hoverIndex, 0, draggedTask);

            // Combine back with other tasks
            const result = [...otherTasks, ...listTasks];

            return { tasks: result };
          }
        }),

    }),
    {
      name: "task-storage",
      partialize: (state) => ({
        tasks: state.tasks.map((task) => ({
          ...task,
          createdAt: task.createdAt.toISOString(),
        })),
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.tasks) {
          state.tasks = state.tasks.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            assignedDay: task.assignedDay || "TasksList", // Migrate old tasks
          }));
        }
      },
    }
  )
);
