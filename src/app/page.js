"use client";

import Image from "next/image";
import Link from "next/link";
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
  {
    image: "https://cdn.cdnlogo.com/logos/n/80/netflix.svg",
    name: "Netflix",
    price: "Mulai Rp17.000",
    slug: "netflix",
  },
  {
    image: "https://cdn.cdnlogo.com/logos/s/89/spotify.svg",
    name: "Spotify Premium",
    price: "Mulai Rp12.000",
    slug: "spotify",
  },
  {
    image: "https://cdn.cdnlogo.com/logos/y/59/youtube.svg",
    name: "YouTube Premium",
    price: "Mulai Rp15.000",
    slug: "youtube",
  },
  {
    image: "https://cdn.cdnlogo.com/logos/c/80/canva.svg",
    name: "Canva Pro",
    price: "Mulai Rp25.000",
    slug: "canva",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    name: "ChatGPT Plus",
    price: "Mulai Rp90.000",
    slug: "chatgpt",
  },
  {
    image: "https://cdn.cdnlogo.com/logos/d/48/disney.svg",
    name: "Disney+ Hotstar",
    price: "Mulai Rp15.000",
    slug: "disney",
  },
  {
    image: "https://cdn.cdnlogo.com/logos/v/97/viu.svg",
    name: "VIU Premium",
    price: "Mulai Rp12.000",
    slug: "viu",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_music_icon.svg",
    name: "YouTube Music",
    price: "Mulai Rp10.000",
    slug: "youtube-music",
  },
  {
    image: "https://cdn.cdnlogo.com/logos/a/43/adobe-creative-cloud.svg",
    name: "Adobe Creative Cloud",
    price: "Mulai Rp150.000",
    slug: "adobe",
  },
];

const testimonials = [
  {
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=960&h=540&q=80",
    label: "Cuplikan ulasan tim kreatif",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=960&h=540&q=80",
    label: "Review dashboard kolaborasi",
  },
  {
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=960&h=540&q=80",
    label: "Feedback agensi digital",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=960&h=540&q=80",
    label: "Testimoni tim pemasaran",
  },
  {
    image:
      "https://images.unsplash.com/photo-1598257006626-48b0c252070d?auto=format&fit=crop&w=960&h=540&q=80",
    label: "Kesan positif studio desain",
  },
  {
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=960&h=540&q=80",
    label: "Review migrasi akun klien",
  },
  {
    image:
      "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=960&h=540&q=80",
    label: "Snapshot hasil laporan otomatis",
  },
  {
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=960&h=540&q=80",
    label: "Cuplikan workspace agensi",
  },
  {
    image:
      "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=960&h=540&q=80",
    label: "Hasil kolaborasi kampanye",
  },
];

const glassClasses =
  "rounded-3xl border border-white/30 bg-white/40 backdrop-blur-xl shadow-lg shadow-[#092A4D0d]";

const blueGlassClasses =
  "rounded-3xl border border-white/40 bg-linear-to-br from-[#3D73B1] via-[#2F5F93] to-[#092A4D] backdrop-blur-xl shadow-lg shadow-[#092A4D26]";

