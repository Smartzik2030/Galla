import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { getCurrentUser, login as doLogin, logout as doLogout, User, UserRole } from "@/lib/mockAuth";
import { Lang, t } from "@/lib/i18n";

interface AppContextValue {
  user: User | null;
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: ReturnType<typeof t>;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const LANG_KEY = "galla_lang";

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getCurrentUser());
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem(LANG_KEY) as Lang | null;
    return stored ?? "ar";
  });

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const value = useMemo<AppContextValue>(
    () => ({
      user,
      lang,
      setLang: setLangState,
      tr: t(lang),
      login: (role: UserRole) => setUser(doLogin(role)),
      logout: () => {
        doLogout();
        setUser(null);
      },
    }),
    [user, lang]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
