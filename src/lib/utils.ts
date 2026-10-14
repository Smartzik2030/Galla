import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, lang: "ar" | "fr" = "ar") {
  const formatter = new Intl.NumberFormat(lang === "ar" ? "ar-MA" : "fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
}

export function formatDate(date: Date | string, lang: "ar" | "fr" = "ar") {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-MA" : "fr-MA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}
