import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { UserRole } from "@/lib/mockAuth";
import { Sprout, Shield, HardHat, UserCog, ArrowRight, ArrowLeft, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Login() {
  const { tr, login, lang, setLang } = useApp();
  const [role, setRole] = useState<UserRole>("worker");
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const roles: { id: UserRole; title: string; desc: string; Icon: typeof Shield; color: string }[] = [
    { id: "owner", title: tr.login.roleOwner, desc: tr.login.roleOwnerDesc, Icon: Shield, color: "#1F3A2E" },
    { id: "engineer", title: tr.login.roleEngineer, desc: tr.login.roleEngineerDesc, Icon: UserCog, color: "#C98A3A" },
    { id: "worker", title: tr.login.roleWorker, desc: tr.login.roleWorkerDesc, Icon: HardHat, color: "#5B8C3A" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Visual side */}
      <div className="hidden lg:flex lg:w-[45%] bg-primary-deep text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=1600&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-deep via-primary-deep/90 to-transparent" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shadow-lg">
              <Sprout className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black">{tr.appName}</h1>
              <p className="text-sm text-white/70">{tr.tagline}</p>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-4xl font-black leading-tight">
              {lang === "ar" ? (
                <>
                  منصة سحابية
                  <br />
                  <span className="text-accent">لإدارة مزرعتك</span>
                  <br />
                  بذكاء وفعالية
                </>
              ) : (
                <>
                  Plateforme cloud
                  <br />
                  <span className="text-accent">pour gérer</span>
                  <br />
                  votre ferme
                </>
              )}
            </h2>
            <div className="grid grid-cols-3 gap-3 pt-6">
              {[
                { k: "parcelles", v: "128" },
                { k: "farms", v: "47" },
                { k: "users", v: "1.2K" },
              ].map((s) => (
                <div key={s.k} className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/15">
                  <p className="text-2xl font-black">{s.v}</p>
                  <p className="text-xs text-white/60 uppercase font-bold mt-1">{s.k}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/50">© 2026 Galla · Smart agriculture platform</p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-end p-4">
          <div className="flex items-center bg-white rounded-xl p-1 border border-border">
            <button
              onClick={() => setLang("ar")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-bold transition-colors",
                lang === "ar" ? "bg-primary text-white" : "text-muted-foreground"
              )}
            >
              عربي
            </button>
            <button
              onClick={() => setLang("fr")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-bold transition-colors",
                lang === "fr" ? "bg-primary text-white" : "text-muted-foreground"
              )}
            >
              Français
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                <Sprout className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-primary">{tr.appName}</h1>
                <p className="text-xs text-muted-foreground">{tr.tagline}</p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-foreground">{tr.login.title}</h2>
            <p className="text-muted-foreground mt-2 mb-8">{tr.login.subtitle}</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-bold text-foreground block mb-2">
                  {tr.login.email}
                </label>
                <input
                  type="email"
                  defaultValue="worker@galla.ma"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-bold text-foreground block mb-2">
                  {tr.login.password}
                </label>
                <input
                  type="password"
                  defaultValue="demo1234"
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-bold text-foreground block mb-3">
                {tr.login.role}
              </label>
              <div className="space-y-2.5">
                {roles.map(({ id, title, desc, Icon, color }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setRole(id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-start",
                      role === id
                        ? "border-primary bg-primary-soft"
                        : "border-border bg-white hover:border-primary/40"
                    )}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color }} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground">{title}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 shrink-0 transition-colors",
                        role === id ? "border-primary bg-primary" : "border-border"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              {tr.login.submit}
              <Arrow className="w-5 h-5" />
            </button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              {tr.login.demoHint}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
