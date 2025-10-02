"use client";

import React from "react";
import WeekDay from "./WeekDay";

const WeekFrame = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[46rem] w-full max-w-7xl rounded-xl bg-slate-50 p-4 shadow-2xl m-2">
      {/* First row - 4 days */}
      {days.slice(0, 4).map((day, i) => (
        <WeekDay key={i} day={day} />
      ))}

      {/* Second row - 3 days + More Tasks */}
      {days.slice(4).map((day, i) => (
        <WeekDay key={i + 4} day={day} />
      ))}

      <WeekDay key={days.length} day="More Tasks" />
    </div>
  );
};

export default WeekFrame;
