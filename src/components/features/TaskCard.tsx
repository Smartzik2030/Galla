import { Check, Droplets, SprayCan, Gauge, ShoppingBasket, Scissors, Sprout, Clock, AlertTriangle, MapPin } from "lucide-react";
import { Task, PARCELLES, toggleTask } from "@/lib/mockData";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const IconMap: Record<string, typeof Droplets> = {
  droplets: Droplets,
  spray: SprayCan,
  gauge: Gauge,
  "shopping-basket": ShoppingBasket,
  scissors: Scissors,
  sprout: Sprout,
};

interface Props {
  task: Task;
  onChange?: () => void;
  compact?: boolean;
}

export default function TaskCard({ task, onChange, compact }: Props) {
  const { tr, lang } = useApp();
  const parcelle = PARCELLES.find((p) => p.id === task.parcelleId);
  const Icon = IconMap[task.icon] ?? Sprout;
  const title = lang === "ar" ? task.titleAr : task.titleFr;

  const dueTime = new Date(task.due).toLocaleTimeString(lang === "ar" ? "ar-MA" : "fr-MA", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleToggle = () => {
    toggleTask(task.id);
    toast.success(task.done ? tr.tasks.pending : tr.tasks.done, {
      description: title,
    });
    onChange?.();
  };

  return (
    <div
      className={cn(
        "card-surface p-4 md:p-5 flex items-center gap-4 transition-all",
        task.done && "opacity-60",
        task.urgent && !task.done && "border-r-4 border-r-warning"
      )}
    >
      <div
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
          task.done ? "bg-success/15" : task.urgent ? "bg-warning/15" : "bg-primary-soft"
        )}
        style={!task.done && parcelle ? { backgroundColor: `${parcelle.color}20` } : {}}
      >
        <Icon
          className={cn(
            "w-7 h-7",
            task.done ? "text-success" : task.urgent ? "text-warning" : "text-primary"
          )}
          style={!task.done && parcelle ? { color: parcelle.color } : {}}
          strokeWidth={2}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3
            className={cn(
              "font-bold text-foreground",
              compact ? "text-sm" : "text-base md:text-lg",
              task.done && "line-through"
            )}
          >
            {title}
          </h3>
          {task.urgent && !task.done && (
            <span className="chip bg-warning/15 text-warning">
              <AlertTriangle className="w-3 h-3" />
              {tr.tasks.urgent}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground font-medium">
          {parcelle && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {parcelle.name}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {dueTime}
          </span>
        </div>
      </div>

      <button
        onClick={handleToggle}
        className={cn(
          "shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-bold transition-all active:scale-95",
          task.done
            ? "bg-success/20 text-success hover:bg-success/30"
            : "bg-primary text-white hover:bg-primary-deep shadow-lg shadow-primary/30"
        )}
        aria-label={task.done ? tr.tasks.undo : tr.tasks.markDone}
      >
        <Check className="w-7 h-7" strokeWidth={3} />
      </button>
    </div>
  );
}
