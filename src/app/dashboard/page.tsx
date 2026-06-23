import AppShell from "@/components/AppShell";
import Icon from "@/components/Icon";

const RECENT_ITEMS = [
  {
    title: "Rapat Strategi Marketing Q4",
    icon: "meeting_room",
    tag: "Business",
    time: "14:30 • 45m",
  },
  {
    title: "Kelas Bahasa Inggris Online",
    icon: "school",
    tag: "Pendidikan",
    time: "10:00 • 60m",
  },
  {
    title: "Konsultasi Dokter Spesialis",
    icon: "medical_services",
    tag: "Kesehatan",
    time: "09:15 • 20m",
  },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <main className="flex-1 p-margin-mobile md:p-margin-desktop bg-surface min-h-screen">
        {/* Dashboard Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-gut-xl">
          <div>
            <h2 className="font-face-headline-lg text-headline-lg text-on-surface">
              Halo, Budi!
            </h2>
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
                1.284
              </h3>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-gut-lg rounded-xl border border-outline-variant custom-shadow flex items-center gap-gut-lg">
            <div className="w-14 h-14 bg-surface-container-high rounded-xl flex items-center justify-center text-primary">
              <Icon name="audio_file" className="text-3xl" filled />
            </div>
            <div>
              <p className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                Audio Diproses
              </p>
              <h3 className="font-face-display-lg text-headline-lg text-on-surface">
                42.5 Jam
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
                856
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
              <a
                href="/history"
                className="text-primary font-label-md text-label-md flex items-center gap-gut-xs hover:underline decoration-2"
              >
                Lihat Semua History
                <Icon name="arrow_forward" />
              </a>
            </div>
            <div className="space-y-gut-md">
              {RECENT_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="bg-surface-container-lowest p-gut-md rounded-xl border border-outline-variant custom-shadow flex flex-col md:flex-row md:items-center justify-between gap-gut-md group hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-gut-md">
                    <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center text-primary-container">
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
                    <button className="flex items-center gap-gut-xs px-gut-md py-gut-sm bg-surface-container hover:bg-primary-container hover:text-on-primary-container rounded-lg font-label-md text-label-md transition-all active:scale-95">
                      <Icon name="picture_as_pdf" className="text-[20px]" />
                      PDF
                    </button>
                    <button className="flex items-center gap-gut-xs px-gut-md py-gut-sm bg-surface-container hover:bg-primary-container hover:text-on-primary-container rounded-lg font-label-md text-label-md transition-all active:scale-95">
                      <Icon name="article" className="text-[20px]" />
                      TXT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sidebar Insights */}
          <section className="space-y-gut-lg">
            <div className="bg-inverse-surface text-on-primary p-gut-lg rounded-xl custom-shadow overflow-hidden relative group">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-gut-md">
                  <h4 className="font-title-lg text-title-lg flex items-center gap-gut-sm">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-error" />
                    </span>
                    Standby Listening
                  </h4>
                  <span className="font-caption text-caption opacity-80">
                    Device: Internal Mic
                  </span>
                </div>
                <div className="flex items-end gap-1 h-8 mb-gut-md">
                  {[0.1, 0.3, 0.2, 0.4, 0.1, 0.5].map((d, i) => (
                    <div
                      key={i}
                      className="waveform-bar w-1 bg-primary-fixed rounded-full"
                      style={{ animationDelay: `${d}s` }}
                    />
                  ))}
                </div>
                <p className="font-body-md text-body-md opacity-90 italic">
                  &quot;Gunakan asisten AI untuk merangkum poin-poin penting
                  secara otomatis...&quot;
                </p>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary opacity-20 blur-3xl rounded-full group-hover:opacity-40 transition-opacity" />
            </div>

            <div className="bg-surface-container-lowest p-gut-lg rounded-xl border border-outline-variant custom-shadow">
              <div className="flex justify-between items-center mb-gut-md">
                <h4 className="font-title-lg text-title-lg text-on-surface">
                  Penyimpanan Cloud
                </h4>
                <span className="font-label-md text-label-md text-primary font-bold">
                  85%
                </span>
              </div>
              <div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden mb-gut-sm">
                <div className="bg-primary h-full w-[85%] rounded-full" />
              </div>
              <div className="flex justify-between font-caption text-caption text-on-surface-variant">
                <span>4.25 GB Terpakai</span>
                <span>5 GB Total</span>
              </div>
              <button className="w-full mt-gut-lg py-gut-md border border-primary text-primary rounded-xl font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all">
                Upgrade Penyimpanan
              </button>
            </div>

            <div className="p-gut-lg rounded-xl bg-inverse-surface text-on-primary flex flex-col justify-end min-h-[200px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 to-transparent" />
              <div className="relative z-10">
                <h4 className="font-title-lg text-title-lg">Tips Efisiensi</h4>
                <p className="font-body-md text-body-md mt-1 opacity-90">
                  Cara menggunakan AI Assistant untuk notulensi rapat otomatis.
                </p>
                <a
                  href="/assistant"
                  className="mt-gut-md text-primary-fixed font-bold flex items-center gap-1 hover:underline w-fit"
                >
                  Baca Tutorial
                  <Icon name="open_in_new" className="text-[18px]" />
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Footer (Within Canvas) */}
        <footer className="mt-gut-3xl pt-gut-2xl border-t border-outline-variant w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-gut-lg text-center md:text-left">
            <div>
              <h5 className="font-title-lg text-title-lg font-bold text-primary">
                HearBridge AI
              </h5>
              <p className="font-body-md text-body-md text-on-surface-variant mt-gut-xs max-w-md">
                © 2024 HearBridge AI. Jembatan Komunikasi Digital untuk Semua.
                Membantu komunitas tunarungu berkomunikasi lebih baik.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-gut-lg">
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
                Terms of Service
              </a>
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
                Contact Support
              </a>
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
                Help Center
              </a>
            </div>
          </div>
        </footer>
      </main>
    </AppShell>
  );
}
