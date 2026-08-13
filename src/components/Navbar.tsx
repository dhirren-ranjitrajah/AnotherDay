import { NavLink } from "react-router-dom";
import HomeIcon from "../assets/icons/home.svg?react";
import BacklogIcon from "../assets/icons/list.svg?react";

export default function Navbar() {
  const navLinkClass = "flex flex-row gap-2 items-center";
  const navLinkTextClass =
    "invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity delay-100 duration-400";
  return (
    <div className="group top-0 left-0 bottom-0 z-10 w-16 hover:w-32 duration-400">
      <nav className="flex flex-col gap-4 bg-background-lowered p-4 group-hover:translate-x-0 duration-400">
        <NavLink
          to="/"
          className={({ isActive }) =>
            navLinkClass + (isActive ? " text-primary" : "")
          }
          end
        >
          <HomeIcon className="min-w-8 min-h-8 w-8 h-8" />
          <p className={navLinkTextClass}>Today</p>
        </NavLink>
        <NavLink
          to="/backlog"
          className={({ isActive }) =>
            navLinkClass + (isActive ? " text-primary" : "")
          }
        >
          <BacklogIcon className="min-w-8 min-h-8 w-8 h-8" />
          <p className={navLinkTextClass}>Backlog</p>
        </NavLink>
      </nav>
    </div>
  );
}
