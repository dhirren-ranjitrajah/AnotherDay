import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  onClose: () => void;
  children?: ReactNode;
}

export default function Modal({ onClose, children }: Props) {
  return createPortal(
    <div
      className="fixed inset-0 z-10 flex justify-center items-center bg-black/80 p-4 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {children}
    </div>,
    document.body,
  );
}
