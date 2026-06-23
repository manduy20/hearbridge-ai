"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

const MOBILE_ITEMS = [
  { href: "/dashboard", label: "Home", icon: "dashboard" },
  { href: "/speech-to-text", label: "Transcribe", icon: "mic" },
  { href: "/history", label: "History", icon: "history" },
  { href: "/settings", label: "Settings", icon: "settings" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant flex justify-around items-center h-20 px-4 z-[100] shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
      {MOBILE_ITEMS.slice(0, 2).map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 ${
              isActive ? "text-primary" : "text-on-surface-variant"
            }`}
          >
            <Icon name={item.icon} filled={isActive} />
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        );
      })}
      <div className="mb-8 p-1 bg-surface rounded-full shadow-lg">
        <Link
          href="/speech-to-text"
          className="w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform"
        >
          <Icon name="add" className="text-3xl" />
        </Link>
      </div>
      {MOBILE_ITEMS.slice(2).map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 ${
              isActive ? "text-primary" : "text-on-surface-variant"
            }`}
          >
            <Icon name={item.icon} filled={isActive} />
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
