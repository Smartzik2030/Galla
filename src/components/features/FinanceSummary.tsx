import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { FinanceEntry } from "@/lib/mockData";
import { useApp } from "@/contexts/AppContext";
import { formatCurrency } from "@/lib/utils";

interface Props {
  entries: FinanceEntry[];
}

export default function FinanceSummary({ entries }: Props) {
  const { tr, lang } = useApp();
  const income = entries.filter((e) => e.type === "income").reduce((s, e) => s + e.amount, 0);
  const expenses = entries.filter((e) => e.type === "expense").reduce((s, e) => s + e.amount, 0);
  const net = income - expenses;

  const items = [
    {
      label: tr.dashboard.income,
      value: income,
      Icon: TrendingUp,
      bg: "bg-success/10",
      text: "text-success",
    },
    {
      label: tr.dashboard.expenses,
      value: expenses,
      Icon: TrendingDown,
      bg: "bg-danger/10",
      text: "text-danger",
    },
    {
      label: tr.dashboard.net,
      value: net,
      Icon: Wallet,
      bg: "bg-primary-soft",
      text: "text-primary",
    },
  ];

  return (
    <div className="card-surface p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-foreground">{tr.dashboard.incomeSummary}</h2>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {items.map((it) => (
          <div key={it.label} className={`${it.bg} rounded-2xl p-4`}>
            <it.Icon className={`w-5 h-5 ${it.text}`} />
            <p className="text-xs text-muted-foreground mt-2 font-semibold">{it.label}</p>
            <p className={`text-lg md:text-xl font-black mt-1 ${it.text} tabular-nums`}>
              {formatCurrency(it.value, lang)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
