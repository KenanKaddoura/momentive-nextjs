import React from 'react'

interface WeekDayProps {
    day: string;
}


const WeekDay = ({day} : WeekDayProps) => {
  return (
    <div className='min-w-36 h-full p-3 bg-slate-100 border border-emerald-400 rounded-xl'>
      <h3>{day}</h3>
    </div>
  )
}

export default WeekDay
