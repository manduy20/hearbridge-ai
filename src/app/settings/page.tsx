import AppShell from "@/components/AppShell";
import Icon from "@/components/Icon";

export default function SettingsPage() {
  return (
    <AppShell>
      <main className="flex-1 p-margin-mobile md:p-margin-desktop bg-surface min-h-screen">
        <header className="mb-gut-xl">
          <h2 className="font-face-headline-lg text-headline-lg text-on-surface">
            Settings
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Kelola preferensi akun dan aplikasi Anda.
          </p>
        </header>

        <div className="max-w-2xl space-y-gut-md">
          <div className="bg-surface-container-lowest p-gut-lg rounded-xl border border-outline-variant custom-shadow flex items-center gap-gut-lg">
            <div className="w-14 h-14 bg-primary flex items-center justify-center text-on-primary rounded-full font-bold text-xl">
              B
            </div>
            <div>
              <p className="font-title-lg text-title-lg text-on-surface">
                Budi Pratama
              </p>
              <p className="font-caption text-caption text-on-surface-variant">
                Premium User
              </p>
            </div>
          </div>

          {[
            { icon: "language", label: "Bahasa Default Transkripsi" },
            { icon: "record_voice_over", label: "Suara Default TTS" },
            { icon: "notifications", label: "Notifikasi" },
            { icon: "dark_mode", label: "Tampilan Gelap" },
            { icon: "lock", label: "Privasi & Keamanan" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-surface-container-lowest p-gut-md rounded-xl border border-outline-variant flex items-center justify-between hover:border-primary transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-gut-md">
                <Icon name={item.icon} className="text-primary" />
                <span className="font-label-md text-label-md text-on-surface">
                  {item.label}
                </span>
              </div>
              <Icon name="chevron_right" className="text-on-surface-variant" />
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
