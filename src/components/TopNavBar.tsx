"use client";

import Link from "next/link";

export default function TopNavBar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface border-b border-outline-variant shadow-sm h-20">
      <nav className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-full max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <span className="font-face-headline-lg text-headline-lg font-bold text-primary">
            HearBridge AI
          </span>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/speech-to-text"
              className="font-title-lg text-title-lg text-on-surface-variant hover:text-primary transition-colors"
            >
              STT
            </Link>
            <Link
              href="/text-to-speech"
              className="font-title-lg text-title-lg text-on-surface-variant hover:text-primary transition-colors"
            >
              TTS
            </Link>
            <Link
              href="/history"
              className="font-title-lg text-title-lg text-on-surface-variant hover:text-primary transition-colors"
            >
              History
            </Link>
            <Link
              href="/assistant"
              className="font-title-lg text-title-lg text-on-surface-variant hover:text-primary transition-colors"
            >
              AI Assistant
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/settings"
            className="px-6 py-2 rounded-xl font-label-md text-label-md text-primary hover:bg-surface-container-low transition-all active:scale-95 duration-150"
          >
            Profile
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-2 rounded-xl font-label-md text-label-md bg-primary text-on-primary hover:shadow-lg transition-all active:scale-95 duration-150"
          >
            Masuk Dashboard
          </Link>
        </div>
      </nav>
    </header>
  );
}
