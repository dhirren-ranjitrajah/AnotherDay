import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function MainLayout() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 min-h-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
