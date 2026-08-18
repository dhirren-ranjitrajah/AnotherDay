import useTasks from "../hooks/useTasks";
import TaskTableList from "../components/TaskTableList";

export default function BacklogPage() {
  const { isLoading } = useTasks();

  if (isLoading) return null;

  return (
    <section className="bg-background">
      <TaskTableList
        tables={[
          { tableHeader: "Today", isTodayTable: true },
          { tableHeader: "Backlog" },
        ]}
      />
    </section>
  );
}
