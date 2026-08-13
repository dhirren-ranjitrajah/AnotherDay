import { HashRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import TodayPage from './pages/TodayPage'
import BacklogPage from './pages/BacklogPage'
import { TasksProvider } from './context/TasksContext'

export default function App() {
  return (
    <TasksProvider>
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<TodayPage />} />
            <Route path="/backlog" element={<BacklogPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </TasksProvider>
  )
}