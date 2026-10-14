import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export default function NotFound() {
  const { tr, lang } = useApp();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
      <div className="w-20 h-20 rounded-3xl bg-primary-soft flex items-center justify-center">
        <Sprout className="w-10 h-10 text-primary" />
      </div>
      <h1 className="mt-6 text-5xl font-black text-foreground">404</h1>
      <p className="mt-3 text-lg text-muted-foreground font-semibold">
        {lang === "ar" ? "الصفحة غير موجودة" : "Page introuvable"}
      </p>
      <Link to="/" className="btn-primary mt-6">
        {tr.nav.dashboard}
      </Link>
    </div>
  );
}
