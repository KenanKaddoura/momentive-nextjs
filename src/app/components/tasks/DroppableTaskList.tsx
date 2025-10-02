// filepath: c:\Users\kenan\Web Development\NextJs\momentive-nextjs\src\app\components\tasks\DroppableTaskList.tsx
"use client";

import { useDroppable } from "@dnd-kit/core";
import { TaskItem } from "./TaskItem";
import { Task } from "../../store/useTaskStore";

interface DroppableTaskListProps {
  listName: string;
  tasks: Task[];
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  children?: React.ReactNode;
}

export const DroppableTaskList = ({
  listName,
  tasks,
  toggleTask,
  removeTask,
  children,
}: DroppableTaskListProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `list-${listName}`,
    data: {
      type: 'list',
      list: listName,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 overflow-y-auto pr-2 transition-colors ${
        isOver ? 'bg-indigo-50' : ''
      }`}
    >
      {children}
      
      <ul className="space-y-3">
        {tasks.map((task, index) => (
          <li key={task.id}>
            <DroppableTaskItem
              task={task}
              index={index}
              listName={listName}
              toggleTask={toggleTask}
              removeTask={removeTask}
            />
          </li>
        ))}
      </ul>

      {/* Empty List State */}
      {tasks.length === 0 && (
        <p className={`select-none rounded-2xl bg-slate-50 size-full p-4 text-center text-sm transition-colors ${
          isOver ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400'
        }`}>
          {isOver ? 'Drop task here' : 'Drag tasks here'}
        </p>
      )}
    </div>
  );
};

// Individual droppable task item
interface DroppableTaskItemProps {
  task: Task;
  index: number;
  listName: string;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
}

const DroppableTaskItem = ({
  task,
  index,
  listName,
  toggleTask,
  removeTask,
}: DroppableTaskItemProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `task-${task.id}`,
    data: {
      type: 'task',
      task,
      index,
      list: listName,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`transition-all ${
        isOver ? 'transform scale-105' : ''
      }`}
    >
      <TaskItem
        task={task}
        index={index}
        listName={listName}
        toggleTask={toggleTask}
        removeTask={removeTask}
      />
    </div>
  );
};