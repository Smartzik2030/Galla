import { Droplet, Clock, Leaf, ArrowLeft, ArrowRight } from "lucide-react";
import { Parcelle } from "@/lib/mockData";
import { useApp } from "@/contexts/AppContext";
import { cn, formatDate } from "@/lib/utils";

interface Props {
  parcelle: Parcelle;
}

const healthStyles: Record<Parcelle["health"], string> = {
  excellent: "bg-success/15 text-success",
  good: "bg-accent/15 text-accent",
  warning: "bg-warning/15 text-warning",
  critical: "bg-danger/15 text-danger",
};

const moistureColor = (m: number) => {
  if (m < 25) return "bg-danger";
  if (m < 45) return "bg-warning";
  if (m < 70) return "bg-accent";
  return "bg-success";
};

export default function ParcelleCard({ parcelle }: Props) {
  const { tr, lang } = useApp();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const crop = lang === "ar" ? parcelle.cropAr : parcelle.cropFr;

  return (
    <div className="card-surface p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
          style={{ backgroundColor: `${parcelle.color}25`, border: `2px solid ${parcelle.color}50` }}
        >
          <Leaf className="w-8 h-8" style={{ color: parcelle.color }} strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-black text-foreground truncate">{parcelle.name}</h3>
            <span className={cn("chip", healthStyles[parcelle.health])}>
              {tr.parcelles.status[parcelle.health]}
            </span>
          </div>
          <p className="text-sm font-semibold text-muted-foreground mt-0.5">
            {crop} · {parcelle.area} {tr.common.hectare}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <div className="flex items-center justify-between text-sm font-bold mb-1.5">
            <span className="flex items-center gap-1.5 text-foreground">
              <Droplet className="w-4 h-4 text-primary" />
              {tr.parcelles.moisture}
            </span>
            <span className="text-foreground">{parcelle.moisture}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all", moistureColor(parcelle.moisture))}
              style={{ width: `${parcelle.moisture}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border/60">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Clock className="w-3.5 h-3.5" />
            {tr.parcelles.lastIrrigation}: {formatDate(parcelle.lastIrrigation, lang)}
          </div>
          <button className="flex items-center gap-1 text-primary font-bold text-sm hover:underline">
            {tr.parcelles.viewDetails}
            <Arrow className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
