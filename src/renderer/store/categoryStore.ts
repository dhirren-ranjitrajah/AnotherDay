import { create } from "zustand";
import type { HexColor } from "../types/hexColor";

interface State {
  categories: Map<string, HexColor>;
}

const useCategoryStore = create<State>(() => ({
  // members
  categories: new Map<string, HexColor>([
    ["Work", "#6fbdb5"],
    ["Self Care", "#6f85bd"],
    ["Hobbies", "#8c6fbd"],
  ]),
}));

export default useCategoryStore;
