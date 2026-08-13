export default function PriorityBadge({
  priority,
}: {
  priority: string | undefined;
}) {
  let bgClass = "";

  // TODO - priority should switch on value
  if (priority !== undefined) {
    bgClass = "bg-priority-0";
  }

  return (
    <div
      className={`group/priority flex justify-center w-2 h-8 rounded-[2px] ${bgClass} transition-all hover:w-16 items-center`}
    >
      <p className="opacity-0 text-center group-hover/priority:delay-100 group-hover/priority:opacity-100 duration-200 text-background">
        {priority?.toLowerCase()}
      </p>
    </div>
  );
}
