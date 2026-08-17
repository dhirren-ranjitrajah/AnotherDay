import { create } from "zustand";
import type { HexColor } from "../types/hexColor";

interface State {
  priorities: Map<string, HexColor>;
}

const defaultPriorities = new Map<string, HexColor>([
  ["High", "#bd6f6f"],
  ["Medium", "#bdb16f"],
  ["Low", "#6fbd76"],
]);

const usePriorityStore = create<State>(() => ({
  priorities: defaultPriorities,
}));

export default usePriorityStore;
