import type TaskDto from "../../types/taskDto";
import useCategoryStore from "../store/categoryStore";

interface Props {
  tasks: TaskDto[];
}

export default function TaskCarousel({ tasks }: Props) {
  const { categories } = useCategoryStore();

  const getCategoryColor = (t?: TaskDto) => {
    return t && t.category ? categories.get(t.category) : undefined;
  };

  const getFontSize = (idx: number) => {
    return 32 - 8 * idx;
  };

  const getTranslationY = (idx: number) => {
    let y = 0;
    for (let i: number = 0; i < idx; i++) {
      y += getFontSize(i) + 8;
    }
    return y;
  };

  return (
    <div style={{ height: getTranslationY(4) }} className="relative w-full">
      {tasks.slice(0, 4).map((v, idx) => (
        <div
          key={v.id}
          style={{
            transform: `translateY(-${getTranslationY(idx)}px)`,
            opacity: 1 - 0.25 * idx,
          }}
          className="absolute inset-x-0 bottom-0 transition-all duration-300 ease-in-out"
        >
          <p
            style={
              {
                "--color-category": getCategoryColor(v),
                fontSize: getFontSize(idx),
              } as React.CSSProperties
            }
            className={`text-center text-[var(--color-category)] ${idx === 0 ? "" : "truncate"}`}
          >
            {v.title}
          </p>
        </div>
      ))}
    </div>
  );
}
