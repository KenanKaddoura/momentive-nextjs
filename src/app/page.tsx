import Image from "next/image";
import TasksList from "./components/tasks/TasksList";
import WeekFrame from "./components/WeekCanvas/WeekFrame";

export default function Home() {
  return (
    <div className="app-bg flex items-center justify-center">
      <TasksList />
      <WeekFrame />
    </div>
  );
}
