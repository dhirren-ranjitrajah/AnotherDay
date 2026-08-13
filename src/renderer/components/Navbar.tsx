import { NavLink } from "react-router-dom";
import HomeIcon from "../../assets/icons/home.svg?react";
import BacklogIcon from "../../assets/icons/list.svg?react";

export default function Navbar() {
  const navLinkClass = "group/navlink flex flex-row gap-2 items-center";
  const navLinkTextClass =
    "invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:delay-100 group-hover:duration-400 group-hover/navlink:delay-0 group-hover/navlink:duration-200 group-hover/navlink:text-primary-hover";
  const iconClass =
    "min-w-8 min-h-8 w-8 h-8 transition-colors group-hover/navlink:text-primary-hover group-hover/navlink:duration-200";

  return (
    <div className="group top-0 left-0 bottom-0 h-full py-4 z-10 w-16 hover:w-32 transition-all duration-400 bg-background-lowered/50">
      <nav className="flex flex-col h-full gap-4 border-r-4 border-background-lowered p-4 duration-400">
        <NavLink
          to="/"
          className={({ isActive }) =>
            navLinkClass + (isActive ? " text-primary" : "")
          }
          end
        >
          <HomeIcon className={iconClass} />
          <p className={navLinkTextClass}>Today</p>
        </NavLink>
        <NavLink
          to="/backlog"
          className={({ isActive }) =>
            navLinkClass + (isActive ? " text-primary" : "")
          }
        >
          <BacklogIcon className={iconClass} />
          <p className={navLinkTextClass}>Backlog</p>
        </NavLink>
      </nav>
    </div>
  );
}
