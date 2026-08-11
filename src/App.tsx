import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'
import TodayPage from './pages/TodayPage'
import BacklogPage from './pages/BacklogPage'

function App() {
  return (
    <HashRouter>
      <nav className="flex gap-4 border-b border-[var(--color-background-border)] p-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-[var(--color-primary)]' : ''
          }
          end
        >
          Today
        </NavLink>
        <NavLink
          to="/backlog"
          className={({ isActive }) =>
            isActive ? 'text-[var(--color-primary)]' : ''
          }
        >
          Backlog
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<TodayPage />} />
        <Route path="/backlog" element={<BacklogPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
