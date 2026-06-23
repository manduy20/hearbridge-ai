import React, { useState, useEffect } from "react"; // Pastikan 'React' ikut diimpor
import AppShell from "@/components/AppShell";
import Icon from "@/components/Icon";

// Sisa kode komponen Anda di bawah...
// Definisikan tipe data untuk item aktivitas
interface RecentItem {
  title: string;
  tag: "Speech to Text" | "Text to Speech" | "AI Assistant";
  time: string;
  icon: string;
}

export default function DashboardPage() {
  // State Autentikasi
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  
  // State Recent Items (Mulai dari kosong untuk user baru)
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  
  // State Interaktivitas Aplikasi
  const [cloudStorage, setCloudStorage] = useState(0.0); // 0 GB terpakai untuk user baru
  const totalStorage = 5.0;

  // Cek sesi login saat component dimuat
  useEffect(() => {
    const savedUser = localStorage.getItem("hearbridge_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      // Simulasi mengambil data history spesifik user dari localStorage jika ada
      const savedHistory = localStorage.getItem(`history_${JSON.parse(savedUser).name}`);
      if (savedHistory) {
        setRecentItems(JSON.parse(savedHistory));
        setCloudStorage(4.25); // simulasi storage terisi jika ada history
      }
    }
  }, []);

  // Handler Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      alert("Silakan isi email dan password!");
      return;
    }
    const loggedInUser = { name: "Budi" };
    localStorage.setItem("hearbridge_user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    
    // User baru login -> history diset kosong []
    setRecentItems([]);
    setCloudStorage(0.0);
  };

  // Handler Logout
  const handleLogout = () => {
    localStorage.removeItem("hearbridge_user");
    setUser(null);
  };

  // Handler Unduh Dokumen
  const handleDownload = (title: string, format: "PDF" | "TXT") => {
    alert(`Mengunduh "${title}" dalam format ${format}...`);
  };

  // Handler Upgrade Storage
  const handleUpgradeStorage = () => {
    alert("Membuka halaman pembayaran upgrade Cloud Storage ke 50 GB...");
  };

  // Tampilan Halaman Login jika Belum Terautentikasi
  if (!user) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-margin-mobile">
        <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">HearBridge AI</h1>
            <p className="text-sm text-on-surface-variant">
              Masuk untuk mengakses dashboard komunikasi digital Anda
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">Email</label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="budi@email.com"
                className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant text-on-surface focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">Password</label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant text-on-surface focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-on-primary font-bold rounded-xl hover:shadow-lg transition-all active:scale-95"
            >
              Masuk Ke Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      <main className="flex-1 p-margin-mobile md:p-margin-desktop bg-surface min-h-screen">
        {/* Dashboard Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-gut-xl">
          <div>
            <div className="flex items-center gap-4">
              <h2 className="font-face-headline-lg text-headline-lg text-on-surface">
                Halo, {user.name}!
              </h2>
              <button 
                onClick={handleLogout}
                className="text-xs px-3 py-1 bg-surface-container-high hover:bg-error/10 hover:text-error text-on-surface-variant font-bold rounded-full transition-colors flex items-center gap-1"
              >
                <Icon name="logout" className="text-sm" /> Keluar
              </button>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Siap untuk mengubah suara menjadi data yang bermakna hari ini?
            </p>
          </div>
          <div className="flex items-center gap-gut-sm">
            <div className="bg-surface-container-highest p-base rounded-full text-primary">
              <Icon name="calendar_today" />
            </div>
            <span className="font-label-md text-label-md text-on-surface">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Bento Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-gut-lg mb-gut-2xl">
          <div className="bg-surface-container-lowest p-gut-lg rounded-xl border border-outline-variant custom-shadow flex items-center gap-gut-lg">
            <div className="w-14 h-14 bg-primary-fixed rounded-xl flex items-center justify-center text-primary">
              <Icon name="description" className="text-3xl" />
            </div>
            <div>
              <p className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                Jumlah Transkripsi
              </p>
              <h3 className="font-face-display-lg text-headline-lg text-on-surface">
                {recentItems.length}
              </h3>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-gut-lg rounded-xl border border-outline-variant custom-shadow flex items-center gap-gut-lg">
            <div className="w-14 h-14 bg-surface-container-high rounded-xl flex items-center justify-center text-primary">
              <Icon name="audio_file" className="text-3xl" />
            </div>
            <div>
              <p className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                Audio Diproses
              </p>
              <h3 className="font-face-display-lg text-headline-lg text-on-surface">
                {recentItems.length > 0 ? "42.5 Jam" : "0 Jam"}
              </h3>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-gut-lg rounded-xl border border-outline-variant custom-shadow flex items-center gap-gut-lg">
            <div className="w-14 h-14 bg-tertiary-fixed rounded-xl flex items-center justify-center text-tertiary">
              <Icon name="folder_shared" className="text-3xl" />
            </div>
            <div>
              <p className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                Dokumen Tersimpan
              </p>
              <h3 className="font-face-display-lg text-headline-lg text-on-surface">
                {recentItems.length}
              </h3>
            </div>
          </div>
        </section>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-gut-2xl">
          {/* Recent Transcriptions List */}
          <section className="xl:col-span-2">
            <div className="flex justify-between items-center mb-gut-md">
              <h3 className="font-title-lg text-title-lg text-on-surface">
                Aktivitas Terakhir
              </h3>
              {recentItems.length > 0 && (
                <a
                  href="/history"
                  className="text-primary font-label-md text-label-md flex items-center gap-gut-xs hover:underline decoration-2"
                >
                  Lihat Semua History
                  <Icon name="arrow_forward" />
                </a>
              )}
            </div>

            {/* Kondisional Rendering: Jika kosong tampilkan UI khusus Empty State */}
            {recentItems.length === 0 ? (
              <div className="bg-surface-container-lowest border border-dashed border-outline-variant rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[350px]">
                <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface-variant mb-4">
                  <Icon name="history_toggle_off" className="text-3xl" />
                </div>
                <h4 className="font-title-lg text-title-lg text-on-surface mb-2">
                  Belum Ada Aktivitas
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-6">
                  Anda belum melakukan transkripsi atau menggunakan AI Assistant. Mulai sekarang untuk melihat history Anda di sini.
                </p>
                <div className="flex gap-4">
                  <a href="/speech-to-text" className="px-4 py-2 bg-primary text-on-primary font-label-md rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2">
                    <Icon name="mic" /> Mulai STT
                  </a>
                  <a href="/text-to-speech" className="px-4 py-2 bg-surface-container-high text-on-surface font-label-md rounded-xl hover:bg-surface-container-highest transition-all active:scale-95 flex items-center gap-2">
                    <Icon name="volume_up" /> Mulai TTS
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-gut-md">
                {recentItems.map((item) => (
                  <div
                    key={item.title}
                    className="bg-surface-container-lowest p-gut-md rounded-xl border border-outline-variant custom-shadow flex flex-col md:flex-row md:items-center justify-between gap-gut-md group hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-gut-md">
                      <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center text-primary">
                        <Icon name={item.icon} />
                      </div>
                      <div>
                        <h4 className="font-title-lg text-title-lg text-on-surface text-[18px]">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-gut-sm mt-gut-xs">
                          <span className="px-2 py-0.5 bg-surface-container-high rounded text-[10px] font-bold text-on-secondary-container uppercase">
                            {item.tag}
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
                            <Icon name="schedule" className="text-[14px]" />{" "}
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-gut-sm">
                      <button
                        onClick={() => handleDownload(item.title, "PDF")}
                        className="flex items-center gap-gut-xs px-gut-md py-gut-sm bg-surface-container hover:bg-primary-container hover:text-primary transition-all rounded-xl"
                      >
                        <Icon name="picture_as_pdf" className="text-base" /> PDF
                      </button>
                      <button
                        onClick={() => handleDownload(item.title, "TXT")}
                        className="flex items-center gap-gut-xs px-gut-md py-gut-sm bg-surface-container hover:bg-primary-container hover:text-primary transition-all rounded-xl"
                      >
                        <Icon name="article" className="text-base" /> TXT
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside className="space-y-gut-2xl">
            <div className="bg-surface-container-lowest p-gut-lg rounded-2xl border border-outline-variant custom-shadow">
              <div className="flex items-center justify-between mb-gut-md">
                <div>
                  <p className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                    Cloud Storage
                  </p>
                  <h4 className="font-title-lg text-title-lg text-on-surface">
                    {cloudStorage.toFixed(2)} GB / {totalStorage.toFixed(0)} GB
                  </h4>
                </div>
                <Icon name="cloud" className="text-3xl text-primary" />
              </div>
              <div className="h-2 w-full rounded-full bg-surface-container-high overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(cloudStorage / totalStorage) * 100}%` }}
                />
              </div>
              <button
                onClick={handleUpgradeStorage}
                className="mt-gut-lg w-full py-3 bg-primary text-on-primary font-bold rounded-xl hover:shadow-lg transition-all active:scale-95"
              >
                Upgrade Storage
              </button>
            </div>
          </aside>
        </div>
      </main>
    </AppShell>
  );
}
