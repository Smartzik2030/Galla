import { useApp } from "@/contexts/AppContext";
import { getFinance, MONTHLY_FINANCE } from "@/lib/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
import { TrendingUp, TrendingDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import FinanceSummary from "@/components/features/FinanceSummary";

export default function Finance() {
  const { tr, lang, user } = useApp();
  if (!user) return null;
  const entries = getFinance(user.farmId);
  const maxVal = Math.max(...MONTHLY_FINANCE.map((m) => Math.max(m.income, m.expenses)));

  const categoryLabel = (c: string) => {
    const map = tr.finance.categories as Record<string, string>;
    return map[c] ?? c;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-foreground">{tr.finance.title}</h1>
        <p className="text-muted-foreground mt-1 font-medium">{tr.finance.subtitle}</p>
      </div>

      <FinanceSummary entries={entries} />

      {/* Monthly chart */}
      <div className="card-surface p-5">
        <h2 className="text-lg font-black text-foreground mb-5">{tr.finance.monthlyTrend}</h2>
        <div className="flex items-end justify-between gap-3 md:gap-5 h-56">
          {MONTHLY_FINANCE.map((m, i) => {
            const incomeH = (m.income / maxVal) * 100;
            const expH = (m.expenses / maxVal) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full">
                <div className="flex-1 w-full flex items-end gap-1">
                  <div
                    className="flex-1 rounded-t-lg bg-success/80 hover:bg-success transition-all relative group"
                    style={{ height: `${incomeH}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-success opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      {formatCurrency(m.income, lang)}
                    </span>
                  </div>
                  <div
                    className="flex-1 rounded-t-lg bg-danger/70 hover:bg-danger transition-all relative group"
                    style={{ height: `${expH}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-danger opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      {formatCurrency(m.expenses, lang)}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-muted-foreground">
                  {lang === "ar" ? m.month : m.monthFr}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-6 mt-5 pt-5 border-t border-border/60">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-success/80" />
            <span className="text-sm font-bold text-foreground">{tr.dashboard.income}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-danger/70" />
            <span className="text-sm font-bold text-foreground">{tr.dashboard.expenses}</span>
          </div>
        </div>
      </div>

      {/* Recent movements */}
      <div className="card-surface p-5">
        <h2 className="text-lg font-black text-foreground mb-4">{tr.finance.recent}</h2>
        <div className="space-y-2">
          {entries.map((e) => {
            const isIncome = e.type === "income";
            const Icon = isIncome ? ArrowUpRight : ArrowDownRight;
            return (
              <div
                key={e.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    isIncome ? "bg-success/15 text-success" : "bg-danger/15 text-danger"
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground truncate">
                    {lang === "ar" ? e.noteAr : e.noteFr}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">
                    {categoryLabel(e.category)} · {formatDate(e.date, lang)}
                  </p>
                </div>
                <p
                  className={`font-black tabular-nums ${
                    isIncome ? "text-success" : "text-danger"
                  }`}
                >
                  {isIncome ? "+" : "-"} {formatCurrency(e.amount, lang)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
