import Link from "next/link";
import TopNavBar from "@/components/TopNavBar";
import Icon from "@/components/Icon";

export default function Home() {
  return (
    <>
      <TopNavBar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[800px] flex items-center hero-gradient px-margin-mobile md:px-margin-desktop overflow-hidden">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
            <div className="z-10 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md mb-6">
                Teknologi Inklusif untuk Semua
              </span>
              <h1 className="font-face-display-lg text-display-lg md:text-[56px] text-on-background mb-6 leading-tight">
                Jembatan Komunikasi <br className="hidden md:block" /> Digital untuk
                Semua
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-10 mx-auto lg:mx-0">
                Platform berbasis Artificial Intelligence yang membantu komunikasi
                melalui Speech-to-Text, Text-to-Speech, dan AI Assistant untuk
                aksesibilitas tanpa batas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-primary text-on-primary rounded-xl font-title-lg text-title-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Mulai Sekarang
                  <Icon name="arrow_forward" />
                </Link>
                <a
                  href="#fitur"
                  className="px-8 py-4 bg-surface-container-highest text-primary border border-primary-fixed-dim rounded-xl font-title-lg text-title-lg hover:bg-surface-container-high transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Pelajari Fitur
                  <Icon name="explore" />
                </a>
              </div>
            </div>
            <div className="relative flex justify-center items-center">
              <div className="relative w-full aspect-square max-w-lg">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                <div className="relative z-10 glass-card p-8 rounded-3xl shadow-2xl border-white/40 transform rotate-3 hover:rotate-0 transition-transform duration-500 flex items-center justify-center aspect-square">
                  <div className="flex flex-col items-center gap-6 text-center">
                    <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center text-on-primary shadow-lg">
                      <Icon name="graphic_eq" className="text-5xl" />
                    </div>
                    <div className="waveform-container justify-center">
                      <div className="wave-bar" style={{ animationDelay: "0.1s" }} />
                      <div className="wave-bar" style={{ animationDelay: "0.3s" }} />
                      <div className="wave-bar" style={{ animationDelay: "0.2s" }} />
                      <div className="wave-bar" style={{ animationDelay: "0.4s" }} />
                      <div className="wave-bar" style={{ animationDelay: "0.1s" }} />
                      <div className="wave-bar" style={{ animationDelay: "0.5s" }} />
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">
                      Suara menjadi teks, teks menjadi suara — secara instan.
                    </p>
                  </div>
                  {/* Floating UI Elements */}
                  <div
                    className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl shadow-lg flex items-center gap-3 animate-bounce"
                    style={{ animationDuration: "3s" }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                      <Icon name="mic" />
                    </div>
                    <div className="waveform-container">
                      <div className="wave-bar" style={{ animationDelay: "0.1s" }} />
                      <div className="wave-bar" style={{ animationDelay: "0.3s" }} />
                      <div className="wave-bar" style={{ animationDelay: "0.2s" }} />
                      <div className="wave-bar" style={{ animationDelay: "0.4s" }} />
                      <div className="wave-bar" style={{ animationDelay: "0.1s" }} />
                    </div>
                  </div>
                  <div
                    className="absolute -bottom-10 -left-6 glass-card p-4 rounded-2xl shadow-lg flex flex-col gap-2 max-w-[200px] animate-bounce"
                    style={{ animationDuration: "4s" }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon name="smart_toy" className="text-primary text-sm" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                        AI Assistant
                      </span>
                    </div>
                    <p className="text-xs text-on-surface">
                      &quot;Bagaimana saya bisa membantu komunikasi Anda hari
                      ini?&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Features (Bento Grid Style) */}
        <section
          id="fitur"
          className="py-24 px-margin-mobile md:px-margin-desktop bg-surface"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-face-headline-lg text-headline-lg text-on-background mb-4">
                Solusi Teknologi Utama
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                Tiga pilar teknologi HearBridge yang dirancang khusus untuk
                menjembatani setiap hambatan komunikasi.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1: STT */}
              <Link
                href="/speech-to-text"
                className="group p-8 rounded-3xl bg-surface-container-low border border-outline-variant hover:border-primary hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="mic" className="text-3xl" />
                </div>
                <h3 className="font-title-lg text-title-lg text-on-background mb-3">
                  Speech to Text
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Ubah suara langsung menjadi teks yang akurat secara real-time.
                  Membantu Teman Tuli menangkap setiap percakapan dengan mudah.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-on-surface">
                    <Icon name="check_circle" className="text-primary text-lg" />
                    Multi-bahasa
                  </li>
                  <li className="flex items-center gap-2 text-sm text-on-surface">
                    <Icon name="check_circle" className="text-primary text-lg" />
                    Pengenalan Pembicara
                  </li>
                </ul>
              </Link>
              {/* Feature 2: TTS */}
              <Link
                href="/text-to-speech"
                className="group p-8 rounded-3xl bg-surface-container-low border border-outline-variant hover:border-primary hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="volume_up" className="text-3xl" />
                </div>
                <h3 className="font-title-lg text-title-lg text-on-background mb-3">
                  Text to Speech
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Ubah teks menjadi suara manusia yang natural. Memberikan suara
                  digital bagi mereka yang memiliki keterbatasan bicara.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-on-surface">
                    <Icon name="check_circle" className="text-primary text-lg" />
                    Suara Natural
                  </li>
                  <li className="flex items-center gap-2 text-sm text-on-surface">
                    <Icon name="check_circle" className="text-primary text-lg" />
                    Kontrol Kecepatan
                  </li>
                </ul>
              </Link>
              {/* Feature 3: AI Assistant */}
              <Link
                href="/assistant"
                className="group p-8 rounded-3xl bg-surface-container-low border border-outline-variant hover:border-primary hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="smart_toy" className="text-3xl" />
                </div>
                <h3 className="font-title-lg text-title-lg text-on-background mb-3">
                  AI Assistant
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Asisten cerdas yang membantu merangkum transkripsi dan menjawab
                  pertanyaan seputar komunikasi Anda.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-on-surface">
                    <Icon name="check_circle" className="text-primary text-lg" />
                    Ringkasan Otomatis
                  </li>
                  <li className="flex items-center gap-2 text-sm text-on-surface">
                    <Icon name="check_circle" className="text-primary text-lg" />
                    Bantuan 24/7
                  </li>
                </ul>
              </Link>
            </div>
          </div>
        </section>

        {/* Tentang Kami Section */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <div className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
                    <Icon name="diversity_1" className="text-primary" />
                  </div>
                  <p className="font-title-lg text-title-lg">Misi Sosial</p>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Kami percaya bahwa akses komunikasi adalah hak asasi manusia. AI
                  adalah kunci untuk membuka pintu tersebut bagi jutaan orang.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-face-headline-lg text-headline-lg text-on-background mb-8">
                Mengapa HearBridge AI Hadir?
              </h2>
              <div className="space-y-8">
                <div>
                  <h4 className="font-title-lg text-title-lg text-primary mb-2 flex items-center gap-2">
                    <Icon name="crisis_alert" />
                    Masalah Aksesibilitas
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Hambatan komunikasi seringkali menjadi penghalang bagi
                    penyandang disabilitas pendengaran dan bicara untuk
                    berpartisipasi penuh dalam pendidikan, pekerjaan, dan
                    kehidupan sosial.
                  </p>
                </div>
                <div>
                  <h4 className="font-title-lg text-title-lg text-primary mb-2 flex items-center gap-2">
                    <Icon name="auto_fix_high" />
                    Kekuatan AI
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    HearBridge AI memanfaatkan teknologi model bahasa besar (LLM)
                    dan pemrosesan sinyal audio terbaru untuk menghasilkan
                    interpretasi yang presisi dan instan.
                  </p>
                </div>
                <div>
                  <h4 className="font-title-lg text-title-lg text-primary mb-2 flex items-center gap-2">
                    <Icon name="favorite" />
                    Manfaat Nyata
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Dari ruang kelas hingga ruang rapat, platform kami membantu
                    jutaan orang untuk terhubung kembali dengan dunia, memberikan
                    kemandirian dan rasa percaya diri dalam berkomunikasi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter / CTA Splash */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-5xl mx-auto bg-on-background text-on-primary-container rounded-[48px] p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
            <h2 className="font-face-headline-lg text-headline-lg text-white mb-6 relative z-10">
              Siap Memulai Perjalanan Tanpa Hambatan?
            </h2>
            <p className="font-body-lg text-body-lg text-white/70 mb-10 max-w-2xl mx-auto relative z-10">
              Bergabunglah dengan ribuan pengguna yang telah merasakan kemudahan
              berkomunikasi dengan HearBridge AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
              <input
                className="w-full sm:w-80 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="Masukkan email Anda"
                type="email"
              />
              <button className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary rounded-xl font-title-lg text-title-lg hover:shadow-lg transition-all active:scale-95">
                Langganan Sekarang
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-start gap-8 bg-surface-container-highest border-t border-outline-variant">
        <div className="space-y-4 max-w-sm">
          <span className="font-title-lg text-title-lg font-bold text-primary">
            HearBridge AI
          </span>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Jembatan Komunikasi Digital untuk Semua. Menghubungkan setiap kata
            melalui kecerdasan buatan.
          </p>
          <div className="flex gap-4">
            <a
              className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-primary hover:text-white transition-all text-primary"
              href="#"
            >
              <Icon name="share" className="text-lg" />
            </a>
            <a
              className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-primary hover:text-white transition-all text-primary"
              href="#"
            >
              <Icon name="public" className="text-lg" />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div className="flex flex-col gap-3">
            <span className="font-label-md text-label-md text-on-surface font-bold">
              Produk
            </span>
            <Link
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all duration-300"
              href="/speech-to-text"
            >
              STT
            </Link>
            <Link
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all duration-300"
              href="/text-to-speech"
            >
              TTS
            </Link>
            <Link
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all duration-300"
              href="/assistant"
            >
              AI Assistant
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-label-md text-label-md text-on-surface font-bold">
              Perusahaan
            </span>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all duration-300" href="#">
              About Us
            </a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all duration-300" href="#">
              Contact Support
            </a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all duration-300" href="#">
              Help Center
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-label-md text-label-md text-on-surface font-bold">
              Legal
            </span>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all duration-300" href="#">
              Privacy Policy
            </a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all duration-300" href="#">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="w-full md:w-auto mt-8 md:mt-0 flex flex-col items-start md:items-end gap-2">
          <p className="font-body-md text-body-md text-on-surface-variant">
            © 2024 HearBridge AI. Jembatan Komunikasi Digital untuk Semua.
          </p>
        </div>
      </footer>
    </>
  );
}
