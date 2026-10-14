import { NavLink } from "react-router-dom";
import { LayoutDashboard, ListChecks, Map, Wallet, LogOut, Sprout } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const { tr, logout, user } = useApp();

  const items = [
    { to: "/", label: tr.nav.dashboard, Icon: LayoutDashboard, end: true },
    { to: "/tasks", label: tr.nav.tasks, Icon: ListChecks },
    { to: "/parcelles", label: tr.nav.parcelles, Icon: Map },
    { to: "/finance", label: tr.nav.finance, Icon: Wallet },
  ];

  return (
    <aside className="hidden md:flex md:w-64 lg:w-72 bg-primary-deep text-primary-foreground flex-col shrink-0">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shadow-lg">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">{tr.appName}</h1>
            <p className="text-xs text-white/60">{tr.tagline}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1.5">
        {items.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-all min-h-[52px]",
                isActive
                  ? "bg-white text-primary shadow-lg"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-3">
        {user && (
          <div className="flex items-center gap-3 px-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
              style={{ backgroundColor: user.avatarColor }}
            >
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold truncate">{user.name}</p>
              <p className="text-xs text-white/60 truncate">{user.farmName}</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors font-semibold"
        >
          <LogOut className="w-5 h-5" />
          <span>{tr.nav.logout}</span>
        </button>
      </div>
    </aside>
  );
}
