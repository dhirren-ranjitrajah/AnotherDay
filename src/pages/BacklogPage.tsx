import type TaskData from "../types/TaskData";
import TaskTable from "../components/TaskTable";

export default function BacklogPage() {
  let mockTaskOne: TaskData = {
    id: 0,
    title: "Task 1",
    estimate: 30,
    progress: 15,
    isCompleted: false,
    priority: "High",
    category: "Development",
  };

  let mockTaskTwo: TaskData = {
    id: 1,
    title: "Task 2: This is an example task with an extended description",
    estimate: 60,
    progress: 15,
    isCompleted: false,
    priority: undefined,
    category: "Testing",
  };

  let mockTaskThree: TaskData = {
    id: 2,
    title: "Task 3",
    estimate: undefined,
    progress: undefined,
    isCompleted: false,
    priority: undefined,
    category: undefined,
  };

  let mockTaskFour: TaskData = {
    id: 4,
    title: "Task 4",
    estimate: 0,
    progress: undefined,
    isCompleted: false,
    priority: "Low",
    category: undefined,
  };

  return (
    <section className="bg-background">
      <TaskTable
        tableHeader="Today"
        tasks={[mockTaskOne, mockTaskTwo, mockTaskThree, mockTaskFour]}
        isTodayTable={true}
      />
      <TaskTable
        tableHeader="Backlog"
        tasks={[mockTaskOne, mockTaskTwo, mockTaskThree, mockTaskFour]}
      />
    </section>
  );
}
