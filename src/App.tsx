import { HashRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import TodayPage from './pages/TodayPage'
import BacklogPage from './pages/BacklogPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<TodayPage />} />
          <Route path="/backlog" element={<BacklogPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
