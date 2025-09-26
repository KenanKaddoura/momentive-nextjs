"use client";


import React from 'react'
import { Task, useTaskStore } from '@/app/store/useTaskStore';
import { TaskItem } from '../tasks/TaskItem';

interface WeekDayProps {
    day: string;
    tasks: Task[];
}


const WeekDay = ({day, tasks} : WeekDayProps) => {

  const reorderTasks = useTaskStore((state) => state.reorderTasks)
  const toggleTask = useTaskStore((state) => state.toggleTask)
  const removeTask = useTaskStore((state) => state.removeTask)

  return (
    <div className='flex-1 overflow-y-auto pr-2 min-w-36 h-full p-3 bg-slate-100 border border-emerald-400 rounded-xl'>
      <h3 className='border-b border-solid border-blue-500'>{day}</h3>

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
            <p className="rounded-md bg-white p-2 mt-3 text-center text-sm text-slate-400">
              Drag a Task From List
            </p>
          )}
    </div>
  )
}

export default WeekDay
