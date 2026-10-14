import { NavLink } from "react-router-dom";
import { LayoutDashboard, ListChecks, Map, Wallet } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const { tr } = useApp();

  const items = [
    { to: "/", label: tr.nav.dashboard, Icon: LayoutDashboard, end: true },
    { to: "/tasks", label: tr.nav.tasks, Icon: ListChecks },
    { to: "/parcelles", label: tr.nav.parcelles, Icon: Map },
    { to: "/finance", label: tr.nav.finance, Icon: Wallet },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-primary-deep border-t border-white/10 pb-safe">
      <ul className="flex items-center justify-around px-2 py-2">
        {items.map(({ to, label, Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 py-2 rounded-xl transition-colors min-h-[56px]",
                  isActive ? "text-accent" : "text-white/70"
                )
              }
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-bold">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
