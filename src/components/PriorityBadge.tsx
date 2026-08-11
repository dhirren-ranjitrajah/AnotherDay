export default function PriorityBadge({
  priority,
}: {
  priority: string | undefined;
}) {
  if (!priority) {
    return null;
  }

  return (
    <div className="px-2 py-1 rounded-md bg-priority">
      {priority.trim().substring(0, 4).toLowerCase()}
    </div>
  );
}
