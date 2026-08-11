import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex gap-4 bg-surface-dark text-surface-light border-b border-border p-4">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'text-primary' : '')} end>
        Today
      </NavLink>
      <NavLink to="/backlog" className={({ isActive }) => (isActive ? 'text-primary' : '')}>
        Backlog
      </NavLink>
    </nav>
  )
}

export default Navbar
