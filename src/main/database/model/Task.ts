export default interface Task {
  id: number;
  title: string;
  isCompleted: number;
  estimate: number | null;
  progress: number | null;
  priority: string | null;
  category: string | null;
  isToday: number;
}
