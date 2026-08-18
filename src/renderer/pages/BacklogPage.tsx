import TaskTableList from "../components/TaskTableList";

export default function BacklogPage() {
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
