import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import MobileNav from "./MobileNav";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 max-w-[1400px] w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
