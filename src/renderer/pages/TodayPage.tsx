import TaskTable from "../components/TaskTable";
import useTasks from "../hooks/useTasks";

function TodayPage() {
  const { tasks, isLoading, toggleToday, toggleCompleted } = useTasks();

  if (isLoading) return null;

  const todayTasks = tasks.filter((task) => task.isToday);

  return (
    <section className="bg-background">
      <TaskTable
        tableHeader="Today"
        tasks={todayTasks}
        isTodayTable={true}
        onTransferClick={toggleToday}
        onCompleteClick={toggleCompleted}
      />
    </section>
  );
}

export default TodayPage;
