export interface Parcelle {
  id: string;
  farmId: string;
  name: string;
  cropAr: string;
  cropFr: string;
  area: number;
  moisture: number;
  health: "excellent" | "good" | "warning" | "critical";
  lastIrrigation: string;
  color: string;
}

export interface Task {
  id: string;
  farmId: string;
  titleAr: string;
  titleFr: string;
  parcelleId: string;
  assignedToId: string;
  assignedToName: string;
  urgent: boolean;
  done: boolean;
  due: string;
  icon: string;
}

export interface FinanceEntry {
  id: string;
  farmId: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
  noteAr: string;
  noteFr: string;
}

const TASKS_KEY = "galla_tasks";

export const PARCELLES: Parcelle[] = [
  {
    id: "p_1",
    farmId: "farm_1",
    name: "القطعة A1",
    cropAr: "طماطم",
    cropFr: "Tomates",
    area: 3.5,
    moisture: 68,
    health: "excellent",
    lastIrrigation: "2026-10-13T06:00:00",
    color: "#D64545",
  },
  {
    id: "p_2",
    farmId: "farm_1",
    name: "القطعة B2",
    cropAr: "زيتون",
    cropFr: "Oliviers",
    area: 12,
    moisture: 42,
    health: "good",
    lastIrrigation: "2026-10-11T05:30:00",
    color: "#5B8C3A",
  },
  {
    id: "p_3",
    farmId: "farm_1",
    name: "القطعة C3",
    cropAr: "قمح",
    cropFr: "Blé",
    area: 8.2,
    moisture: 28,
    health: "warning",
    lastIrrigation: "2026-10-09T06:15:00",
    color: "#D4A845",
  },
  {
    id: "p_4",
    farmId: "farm_1",
    name: "القطعة D4",
    cropAr: "برتقال",
    cropFr: "Oranges",
    area: 5.8,
    moisture: 15,
    health: "critical",
    lastIrrigation: "2026-10-06T07:00:00",
    color: "#F19B2E",
  },
  {
    id: "p_5",
    farmId: "farm_1",
    name: "القطعة E5",
    cropAr: "فلفل",
    cropFr: "Poivrons",
    area: 2.1,
    moisture: 72,
    health: "excellent",
    lastIrrigation: "2026-10-13T05:00:00",
    color: "#2E8B57",
  },
];

const DEFAULT_TASKS: Task[] = [
  {
    id: "t_1",
    farmId: "farm_1",
    titleAr: "سقي القطعة D4 (برتقال)",
    titleFr: "Irriguer la parcelle D4 (Oranges)",
    parcelleId: "p_4",
    assignedToId: "u_worker_1",
    assignedToName: "يوسف",
    urgent: true,
    done: false,
    due: "2026-10-13T08:00:00",
    icon: "droplets",
  },
  {
    id: "t_2",
    farmId: "farm_1",
    titleAr: "رش المبيدات على الطماطم A1",
    titleFr: "Pulvériser les pesticides sur A1",
    parcelleId: "p_1",
    assignedToId: "u_worker_1",
    assignedToName: "يوسف",
    urgent: false,
    done: false,
    due: "2026-10-13T10:30:00",
    icon: "spray",
  },
  {
    id: "t_3",
    farmId: "farm_1",
    titleAr: "فحص رطوبة التربة C3",
    titleFr: "Vérifier l'humidité du sol C3",
    parcelleId: "p_3",
    assignedToId: "u_worker_1",
    assignedToName: "يوسف",
    urgent: true,
    done: false,
    due: "2026-10-13T11:00:00",
    icon: "gauge",
  },
  {
    id: "t_4",
    farmId: "farm_1",
    titleAr: "جني الفلفل من E5",
    titleFr: "Récolter les poivrons E5",
    parcelleId: "p_5",
    assignedToId: "u_worker_1",
    assignedToName: "يوسف",
    urgent: false,
    done: true,
    due: "2026-10-13T07:00:00",
    icon: "shopping-basket",
  },
  {
    id: "t_5",
    farmId: "farm_1",
    titleAr: "تقليم أشجار الزيتون B2",
    titleFr: "Tailler les oliviers B2",
    parcelleId: "p_2",
    assignedToId: "u_worker_1",
    assignedToName: "يوسف",
    urgent: false,
    done: false,
    due: "2026-10-13T14:00:00",
    icon: "scissors",
  },
  {
    id: "t_6",
    farmId: "farm_1",
    titleAr: "تسميد القطعة A1",
    titleFr: "Fertiliser la parcelle A1",
    parcelleId: "p_1",
    assignedToId: "u_worker_1",
    assignedToName: "يوسف",
    urgent: false,
    done: true,
    due: "2026-10-13T06:30:00",
    icon: "sprout",
  },
];

