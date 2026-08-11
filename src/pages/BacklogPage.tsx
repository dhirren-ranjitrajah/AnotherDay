import type TaskData from "../types/TaskData";
import TaskTable from "../components/TaskTable";

export default function BacklogPage() {
  let mockTaskOne: TaskData = {
    id: 0,
    title: "Task 1",
    estimate: 30,
    isCompleted: false,
    priority: "High",
    category: "Development",
  };

  let mockTaskTwo: TaskData = {
    id: 1,
    title: "Task 2",
    estimate: 60,
    isCompleted: false,
    priority: "Medium",
    category: "Testing",
  };

  let mockTaskThree: TaskData = {
    id: 2,
    title: "Task 3",
    estimate: undefined,
    isCompleted: false,
    priority: undefined,
    category: undefined,
  };

  let mockTaskFour: TaskData = {
    id: 4,
    title: "Task 4",
    estimate: 0,
    isCompleted: false,
    priority: "Low",
    category: undefined,
  };

  return (
    <section className="bg-background">
      <h1>Backlog</h1>
      <TaskTable
        tasks={[mockTaskOne, mockTaskTwo, mockTaskThree, mockTaskFour]}
      />
    </section>
  );
}
