export default interface TaskData {
  id: number;
  title: string;
  isCompleted: boolean;
  estimate: number | undefined; // in minutes (60m -> 1h; 8h -> 1d)
  progress: number | undefined; // in minutes (60m -> 1h; 8h -> 1d)

  // user defined strings; check validity at run-time
  priority: string | undefined;
  category: string | undefined;
}
