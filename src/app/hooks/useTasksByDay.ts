import { useMemo } from 'react';
import { useTaskStore } from '../store/useTaskStore';

export const useTasksByDay = (day: string) => {
  const tasks = useTaskStore((state) => state.tasks);
  
  return useMemo(() => {
    return tasks.filter((task) => task.assignedDay === day);
  }, [tasks, day]);
};