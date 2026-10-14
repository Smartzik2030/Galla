import { Droplet, AlertCircle } from "lucide-react";
import { Parcelle } from "@/lib/mockData";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

interface Props {
  parcelles: Parcelle[];
}

const healthRing: Record<Parcelle["health"], string> = {
  excellent: "ring-success",
  good: "ring-accent",
  warning: "ring-warning",
  critical: "ring-danger",
};

export default function CropHealthRail({ parcelles }: Props) {
  const { tr, lang } = useApp();
  const sorted = [...parcelles].sort((a, b) => {
    const order = { critical: 0, warning: 1, good: 2, excellent: 3 } as const;
    return order[a.health] - order[b.health];
  });

  return (
    <div className="card-surface p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-black text-foreground">{tr.dashboard.cropHealth}</h2>
          <p className="text-xs text-muted-foreground font-medium">
            {parcelles.length} {tr.dashboard.totalParcelles}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {sorted.map((p) => {
          const crop = lang === "ar" ? p.cropAr : p.cropFr;
          const needsAttention = p.health === "critical" || p.health === "warning";
          return (
            <div
              key={p.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-transparent transition-all",
                needsAttention && "border-warning/40 bg-warning/5"
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center font-black text-white shrink-0 ring-4 ring-offset-2 ring-offset-card",
                  healthRing[p.health]
                )}
                style={{ backgroundColor: p.color }}
              >
                {p.name.replace(/[^A-Z0-9]/g, "").slice(0, 2) || p.name.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground truncate">{crop}</p>
                <p className="text-xs text-muted-foreground font-medium">
                  {p.name} · {p.area} {tr.common.hectare}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 font-bold text-foreground">
                  <Droplet className="w-4 h-4 text-primary" />
                  {p.moisture}%
                </div>
                {needsAttention && (
                  <div className="flex items-center gap-1 text-xs text-warning font-bold justify-end mt-0.5">
                    <AlertCircle className="w-3 h-3" />
                    {tr.parcelles.status[p.health]}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
