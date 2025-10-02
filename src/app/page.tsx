"use client";

import TasksList from "./components/tasks/TasksList";
import WeekFrame from "./components/WeekCanvas/WeekFrame";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { useTaskStore } from "./store/useTaskStore";
import { useState } from "react";

export default function Home() {
  const reorderTasks = useTaskStore((state) => state.reorderTasks);

  const [activeId, setActiveId] = useState<string | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const taskId = active.id as string;
    const overId = over.id as string;

    // Extract data from the dragged item
    const dragData = active.data.current;
    const overData = over.data.current;

    if (!dragData || !overData) return;

    const dragList = dragData.list as string;
    const dragIndex = dragData.index as number;

    // Determine the target list and index
    let hoverList: string;
    let hoverIndex: number;

    if (overData.type === "list") {
      // Dropped on an empty list
      hoverList = overData.list as string;
      hoverIndex = 0;
    } else if (overData.type === "task") {
      // Dropped on another task
      hoverList = overData.list as string;
      hoverIndex = overData.index as number;

      // If dropping in the same list and moving down, adjust index
      if (dragList === hoverList && dragIndex < hoverIndex) {
        hoverIndex = hoverIndex - 1;
      }
    } else {
      return;
    }

    // Only move if the position actually changed
    if (dragList !== hoverList || dragIndex !== hoverIndex) {
      reorderTasks(taskId, dragIndex, hoverIndex, dragList, hoverList);
    }
  }

  function handleDragOver(event: DragOverEvent) {
    // Optional: Add visual feedback during drag over
  }

  return (
    <DndContext
      // onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="app-bg flex items-center justify-center">
        <TasksList />
        <WeekFrame />
      </div>
    </DndContext>
  );
}
