import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock, ListChecks } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { getTasks, Task } from "@/lib/mockData";
import TaskCard from "@/components/features/TaskCard";
import { cn } from "@/lib/utils";

type Filter = "all" | "pending" | "done";

export default function Tasks() {
  const { tr, user } = useApp();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("pending");

  const refresh = () => {
    if (user) setTasks(getTasks(user.farmId));
  };

  useEffect(() => {
    refresh();
  }, [user]);

  const filtered = useMemo(() => {
    if (filter === "pending") return tasks.filter((t) => !t.done);
    if (filter === "done") return tasks.filter((t) => t.done);
    return tasks;
  }, [tasks, filter]);

  const pending = tasks.filter((t) => !t.done).length;
  const done = tasks.filter((t) => t.done).length;
  const progress = tasks.length === 0 ? 0 : Math.round((done / tasks.length) * 100);

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "pending", label: tr.tasks.filter.pending, count: pending },
    { id: "all", label: tr.tasks.filter.all, count: tasks.length },
    { id: "done", label: tr.tasks.filter.done, count: done },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-foreground">{tr.tasks.title}</h1>
        <p className="text-muted-foreground mt-1 font-medium">{tr.tasks.subtitle}</p>
      </div>

      {/* Progress banner */}
      <div className="card-surface p-5 bg-gradient-to-br from-primary to-primary-deep text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/70 font-semibold">
              {done} / {tasks.length}
            </p>
            <p className="text-2xl font-black mt-1">
              {progress}%
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
            <ListChecks className="w-7 h-7" />
          </div>
        </div>
        <div className="mt-4 h-3 rounded-full bg-white/15 overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all min-h-[44px]",
              filter === f.id
                ? "bg-primary text-white shadow-md"
                : "bg-white text-muted-foreground border border-border hover:border-primary/40"
            )}
          >
            {f.label}
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs font-black",
                filter === f.id ? "bg-white/20 text-white" : "bg-muted text-foreground"
              )}
            >
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tasks list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="card-surface p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-success/15 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9 text-success" />
            </div>
            <p className="mt-4 text-foreground font-bold">{tr.tasks.empty}</p>
          </div>
        ) : (
          filtered.map((t) => <TaskCard key={t.id} task={t} onChange={refresh} />)
        )}
      </div>
    </div>
  );
}
