import TaskTable from "../components/TaskTable";
import useTasks from "../hooks/useTasks";

export default function BacklogPage() {
  const { tasks, isLoading, toggleToday, toggleCompleted } = useTasks();

  if (isLoading) return null;

  const todayTasks = tasks.filter((task) => task.isToday);
  const backlogTasks = tasks.filter((task) => !task.isToday);

  return (
    <section className="bg-background">
      <TaskTable
        tableHeader="Today"
        tasks={todayTasks}
        isTodayTable={true}
        onTransferClick={toggleToday}
        onCompleteClick={toggleCompleted}
      />
      <TaskTable
        tableHeader="Backlog"
        tasks={backlogTasks}
        onTransferClick={toggleToday}
        onCompleteClick={toggleCompleted}
      />
    </section>
  );
}
