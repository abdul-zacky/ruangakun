"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const navigation = [
  { label: "Beranda", href: "#beranda" },
  { label: "Manfaat", href: "#manfaat" },
  { label: "Produk", href: "#produk" },
  { label: "Cara Order", href: "#cara-order" },
  { label: "Transformasi", href: "#transformasi" },
  { label: "Kontak", href: "#kontak" },
];

const benefits = [
  {
    icon: "🧭",
    title: "Satu Pusat Kendali",
    description:
      "Susun, jadwalkan, dan analisis semua akun digital dalam satu dashboard terpadu.",
  },
  {
    icon: "🤝",
    title: "Kolaborasi Lancar",
    description:
      "Ajak tim atau klien dengan hak akses granular tanpa repot berbagi password.",
  },
  {
    icon: "🛡️",
    title: "Keamanan Berlapis",
    description:
      "Lindungi aset digital dengan enkripsi end-to-end dan audit trail realtime.",
  },
];

const steps = [
  {
    icon: "📝",
    title: "Konsultasi Singkat",
    detail: "Isi formulir kebutuhan dan pilih paket yang paling pas.",
  },
  {
    icon: "🧩",
    title: "Kurasi Solusi",
    detail: "Tim kami merancang ruang kerja digital sesuai alur bisnis Anda.",
  },
  {
    icon: "⚙️",
    title: "Implementasi",
    detail: "Kami bantu migrasi data, integrasi, dan pelatihan tim.",
  },
  {
    icon: "📈",
    title: "Optimalisasi",
    detail: "Monitoring kinerja berkelanjutan dengan laporan otomatis mingguan.",
  },
];

const beforeAfter = {
  before: [
    "Spreadsheet terpisah untuk tiap brand",
    "Koordinasi manual via chat yang tercecer",
    "Akses akun dibagikan tanpa kontrol",
    "Laporan kinerja datang telat",
  ],
  after: [
    "Dashboard terpadu siap pakai",
    "Kolaborasi real-time dengan catatan tugas",
    "Kontrol akses per anggota yang fleksibel",
    "Analitik instan dan rekomendasi aksi",
  ],
};

const products = [
  { icon: "🚀", name: "Starter Boost", price: "Rp249.000 / bulan" },
  { icon: "🌐", name: "Growth Orbit", price: "Rp499.000 / bulan" },
  { icon: "🏢", name: "Enterprise Suite", price: "Hubungi kami" },
];

const glassClasses =
  "rounded-3xl border border-white/30 bg-white/40 backdrop-blur-xl shadow-lg shadow-[#092A4D0d]";

const blueGlassClasses =
  "rounded-3xl border border-white/40 bg-linear-to-br from-[#3D73B1] via-[#2F5F93] to-[#092A4D] backdrop-blur-xl shadow-lg shadow-[#092A4D26]";

