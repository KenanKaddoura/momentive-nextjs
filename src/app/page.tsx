import Image from "next/image";
import TasksList from "./tasks/TasksList";

export default function Home() {
  return (
    <div className="app-bg flex items-center justify-center">
      <TasksList />
    </div>
  );
}
