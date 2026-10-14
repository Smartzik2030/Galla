import { useApp } from "@/contexts/AppContext";
import { getParcelles } from "@/lib/mockData";
import ParcelleCard from "@/components/features/ParcelleCard";
import { Leaf } from "lucide-react";

export default function Parcelles() {
  const { tr, user } = useApp();
  if (!user) return null;
  const parcelles = getParcelles(user.farmId);
  const totalArea = parcelles.reduce((s, p) => s + p.area, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-foreground">{tr.parcelles.title}</h1>
          <p className="text-muted-foreground mt-1 font-medium">{tr.parcelles.subtitle}</p>
        </div>
        <div className="flex items-center gap-3 bg-primary-soft rounded-2xl px-5 py-3">
          <Leaf className="w-6 h-6 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground font-semibold">{tr.parcelles.area}</p>
            <p className="text-xl font-black text-primary tabular-nums">
              {totalArea.toFixed(1)} <span className="text-sm font-bold">{tr.common.hectare}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {parcelles.map((p) => (
          <ParcelleCard key={p.id} parcelle={p} />
        ))}
      </div>
    </div>
  );
}
