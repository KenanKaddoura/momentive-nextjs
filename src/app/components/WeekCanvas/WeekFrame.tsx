import React from 'react'
import WeekDay from './WeekDay'



const WeekFrame = () => {

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


  return (
    <div className='grid grid-cols-4 gap-4 justify-evenly h-[46rem] w-full max-w-7xl rounded-3xl bg-slate-50 p-3 shadow-2xl m-2'>

        {days.map((day, i) => (
            <WeekDay key={i} day={day}/>
        ))}

        <WeekDay day="More Tasks"/>
    </div>
  )
}

export default WeekFrame
