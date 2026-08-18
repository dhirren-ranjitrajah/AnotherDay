import TaskTableList from "../components/TaskTableList";

function TodayPage() {
  return (
    <section className="bg-background">
      <TaskTableList tables={[{ tableHeader: "Today", isTodayTable: true }]} />
    </section>
  );
}

export default TodayPage;
