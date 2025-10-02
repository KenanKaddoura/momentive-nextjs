"use client";

import React from "react";
import { useTaskStore } from "@/app/store/useTaskStore";
import { useTasksByDay } from "@/app/hooks/useTasksByDay";
import { DroppableTaskList } from "../tasks/DroppableTaskList";

interface WeekDayProps {
  day: string;
}

const WeekDay = ({ day }: WeekDayProps) => {
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const removeTask = useTaskStore((state) => state.removeTask);

  // tasks -- > day
  const tasks = useTasksByDay(day);

  return (
    <div className="shadow-lg min-w-36 h-full pt-3 pb-3 ps-2 pe-1 bg-slate-100 border border-emerald-300 rounded-xl flex flex-col">
      <h3 className="text-center border-b border-solid border-blue-500 pb-2 mb-3 text-slate-800">
        {day}
      </h3> 

      <DroppableTaskList
        listName={day}
        tasks={tasks}
        toggleTask={toggleTask}
        removeTask={removeTask}
      />
    </div>
  );
};

export default WeekDay;