export default function Home() {
  const [particlesReady, setParticlesReady] = useState(false);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesReady(true);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavSolid(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const particlesOptions = useMemo(
    () => ({
      fullScreen: false,
      background: { color: "transparent" },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          onClick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 120, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#ffffff" },
        links: {
          enable: true,
          color: "#ffffff",
          distance: 140,
          opacity: 0.25,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: "none",
          outModes: { default: "out" },
        },
        number: { value: 140, density: { enable: true, area: 800 } },
        opacity: { value: { min: 0.18, max: 0.45 } },
        size: { value: { min: 1.5, max: 3.5 } },
      },
    }),
    []
  );

  return (
    <div className="relative min-h-screen bg-[#F9F7F8] text-[#092A4D]" id="beranda">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4">
        <nav
          className={`pointer-events-auto mt-6 flex w-full max-w-6xl items-center justify-between rounded-full px-6 py-4 transition-all duration-300 ${
            navSolid
              ? "border border-white/30 bg-white/60 backdrop-blur-xl shadow-lg shadow-[#092A4D10]"
              : "bg-transparent"
          }`}
          aria-label="Navigasi utama"
        >
          <div
            className={`text-lg font-semibold tracking-tight ${
              navSolid ? "text-[#092A4D]" : "text-white!"
            }`}
          >
            RuangAkun
          </div>
          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  navSolid
                    ? "text-[#092A4D] hover:text-[#3D73B1]"
                    : "text-white! hover:text-[#DBE3F0]!"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="#cara-order"
            className={`hidden rounded-full px-5 py-2 text-sm font-semibold transition-colors md:inline-flex ${
              navSolid
                ? "bg-[#3D73B1] text-white hover:bg-[#092A4D]"
                : "border border-white/40 text-white! hover:bg-white/10"
            }`}
          >
            Konsultasi Gratis
          </a>
        </nav>
      </header>

      <main className="flex flex-col gap-24 pb-24">
        <section className="relative overflow-hidden pt-32">
          <div className="absolute inset-0">
            {particlesReady && (
              <Particles
                id="heroParticles"
                className="h-full w-full"
                canvasClassName="h-full w-full"
                options={particlesOptions}
              />
            )}
            <div className="absolute inset-0 bg-linear-to-br from-[#092A4D] via-[#092A4D] to-[#3D73B1]/60 opacity-90" />
            <div className="absolute -right-32 top-24 h-80 w-80 rounded-full bg-[#DBE3F0]/30 blur-3xl" />
            <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#3D73B1]/20 blur-3xl" />
          </div>
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 py-24 md:flex-row md:items-center">
            <div className={`${glassClasses} max-w-xl px-10 py-12 text-[#F9F7F8]`}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#DBE3F0]/40 bg-[#DBE3F0]/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#DBE3F0]">
                Ruang kerja digital terpadu
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
                Kelola Akun Digital Tanpa Drama
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[#DBE3F0]">
                RuangAkun membantu brand dan agensi merapikan operasional digital dengan dashboard kolaboratif, otomasi rutin, dan analitik yang siap digunakan.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#produk"
                  className="rounded-full bg-[#3D73B1] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#F9F7F8] hover:text-[#092A4D]"
                >
                  Lihat Paket
                </a>
                <a
                  href="#transformasi"
                  className="rounded-full border border-[#DBE3F0]/50 px-6 py-3 text-center text-sm font-semibold text-[#DBE3F0] transition-colors hover:bg-[#DBE3F0]/20"
                >
                  Pelajari Transformasi
                </a>
              </div>
            </div>
            <div className={`${glassClasses} relative mx-auto flex max-w-md flex-col items-center gap-6 px-10 py-12 text-center text-[#092A4D]`}> 
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-white/20" />
              <div className="relative">
                <Image
                  src="/hero-illustration.svg"
                  alt="Ilustrasi dashboard RuangAkun"
                  width={360}
                  height={320}
                  priority
                />
              </div>
              <div className="relative flex flex-col gap-2 text-sm text-[#092A4D]">
                <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-[#3D73B1]">
                  <span>Integrasi</span>
                  <span className="h-1 w-1 rounded-full bg-[#3D73B1]"></span>
                  <span>Monitor</span>
                  <span className="h-1 w-1 rounded-full bg-[#3D73B1]"></span>
                  <span>Optimasi</span>
                </div>
                <p className="text-sm text-[#092A4D] opacity-80">
                  Visualisasi realtime untuk kampanye Anda, lengkap dengan rekomendasi otomatis setiap pagi.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="manfaat" className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <span className="text-sm font-semibold text-[#3D73B1]">Kenapa RuangAkun</span>
            <h2 className="text-3xl font-bold text-[#092A4D] md:text-4xl">
              Manfaat Utama Untuk Bisnis Anda
            </h2>
            <p className="text-base text-[#092A4D]/70">
              Dari bisnis rintisan hingga korporasi, kami merancang pengalaman manajemen akun yang ringkas, aman, dan kolaboratif.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className={`${glassClasses} h-full p-8`}> 
                <span className="text-3xl" aria-hidden>
                  {benefit.icon}
                </span>
                <h3 className="text-xl font-semibold text-[#092A4D]">{benefit.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#092A4D]/70">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="produk" className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <span className="text-sm font-semibold text-[#3D73B1]">Paket Produk</span>
            <h2 className="text-3xl font-bold text-[#092A4D] md:text-4xl">
              Sesuaikan Investasi Dengan Skala Anda
            </h2>
            <p className="text-base text-[#092A4D]/70">
              Pilih paket yang langsung melipatgandakan produktivitas tim digital Anda.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product, index) => (
              <div
                key={`${product.icon}-${index}`}
                className={`${glassClasses} flex h-full flex-col items-center gap-6 p-8 text-center`}
              >
                <span className="text-4xl" aria-hidden>
                  {product.icon}
                </span>
                <h3 className="text-lg font-semibold text-[#092A4D]">{product.name}</h3>
                <div className="text-base font-medium text-[#092A4D]/70">{product.price}</div>
                <button className="rounded-full bg-[#3D73B1] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#092A4D]">
                  Detail Paket
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="cara-order" className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
          <div className="absolute inset-x-0 top-8 -z-10 h-[85%] rounded-3xl bg-[#DBE3F0]/60 blur-3xl" />
          <div className="flex flex-col gap-4 text-center md:text-left">
            <span className="text-sm font-semibold text-[#3D73B1]">Cara Order</span>
            <h2 className="text-3xl font-bold text-[#092A4D] md:text-4xl">
              Langkah Sederhana, Hasil Maksimal
            </h2>
            <p className="text-base text-[#092A4D]/70">
              Tim kami mendampingi setiap tahap implementasi agar transisi terasa mulus bagi seluruh tim.
            </p>
          </div>
          <div className={`${glassClasses} relative overflow-hidden p-8 md:p-12`}>
            <span
              className="pointer-events-none absolute left-7 top-12 bottom-12 w-px bg-white/40"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-10">
              {steps.map((step, index) => (
                <div key={step.title} className="relative pl-16">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#3D73B1] text-xl text-white shadow-lg shadow-[#092A4D30]">
                    <span aria-hidden>{step.icon}</span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#3D73B1]/80">
                    Langkah {index + 1}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-[#092A4D]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#092A4D]/70">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="transformasi" className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <span className="text-sm font-semibold text-[#3D73B1]">Before vs After</span>
            <h2 className="text-3xl font-bold text-[#092A4D] md:text-4xl">
              Transformasi Nyata dalam 30 Hari
            </h2>
            <p className="text-base text-[#092A4D]/70">
              Rasakan perubahan ketika tim Anda berpindah dari pengelolaan serba manual ke RuangAkun.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className={`${glassClasses} p-8`}> 
              <h3 className="text-xl font-semibold text-[#092A4D]">Sebelum</h3>
              <ul className="mt-4 space-y-3 text-sm text-[#092A4D]/75">
                {beforeAfter.before.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[#3D73B1]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${blueGlassClasses} p-8 text-white`}>
              <h3 className="text-xl font-semibold text-white">Sesudah</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/85">
                {beforeAfter.after.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-white" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6">
          <div className={`${glassClasses} flex flex-col items-center gap-8 px-10 py-12 text-center md:flex-row md:items-center md:justify-between md:text-left`}> 
            <div className="max-w-2xl">
              <h3 className="text-2xl font-semibold text-[#092A4D]">
                Siap Mempercepat Pertumbuhan Digital Anda?
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#092A4D]/70">
                Sampaikan tantangan tim Anda, dan kami siapkan demo personal RuangAkun yang relevan dengan industri Anda.
              </p>
            </div>
            <a
              href="mailto:halo@ruangakun.id"
              className="rounded-full bg-[#092A4D] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3D73B1]"
            >
              Jadwalkan Demo
            </a>
          </div>
        </section>
      </main>

      <footer id="kontak" className="mt-24 bg-[#092A4D] py-12 text-[#DBE3F0]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xl font-semibold text-white">RuangAkun</div>
            <p className="mt-2 text-sm text-[#DBE3F0]/80">
              Pusat kendali akun digital yang aman, kolaboratif, dan mudah diskalakan.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-[#DBE3F0]/80">
            <a href="mailto:halo@ruangakun.id" className="hover:text-white">
              halo@ruangakun.id
            </a>
            <a href="https://ruangakun.id" className="hover:text-white">
              ruangakun.id
            </a>
            <span>Jl. Kolaborasi No. 12, Jakarta</span>
          </div>
          <div className="text-xs text-[#DBE3F0]/60">
            © {new Date().getFullYear()} RuangAkun. Seluruh hak cipta dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}
