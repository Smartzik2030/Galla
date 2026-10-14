import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListChecks, Map, Users, ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { getTasks, getParcelles, getFinance, Task } from "@/lib/mockData";
import WeatherCard from "@/components/features/WeatherCard";
import TaskCard from "@/components/features/TaskCard";
import CropHealthRail from "@/components/features/CropHealthRail";
import FinanceSummary from "@/components/features/FinanceSummary";

export default function Dashboard() {
  const { tr, lang, user } = useApp();
  const [tasks, setTasks] = useState<Task[]>([]);
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const refresh = () => {
    if (user) setTasks(getTasks(user.farmId));
  };

  useEffect(() => {
    refresh();
  }, [user]);

  if (!user) return null;

  const parcelles = getParcelles(user.farmId);
  const finance = getFinance(user.farmId);
  const pendingTasks = tasks.filter((t) => !t.done);
  const urgentCount = pendingTasks.filter((t) => t.urgent).length;
  const criticalParcelles = parcelles.filter((p) => p.health === "critical" || p.health === "warning");

  const stats = [
    {
      label: tr.dashboard.activeTasks,
      value: pendingTasks.length,
      Icon: ListChecks,
      color: "bg-primary text-white",
    },
    {
      label: tr.dashboard.totalParcelles,
      value: parcelles.length,
      Icon: Map,
      color: "bg-accent text-white",
    },
    {
      label: tr.dashboard.workers,
      value: 4,
      Icon: Users,
      color: "bg-secondary text-foreground",
    },
    {
      label: tr.dashboard.alerts,
      value: urgentCount + criticalParcelles.length,
      Icon: AlertTriangle,
      color: "bg-warning text-foreground",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-foreground">
          {tr.dashboard.greeting}، {user.name}
        </h1>
        <p className="text-muted-foreground mt-1 font-medium">{user.farmName}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card-surface p-4 md:p-5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color}`}>
              <s.Icon className="w-6 h-6" strokeWidth={2} />
            </div>
            <p className="text-3xl font-black mt-3 text-foreground tabular-nums">{s.value}</p>
            <p className="text-xs md:text-sm text-muted-foreground font-semibold mt-0.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <CropHealthRail parcelles={parcelles} />

          <div className="card-surface p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-black text-foreground">{tr.dashboard.today}</h2>
                <p className="text-xs text-muted-foreground font-medium">
                  {pendingTasks.length} {tr.dashboard.activeTasks}
                </p>
              </div>
              <Link
                to="/tasks"
                className="flex items-center gap-1 text-primary font-bold text-sm hover:underline"
              >
                {tr.dashboard.viewAll}
                <Arrow className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {tasks.slice(0, 4).map((t) => (
                <TaskCard key={t.id} task={t} onChange={refresh} compact />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <WeatherCard />
          <FinanceSummary entries={finance} />
        </div>
      </div>
    </div>
  );
}
