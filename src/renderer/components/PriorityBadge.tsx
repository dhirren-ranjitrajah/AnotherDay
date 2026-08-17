import usePriorityStore from "../store/priorityStore";

export default function PriorityBadge({
  priority,
}: {
  priority: string | undefined;
}) {
  const priorities = usePriorityStore((s) => s.priorities);

  let color = "";

  if (priority && priorities.has(priority)) {
    color = priorities.get(priority) ?? "";
  }

  return (
    <div
      style={{ "--color-priority": color } as React.CSSProperties}
      className={`group/priority flex justify-center w-2 h-8 rounded-[2px] bg-[var(--color-priority)] transition-all hover:w-16 items-center`}
    >
      <p className="opacity-0 text-center group-hover/priority:delay-100 group-hover/priority:opacity-100 duration-200 text-background text-sm">
        {priority?.toLowerCase()}
      </p>
    </div>
  );
}
