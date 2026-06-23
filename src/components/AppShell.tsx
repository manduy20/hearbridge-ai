import React from "react";
import SideNav from "./SideNav";
import MobileNav from "./MobileNav";

interface AppShellProps {
  children: React.ReactNode;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

export default function AppShell({ children, userName, userEmail, onLogout }: AppShellProps) {
  return (
    <div className="flex h-screen bg-white">
      
      {/* ======================================= */}
      {/* SIDEBAR KIRI (DESKTOP) */}
      {/* ======================================= */}
      <aside className="hidden md:flex flex-col w-72 border-r border-gray-200 bg-gray-50 h-full">
        
        {/* Area Navigasi Atas */}
        <div className="flex-1 overflow-y-auto">
          <SideNav />
        </div>

        {/* Area Profil & Logout di Bagian Bawah */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 overflow-hidden">
               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">
                  {userName ? userName.charAt(0).toUpperCase() : "U"}
               </div>
               <div className="overflow-hidden">
                  <p className="font-bold text-sm text-gray-900 truncate">{userName || "User"}</p>
                  <p className="text-xs text-gray-500 truncate">{userEmail || "Premium User"}</p>
               </div>
            </div>
            
            {/* Tombol Logout */}
            {onLogout && (
              <button 
                onClick={onLogout} 
                className="text-red-500 hover:text-red-700 text-sm font-semibold p-2"
                title="Keluar"
              >
                Keluar
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ======================================= */}
      {/* AREA KONTEN UTAMA (KANAN) */}
      {/* ======================================= */}
      <div className="flex flex-col flex-1 h-full overflow-hidden w-full relative">
        
        {/* Konten Halaman Chat AI Anda akan masuk di sini */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* Navigasi Bawah untuk Mobile */}
        <div className="md:hidden">
          <MobileNav />
        </div>
                
      </div>
      <MobileNav />
    </div>
  );
}
