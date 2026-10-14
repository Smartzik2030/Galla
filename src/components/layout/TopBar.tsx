import { useApp } from "@/contexts/AppContext";
import { Globe, Bell, Sprout } from "lucide-react";

export default function TopBar() {
  const { lang, setLang, tr, user } = useApp();

  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between gap-3 px-4 md:px-8 py-3 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black text-primary">{tr.appName}</span>
        </div>

        <div className="hidden md:block">
          <p className="text-sm text-muted-foreground font-medium">
            {new Date().toLocaleDateString(lang === "ar" ? "ar-MA" : "fr-MA", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          {user && (
            <p className="text-xs text-muted-foreground">
              {user.farmName}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white rounded-xl p-1 border border-border">
            <button
              onClick={() => setLang("ar")}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                lang === "ar" ? "bg-primary text-white" : "text-muted-foreground"
              }`}
            >
              عربي
            </button>
            <button
              onClick={() => setLang("fr")}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                lang === "fr" ? "bg-primary text-white" : "text-muted-foreground"
              }`}
            >
              FR
            </button>
          </div>

          <button className="relative w-11 h-11 rounded-xl bg-white border border-border flex items-center justify-center hover:border-primary/40 transition-colors">
            <Bell className="w-5 h-5 text-primary" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-warning animate-pulse-soft" />
          </button>
        </div>
      </div>
    </header>
  );
}
