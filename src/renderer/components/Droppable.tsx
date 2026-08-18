import { useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react";
import { CollisionPriority } from "@dnd-kit/abstract";

interface Props {
  id: number | string;
  children?: ReactNode;
}

export default function Droppable({ id, children }: Props) {
  const { ref } = useDroppable({
    id,
    collisionPriority: CollisionPriority.Low,
  });

  return <div ref={ref}>{children}</div>;
}
