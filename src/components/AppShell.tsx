import SideNav from "./SideNav";
import MobileNav from "./MobileNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-surface">
      <SideNav />
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen pb-20 lg:pb-0">
        {children}
      </div>
      <MobileNav />
    </div>
  );
}
