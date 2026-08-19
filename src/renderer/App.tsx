import { HashRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import TodayPage from "./pages/TodayPage";
import BacklogPage from "./pages/BacklogPage";
import TasksProvider from "./context/TasksProvider";
import TaskModalProvider from "./context/TaskModalProvider";
import DonePage from "./pages/DonePage";

export default function App() {
  return (
    <TasksProvider>
      <TaskModalProvider>
        <HashRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<TodayPage />} />
              <Route path="/backlog" element={<BacklogPage />} />
              <Route path="/done" element={<DonePage />} />
            </Route>
          </Routes>
        </HashRouter>
      </TaskModalProvider>
    </TasksProvider>
  );
}
