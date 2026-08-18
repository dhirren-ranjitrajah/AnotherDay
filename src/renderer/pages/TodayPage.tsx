import TaskTableList from "../components/TaskTableList";

function TodayPage() {
  return (
    <section className="bg-background">
      <TaskTableList
        tables={[
          {
            tableHeader: "Today",
            isTodayTable: true,
            emptyPrompt: "No tasks here. Start typing to add some!",
          },
        ]}
      />
    </section>
  );
}

export default TodayPage;
