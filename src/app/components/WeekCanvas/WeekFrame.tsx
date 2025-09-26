"use client";


import React from 'react'
import WeekDay from './WeekDay'

import { useTaskStore } from '@/app/store/useTaskStore';


const WeekFrame = () => {

  const days = ["Sunday",  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const tasks = useTaskStore((state) => state.tasks)

  return (
      <div className='grid grid-cols-4 gap-4 justify-evenly h-[46rem] w-full max-w-7xl rounded-3xl bg-slate-50 p-3 shadow-2xl m-2'>

          {days.map((day, i) => (
              <WeekDay key={i} day={day} tasks={tasks.filter((task) => task.assignedDay == day)}/>
          ))}

          <WeekDay day="More Tasks" tasks={tasks.filter((task) => task.assignedDay == "more_tasks")}/>
      </div>

  )
}

export default WeekFrame