export default function Home() {
  const [particlesReady, setParticlesReady] = useState(false);
  const [navSolid, setNavSolid] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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

  const totalTestimonials = testimonials.length;
  const slidesVisible = 3;
  const totalGroups = Math.ceil(totalTestimonials / slidesVisible);

  const goPrevTestimonial = () =>
    setActiveTestimonial((prev) => (prev === 0 ? totalGroups - 1 : prev - 1));

  const goNextTestimonial = () =>
    setActiveTestimonial((prev) => (prev === totalGroups - 1 ? 0 : prev + 1));

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev === totalGroups - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(timer);
  }, [totalGroups]);

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
                ? "bg-[#3D73B1] text-white! hover:bg-[#092A4D]"
                : "border border-white/40 text-white! hover:bg-white/10"
            }`}
          >
            Konsultasi Gratis
          </a>
        </nav>
      </header>

  <main className="flex flex-col pb-24">
        <section className="relative overflow-hidden pt-32">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-linear-to-br from-[#092A4D] via-[#092A4D] to-[#3D73B1]/60 opacity-90" />
            <div className="absolute -right-32 top-24 h-80 w-80 rounded-full bg-[#DBE3F0]/30 blur-3xl" />
            <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#3D73B1]/20 blur-3xl" />
            {particlesReady && (
              <Particles
                id="heroParticles"
                className="absolute inset-0 z-10"
                canvasClassName="h-full w-full"
                options={particlesOptions}
              />
            )}
          </div>
          <div className="relative z-20 mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 py-24 md:flex-row md:items-center">
            <div className={`${glassClasses} max-w-xl px-10 py-12 text-[#F9F7F8]`}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#DBE3F0]/40 bg-[#DBE3F0]/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#DBE3F0]">
                Solusi Akun Sharing #1
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-4xl">
                Layanan Premium <span className="">Mudah</span> dan <span className="underline">Terjangkau</span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[#DBE3F0]">
                Akses berbagai layanan premium harga bersahabat dengan sistem patungan.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#produk"
                  className="rounded-full bg-[#3D73B1] px-6 py-3 text-center text-sm font-semibold text-[#F9F7F8]! transition-colors hover:bg-[#F9F7F8] hover:text-[#092A4D]!"
                >
                  Lihat Paket
                </a>
                <a
                  href="#transformasi"
                  className="rounded-full border border-[#DBE3F0]/50 px-6 py-3 text-center text-sm font-semibold text-[#DBE3F0]! transition-colors hover:bg-[#DBE3F0]/20"
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

        <section
          id="manfaat"
          className="relative w-full overflow-hidden bg-linear-to-br from-[#DBE3F0] via-[#F9F7F8] to-[#F9F7F8] px-6 py-20 shadow-inner shadow-[#092A4D0d]"
        >
          <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#3D73B1]/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-12 h-64 w-64 rounded-full bg-white/45 blur-3xl" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="text-sm font-semibold text-[#3D73B1]">Kenapa RuangAkun</span>
              <h2 className="text-3xl font-bold text-[#092A4D] md:text-4xl">
                Untuk Apa Bayar Mahal?
              </h2>
              <p className="text-3xl font-semibold text-[#092A4D]/80">
                RuangAkun Aja!
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
          </div>
        </section>

        <section
          id="produk"
          className="relative w-full overflow-hidden bg-linear-to-br from-[#0B2F52] via-[#123D6A] to-[#3D73B1] px-6 py-20 text-white shadow-inner shadow-[#00000033]"
        >
          <div className="pointer-events-none absolute -top-28 right-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-[#092A4D]/60 blur-3xl" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="text-sm font-semibold text-white/80">Produk Premium</span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Nikmati Layanan Premium dengan Harga Terjangkau
              </h2>
              <p className="max-w-2xl text-base text-white/70">
                Akses semua platform favorit Anda dengan harga hemat. Akun private, aman, dan garansi 100%.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product, index) => (
                <div
                  key={`${product.name}-${index}`}
                  className="flex flex-col items-center gap-5 rounded-3xl bg-white/10 p-6 text-center text-white/90 backdrop-blur-md shadow-lg shadow-black/20 transition-transform hover:scale-105"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/30 bg-white p-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-white">{product.name}</h3>
                  <div className="text-sm font-medium text-white/70">{product.price}</div>
                  <Link 
                    href={`/order?package=${product.slug}`}
                    className="w-full rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-[#092A4D] transition-colors hover:bg-white text-center"
                  >
                    Pesan
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="cara-order"
          className="relative w-full overflow-hidden bg-linear-to-br from-[#F9F7F8] via-[#DBE3F0]/70 to-[#F9F7F8] px-6 py-20 shadow-inner shadow-[#092A4D0d]"
        >
          <div className="pointer-events-none absolute inset-x-0 top-12 -z-10 h-[80%] bg-linear-to-b from-white/60 via-transparent to-transparent" />
          <div className="pointer-events-none absolute left-12 top-10 h-52 w-52 rounded-full bg-[#3D73B1]/15 blur-3xl" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[#092A4D]/10 blur-3xl" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="text-sm font-semibold text-[#3D73B1]">Cara Order</span>
              <h2 className="text-3xl font-bold text-[#092A4D] md:text-4xl">
                Langkah Sederhana, Hasil Maksimal
              </h2>
              <p className="max-w-2xl text-base text-[#092A4D]/70">
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
          </div>
        </section>

        <section
          id="testimoni"
          className="relative w-full overflow-hidden bg-linear-to-br from-[#0A2748] via-[#113B6F] to-[#0A2748] px-6 py-20 text-white"
        >
          <div className="pointer-events-none absolute -top-32 left-0 h-80 w-80 rounded-full bg-[#3D73B1]/40 blur-3xl" />
          <div className="pointer-events-none absolute right-10 bottom-0 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="text-sm font-semibold text-white/80">Cerita Pengguna</span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Dipercaya Komunitas Kreatif dan Agency
              </h2>
              <p className="max-w-3xl text-base text-white/70">
                Mereka merapikan operasional digital, memotong biaya tools, dan mempercepat peluncuran kampanye dengan RuangAkun.
              </p>
            </div>
            <div className="relative mx-auto w-full max-w-6xl">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                >
                  {testimonials.map((item, index) => (
                    <div
                      key={item.image}
                      className="shrink-0 px-3"
                      style={{ flexBasis: `${100 / slidesVisible}%` }}
                    >
                      <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/15">
                        <Image
                          src={item.image}
                          alt={item.label}
                          fill
                          sizes="(max-width: 768px) 300px, (max-width: 1200px) 380px, 420px"
                          className="object-cover"
                          priority={index < slidesVisible}
                        />
                        <span className="sr-only">{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={goPrevTestimonial}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-lg font-semibold text-white transition-colors hover:bg-white/20"
                    aria-label="Testimoni sebelumnya"
                  >
                    &#8592;
                  </button>
                  <button
                    type="button"
                    onClick={goNextTestimonial}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-lg font-semibold text-white transition-colors hover:bg-white/20"
                    aria-label="Testimoni berikutnya"
                  >
                    &#8594;
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2 md:justify-end">
                  {Array.from({ length: totalGroups }).map((_, index) => (
                    <span
                      key={`dot-${index}`}
                      className={`h-2 w-2 rounded-full transition-opacity ${
                        index === activeTestimonial ? "bg-white opacity-100" : "bg-white/40 opacity-60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="transformasi"
          className="relative w-full overflow-hidden bg-linear-to-br from-[#EFF3F9] via-[#DBE3F0] to-[#C6D6EA] px-6 py-20 shadow-inner shadow-[#092A4D0f]"
        >
          <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/50 blur-3xl" />
          <div className="pointer-events-none absolute right-6 bottom-0 h-64 w-64 rounded-full bg-[#3D73B1]/25 blur-3xl" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="text-sm font-semibold text-[#3D73B1]">Before vs After</span>
              <h2 className="text-3xl font-bold text-[#092A4D] md:text-4xl">
                Transformasi Nyata dalam 30 Hari
              </h2>
              <p className="max-w-3xl text-base text-[#092A4D]/70">
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
          </div>
        </section>

        <section className="relative w-full overflow-hidden bg-linear-to-r from-[#092A4D] via-[#3D73B1] to-[#84A8CF] px-6 py-16 text-white shadow-inner shadow-[#092A4D1a]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff33,transparent_55%)]" />
          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-semibold text-white">
                Siap Mempercepat Pertumbuhan Digital Anda?
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                Sampaikan tantangan tim Anda, dan kami siapkan demo personal RuangAkun yang relevan dengan industri Anda.
              </p>
            </div>
            <a
              href="mailto:halo@ruangakun.id"
              className="rounded-full bg-white/85 px-6 py-3 text-sm font-semibold text-[#092A4D] transition-colors hover:bg-white"
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
