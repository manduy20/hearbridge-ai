"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/speech-to-text", label: "Speech-to-Text", icon: "mic" },
  { href: "/text-to-speech", label: "Text-to-Speech", icon: "volume_up" },
  { href: "/assistant", label: "AI Assistant", icon: "smart_toy" },
  { href: "/history", label: "History", icon: "history" },
  { href: "/settings", label: "Settings", icon: "settings" },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden lg:flex flex-col h-screen fixed left-0 top-0 py-6 space-y-4 bg-surface-container-low border-r border-outline-variant w-64 z-50"
      id="side-nav"
    >
      <div className="px-6 mb-8">
        <Link href="/" className="block">
          <h1 className="font-face-headline-lg text-headline-lg font-bold text-primary">
            HearBridge AI
          </h1>
        </Link>
        <p className="font-label-md text-label-md text-on-surface-variant opacity-70">
          Empowering Communication
        </p>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 mx-0 my-1 rounded-xl transition-all ${
                isActive
                  ? "bg-primary-container text-on-primary-container shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <Icon name={item.icon} filled={isActive} />
              <span className="font-label-md text-label-md">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-4 mt-auto">
        <Link
          href="/speech-to-text"
          className="w-full py-4 bg-primary text-on-primary rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
        >
          <Icon name="mic" />
          Start Recording
        </Link>
        <div className="mt-6 flex items-center gap-3 p-2 bg-surface-container-highest rounded-xl">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold">
            B
          </div>
          <div className="overflow-hidden">
            <p className="font-label-md text-label-md truncate text-on-surface">
              Budi Pratama
            </p>
            <p className="font-caption text-caption text-on-surface-variant truncate">
              Premium User
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
