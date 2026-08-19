import TaskTableList from "../components/TaskTableList";

export default function DonePage() {
  return (
    <section className="bg-background">
      <TaskTableList
        tables={[
          { tableHeader: "Done", emptyPrompt: "No completed tasks yet!" },
        ]}
      />
    </section>
  );
}
