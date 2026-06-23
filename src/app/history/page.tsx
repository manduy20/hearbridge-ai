import AppShell from "@/components/AppShell";
import Icon from "@/components/Icon";

const HISTORY_ITEMS = [
  {
    date: "14 Jun 2026 • 10:30",
    title: "Rapat Tim Pengembangan",
    snippet: "Mari kita bahas fitur accessibility untuk update minggu depan...",
  },
  {
    date: "13 Jun 2026 • 15:45",
    title: "Konsultasi Dokter",
    snippet: "Pasien perlu menjaga pola makan dan istirahat yang cukup...",
  },
  {
    date: "12 Jun 2026 • 09:15",
    title: "Wawancara Pekerjaan",
    snippet: "Ceritakan pengalaman Anda bekerja dalam tim multidisiplin...",
  },
];

export default function HistoryPage() {
  return (
    <AppShell>
      <main className="flex-1 p-margin-mobile md:p-margin-desktop bg-surface min-h-screen">
        <header className="mb-gut-xl">
          <h2 className="font-face-headline-lg text-headline-lg text-on-surface">
            Riwayat
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Semua transkripsi dan sesi yang telah Anda simpan.
          </p>
        </header>

        <div className="space-y-gut-md max-w-3xl">
          {HISTORY_ITEMS.map((item) => (
            <div
              key={item.title}
              className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary cursor-pointer transition-all hover:shadow-md group custom-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-caption text-caption text-on-surface-variant">
                  {item.date}
                </span>
                <Icon
                  name="arrow_forward"
                  className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <h4 className="font-title-lg text-title-lg text-on-surface mb-1">
                {item.title}
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                &quot;{item.snippet}&quot;
              </p>
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