export const FINANCE_ENTRIES: FinanceEntry[] = [
  { id: "f1", farmId: "farm_1", type: "income", category: "harvest", amount: 42000, date: "2026-10-10", noteAr: "بيع محصول الطماطم", noteFr: "Vente récolte tomates" },
  { id: "f2", farmId: "farm_1", type: "expense", category: "fertilizer", amount: 8500, date: "2026-10-08", noteAr: "شراء أسمدة طبيعية", noteFr: "Achat engrais bio" },
  { id: "f3", farmId: "farm_1", type: "expense", category: "labor", amount: 12000, date: "2026-10-05", noteAr: "أجور العمال الأسبوعية", noteFr: "Salaires hebdo ouvriers" },
  { id: "f4", farmId: "farm_1", type: "income", category: "subsidy", amount: 15000, date: "2026-10-02", noteAr: "دعم فلاحي للزيتون", noteFr: "Subvention oliviers" },
  { id: "f5", farmId: "farm_1", type: "expense", category: "fuel", amount: 3200, date: "2026-09-28", noteAr: "محروقات الجرار", noteFr: "Carburant tracteur" },
  { id: "f6", farmId: "farm_1", type: "expense", category: "seeds", amount: 5400, date: "2026-09-20", noteAr: "بذور فلفل جديد", noteFr: "Nouvelles semences poivron" },
  { id: "f7", farmId: "farm_1", type: "income", category: "harvest", amount: 28000, date: "2026-09-15", noteAr: "بيع البرتقال", noteFr: "Vente oranges" },
  { id: "f8", farmId: "farm_1", type: "expense", category: "equipment", amount: 18000, date: "2026-09-10", noteAr: "صيانة نظام الري", noteFr: "Entretien irrigation" },
];

export const MONTHLY_FINANCE = [
  { month: "مايو", monthFr: "Mai", income: 38000, expenses: 22000 },
  { month: "يونيو", monthFr: "Juin", income: 45000, expenses: 28000 },
  { month: "يوليو", monthFr: "Juil.", income: 52000, expenses: 31000 },
  { month: "غشت", monthFr: "Août", income: 61000, expenses: 29000 },
  { month: "شتنبر", monthFr: "Sept.", income: 43000, expenses: 26600 },
  { month: "أكتوبر", monthFr: "Oct.", income: 57000, expenses: 23700 },
];

export const WEATHER_FORECAST = [
  { day: "اليوم", dayFr: "Auj.", temp: 26, cond: "sunny" },
  { day: "الأربعاء", dayFr: "Mer.", temp: 28, cond: "sunny" },
  { day: "الخميس", dayFr: "Jeu.", temp: 24, cond: "partlyCloudy" },
  { day: "الجمعة", dayFr: "Ven.", temp: 22, cond: "rainy" },
  { day: "السبت", dayFr: "Sam.", temp: 23, cond: "cloudy" },
  { day: "الأحد", dayFr: "Dim.", temp: 25, cond: "sunny" },
];

export function getTasks(farmId: string): Task[] {
  const raw = localStorage.getItem(TASKS_KEY);
  if (!raw) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(DEFAULT_TASKS));
    return DEFAULT_TASKS.filter((t) => t.farmId === farmId);
  }
  try {
    const parsed = JSON.parse(raw) as Task[];
    return parsed.filter((t) => t.farmId === farmId);
  } catch {
    return DEFAULT_TASKS.filter((t) => t.farmId === farmId);
  }
}

export function toggleTask(taskId: string): Task[] {
  const raw = localStorage.getItem(TASKS_KEY);
  const list: Task[] = raw ? JSON.parse(raw) : DEFAULT_TASKS;
  const updated = list.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t));
  localStorage.setItem(TASKS_KEY, JSON.stringify(updated));
  return updated;
}

export function getParcelles(farmId: string): Parcelle[] {
  return PARCELLES.filter((p) => p.farmId === farmId);
}

export function getFinance(farmId: string): FinanceEntry[] {
  return FINANCE_ENTRIES.filter((f) => f.farmId === farmId);
}
