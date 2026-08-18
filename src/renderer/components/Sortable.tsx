import { useSortable } from "@dnd-kit/react/sortable";
import type { ReactNode } from "react";
import type { Data } from "@dnd-kit/abstract";

interface Props<T extends Data> {
  id: number | string;
  index: number;
  group?: string;
  data?: T;
  children?: ReactNode;
}

export default function Sortable<T extends Data>({
  id,
  index,
  group,
  data,
  children,
}: Props<T>) {
  const { ref, isDragSource } = useSortable({ id, index, group, data });
  return (
    <div
      tabIndex={-1}
      ref={ref}
      style={{ opacity: isDragSource ? 0 : 1 } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
