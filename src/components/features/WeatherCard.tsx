import { Sun, Cloud, CloudRain, CloudSun, Wind, Droplet, Thermometer } from "lucide-react";
import { WEATHER_FORECAST } from "@/lib/mockData";
import { useApp } from "@/contexts/AppContext";

const IconMap: Record<string, typeof Sun> = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  partlyCloudy: CloudSun,
};

export default function WeatherCard() {
  const { tr, lang } = useApp();
  const today = WEATHER_FORECAST[0];
  const TodayIcon = IconMap[today.cond] ?? Sun;

  return (
    <div className="card-surface overflow-hidden">
      <div className="relative bg-gradient-to-br from-primary to-primary-deep text-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-white/70">{tr.dashboard.weather}</p>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-5xl font-black">{today.temp}°</span>
              <span className="text-base font-semibold text-white/80 mb-2">
                {tr.weather[today.cond as keyof typeof tr.weather]}
              </span>
            </div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
            <TodayIcon className="w-9 h-9 text-white" strokeWidth={1.8} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-white/15">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-white/70" />
            <div>
              <p className="text-xs text-white/60">{tr.weather.temp}</p>
              <p className="text-sm font-bold">24-28°</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Droplet className="w-4 h-4 text-white/70" />
            <div>
              <p className="text-xs text-white/60">{tr.weather.humidity}</p>
              <p className="text-sm font-bold">52%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-white/70" />
            <div>
              <p className="text-xs text-white/60">{tr.weather.wind}</p>
              <p className="text-sm font-bold">12 {tr.common.kmh}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-card">
        <p className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">
          {tr.weather.forecast}
        </p>
        <div className="flex gap-2 overflow-x-auto">
          {WEATHER_FORECAST.map((d, i) => {
            const Icon = IconMap[d.cond] ?? Sun;
            return (
              <div
                key={i}
                className="flex-1 min-w-[60px] flex flex-col items-center p-2 rounded-xl bg-muted/50"
              >
                <span className="text-xs font-bold text-foreground">
                  {lang === "ar" ? d.day : d.dayFr}
                </span>
                <Icon className="w-6 h-6 my-1 text-primary" strokeWidth={2} />
                <span className="text-sm font-black text-foreground">{d.temp}°</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
