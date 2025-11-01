"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { ExternalLink, Compass, Users, Shield, FileText, Puzzle, Settings, TrendingUp } from "lucide-react";

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
    icon: Compass,
    title: "Satu Pusat Kendali",
    description:
      "Susun, jadwalkan, dan analisis semua akun digital dalam satu dashboard terpadu.",
  },
  {
    icon: Users,
    title: "Kolaborasi Lancar",
    description:
      "Ajak tim atau klien dengan hak akses granular tanpa repot berbagi password.",
  },
  {
    icon: Shield,
    title: "Keamanan Berlapis",
    description:
      "Lindungi aset digital dengan enkripsi end-to-end dan audit trail realtime.",
  },
];

const steps = [
  {
    icon: FileText,
    title: "Konsultasi Singkat",
    detail: "Isi formulir kebutuhan dan pilih paket yang paling pas.",
  },
  {
    icon: Puzzle,
    title: "Kurasi Solusi",
    detail: "Tim kami merancang ruang kerja digital sesuai alur bisnis Anda.",
  },
  {
    icon: Settings,
    title: "Implementasi",
    detail: "Kami bantu migrasi data, integrasi, dan pelatihan tim.",
  },
  {
    icon: TrendingUp,
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
    price: "Rp17.000/bulan",
    slug: "netflix",
  },
  {
    image: "https://cdn.cdnlogo.com/logos/s/89/spotify.svg",
    name: "Spotify Premium",
    price: "Rp12.000/bulan",
    slug: "spotify",
  },
  {
    image: "https://cdn.cdnlogo.com/logos/y/59/youtube.svg",
    name: "YouTube Premium",
    price: "Rp15.000/bulan",
    slug: "youtube",
  },
  {
    image: "https://cdn.cdnlogo.com/logos/c/80/canva.svg",
    name: "Canva Pro",
    price: "Rp25.000/bulan",
    slug: "canva",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    name: "ChatGPT Plus",
    price: "Rp90.000/bulan",
    slug: "chatgpt",
  },
  {
    image: "https://cdn.cdnlogo.com/logos/d/48/disney.svg",
    name: "Disney+ Hotstar",
    price: "Rp15.000/bulan",
    slug: "disney",
  },
  {
    image: "https://cdn.cdnlogo.com/logos/v/97/viu.svg",
    name: "VIU Premium",
    price: "Rp12.000/bulan",
    slug: "viu",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_music_icon.svg",
    name: "YouTube Music",
    price: "Rp10.000/bulan",
    slug: "youtube-music",
  },
  {
    image: "https://cdn.cdnlogo.com/logos/a/43/adobe-creative-cloud.svg",
    name: "Adobe Creative Cloud",
    price: "Rp150.000/bulan",
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
  const [selectedProduct, setSelectedProduct] = useState(null);

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
                ? "bg-[#3D73B1] text-white! hover:bg-[#092A4D] hover:text-white!"
                : "border border-white/40 text-white! hover:bg-white/10 hover:text-white!"
            }`}
          >
            Konsultasi Gratis
          </a>
        </nav>
      </header>

  <main className="flex flex-col">
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
              <h1 className="mt-6 text-4xl font-medium leading-tight md:text-4xl">
                Layanan Premium <span className="">Mudah</span> dan <span className="underline">Terjangkau</span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[#DBE3F0]">
                Akses berbagai layanan premium harga bersahabat dengan sistem patungan.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#produk"
                  className="rounded-full bg-[#3D73B1] px-6 py-3 text-center text-sm font-semibold text-white! transition-colors hover:bg-[#092A4D] hover:text-white!"
                >
                  Lihat Paket
                </a>
                <a
                  href="#transformasi"
                  className="rounded-full border border-[#DBE3F0]/50 px-6 py-3 text-center text-sm font-semibold text-white! transition-colors hover:bg-white hover:text-[#3D73B1]"
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
              <h2 className="text-3xl font-medium text-[#092A4D] md:text-4xl">
                Untuk Apa Bayar Mahal?
              </h2>
              <p className="text-3xl font-medium text-[#092A4D]/80">
                RuangAkun Aja!
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {benefits.map((benefit) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={benefit.title} className={`${glassClasses} h-full p-8 flex flex-col items-center text-center`}>
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-linear-to-br from-[#3D73B1] to-[#092A4D] rounded-full blur-md opacity-20" />
                      <div className="relative bg-linear-to-br from-[#3D73B1] to-[#092A4D] rounded-full p-5">
                        <IconComponent className="w-8 h-8 text-white" strokeWidth={2} />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-[#092A4D]">{benefit.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#092A4D]/70">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
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
              <h2 className="text-3xl font-medium text-white md:text-4xl">
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
                  className="flex flex-col rounded-3xl bg-white/10 text-center backdrop-blur-md shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 border-2 border-[#5BA3E0]/50 hover:border-[#5BA3E0] overflow-hidden"
                >
                  <div className="flex flex-col items-center gap-4 p-6 pb-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-white/30 bg-white p-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="96px"
                        className="object-contain"
                      />
                    </div>
                    <div style={{fontSize: '18px'}} className="font-medium text-white/80 leading-tight">{product.name}</div>
                  </div>
                  <div className="flex flex-col gap-3 p-6 pt-4 mt-auto border-t border-white/10">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex items-center justify-center gap-1 text-sm font-medium text-white/70 hover:text-[#5BA3E0] transition-colors cursor-pointer"
                    >
                      {product.price}
                      <ExternalLink size={12} className="opacity-60" />
                    </button>
                    <Link
                      href={`/provider/${product.slug}`}
                      className="w-full rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-[#092A4D] transition-colors hover:bg-white text-center"
                    >
                      Pesan
                    </Link>
                  </div>
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
              <h2 className="text-3xl font-medium text-[#092A4D] md:text-4xl">
                Langkah Sederhana, Hasil Maksimal
              </h2>
              <p className="max-w-2xl text-base text-[#092A4D]/70">
                Tim kami mendampingi setiap tahap implementasi agar transisi terasa mulus bagi seluruh tim.
              </p>
            </div>
            <div className="relative p-8 md:p-12">
              <div className="absolute left-1/2 top-12 bottom-12 w-0.5 bg-linear-to-b from-[#3D73B1] to-[#092A4D] -translate-x-1/2 hidden md:block" aria-hidden="true" />
              <div className="flex flex-col gap-20">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isEven = index % 2 === 0;
                  return (
                    <div key={step.title} className="relative flex items-center flex-col md:flex-row">
                      <div className={`flex-1 ${isEven ? 'md:pr-24' : 'md:order-2 md:pl-24'} mb-6 md:mb-0`}>
                        <div className={`${glassClasses} p-6 text-center`}>
                          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#3D73B1]/80">
                            Langkah {index + 1}
                          </span>
                          <h3 className="mt-2 text-base font-medium text-[#092A4D]">{step.title}</h3>
                          <p className="mt-2 text-xs leading-relaxed text-[#092A4D]/70">{step.detail}</p>
                        </div>
                      </div>
                      <div className={`absolute left-1/2 -translate-x-1/2 z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#3D73B1] to-[#092A4D] text-white shadow-xl shadow-[#092A4D40] ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                        <IconComponent className="w-7 h-7" strokeWidth={2} />
                      </div>
                      <div className={`flex-1 hidden md:block ${isEven ? 'md:order-2' : 'md:order-1'}`} />
                    </div>
                  );
                })}
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
              <h2 className="text-3xl font-medium text-white md:text-4xl">
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
              <h2 className="text-3xl font-medium text-[#092A4D] md:text-4xl">
                Transformasi Nyata dalam 30 Hari
              </h2>
              <p className="max-w-3xl text-base text-[#092A4D]/70">
                Rasakan perubahan ketika tim Anda berpindah dari pengelolaan serba manual ke RuangAkun.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className={`${glassClasses} p-8`}>
                <h3 className="text-xl font-medium text-[#092A4D]">Sebelum</h3>
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
                <h3 className="text-xl font-medium text-white">Sesudah</h3>
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
            <div className="flex justify-center mt-8">
              <Link
                href="/order"
                className="rounded-full bg-[#3D73B1] px-8 py-3 text-sm font-semibold text-white! transition-all hover:bg-[#092A4D] hover:text-white! hover:shadow-lg"
              >
                Pesan Sekarang
              </Link>
            </div>
          </div>
        </section>
      </main>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative max-w-md w-full p-8 bg-white rounded-3xl shadow-2xl text-[#092A4D]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-2xl text-[#092A4D]/60 hover:text-[#092A4D] transition-colors"
              aria-label="Tutup modal"
            >
              &times;
            </button>
            <div className="flex flex-col items-center gap-6">
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-medium text-[#092A4D]">{selectedProduct.name}</h3>
              <div className="w-full space-y-4">
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#092A4D]/80">Nama Paket</span>
                    <span className="text-sm font-semibold text-[#092A4D]">{selectedProduct.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#092A4D]/80">Harga Provider</span>
                    <span className="text-sm font-semibold text-[#092A4D]">
                      {selectedProduct.price.replace(/Rp(\d+\.?\d*)/, (_, p1) => {
                        const monthlyPrice = parseFloat(p1.replace('.', ''));
                        const originalPrice = monthlyPrice * 5;
                        return `Rp${Math.floor(originalPrice).toLocaleString('id-ID')}`;
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#092A4D]/80">Jumlah Member Per Grup</span>
                    <span className="text-sm font-semibold text-[#092A4D]">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#092A4D]/80">Harga Patungan</span>
                    <span className="text-sm text-[#092A4D]/70">
                      {selectedProduct.price.replace(/Rp(\d+\.?\d*)/, (_, p1) => {
                        const monthlyPrice = parseFloat(p1.replace('.', ''));
                        const originalPrice = monthlyPrice * 5;
                        return `Rp${Math.floor(originalPrice).toLocaleString('id-ID')} ÷ 5 = Rp${Math.floor(monthlyPrice).toLocaleString('id-ID')}`;
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#092A4D]/80">Biaya Admin</span>
                    <span className="text-sm font-semibold text-[#092A4D]">Rp0</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="text-base font-bold text-[#092A4D]">Harga Paket Perbulan</span>
                    <span className="text-lg font-bold text-[#3D73B1]">{selectedProduct.price}</span>
                  </div>
                </div>
              </div>
              <Link
                href={`/order?package=${selectedProduct.slug}`}
                className="w-full rounded-full bg-[#3D73B1] px-6 py-3 text-center text-sm font-semibold text-white! transition-all hover:bg-[#092A4D] hover:text-white! hover:shadow-lg"
                onClick={() => setSelectedProduct(null)}
              >
                Pesan Sekarang
              </Link>
            </div>
          </div>
        </div>
      )}

      <footer id="kontak" className="bg-[#092A4D] py-12 text-[#DBE3F0]">
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
