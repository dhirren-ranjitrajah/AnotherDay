import type TaskDto from "../../types/taskDto";
import useCategoryStore from "../store/categoryStore";
import DonutChart, { type PieChartElementData } from "./DonutChart";

interface Props {
  tasks: TaskDto[];
  size: number;
}

export default function TasksDonutChart({ tasks, size }: Props) {
  const { categories } = useCategoryStore();
  const NoCategoryString = "no category";

  const categoryMap = tasks.reduce<Map<string, number>>((acc, t) => {
    const idx = t.category || NoCategoryString;
    const add = t.estimate ? Math.max(0, t.estimate - (t.progress ?? 0)) : 0;
    acc.set(idx, (acc.get(idx) ?? 0) + add);
    return acc;
  }, new Map<string, number>());

  const elements: PieChartElementData[] = [...categoryMap]
    .map<PieChartElementData>(([k, v]) => {
      return { label: k, value: v, color: categories.get(k) };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <>
      <DonutChart size={size} elements={elements} />
    </>
  );
}
