"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useSearchParams } from "next/navigation";

const glassClasses =
  "rounded-3xl border border-white/30 bg-white/40 backdrop-blur-xl shadow-lg shadow-[#092A4D0d]";

// Data produk subscription sharing
const products = {
  netflix: {
    name: "Netflix",
    icon: "🎬",
    plans: [
      {
        name: "Mobile",
        price: "17.000",
        duration: "1 Bulan",
        slot: "1 Slot",
        type: "private",
      },
      {
        name: "Basic",
        price: "22.000",
        duration: "1 Bulan",
        slot: "1 Slot",
        type: "private",
      },
      {
        name: "Standard",
        price: "27.000",
        duration: "1 Bulan",
        slot: "1 Slot",
        type: "private",
      },
      {
        name: "Premium",
        price: "32.000",
        duration: "1 Bulan",
        slot: "1 Slot",
        type: "private",
      },
    ],
    groups: [
      {
        id: 54,
        name: "Grup 54",
        pricePerUser: "80.000",
        totalSlots: 6,
        availableSlots: 2,
        status: "hampir-penuh",
        members: ["FATMA SURYANI HARAHAP", "Febrian", "Bram", "rama"],
      },
      {
        id: 55,
        name: "Grup 55",
        pricePerUser: "80.000",
        totalSlots: 6,
        availableSlots: 4,
        status: "tersedia",
        members: ["John", "Doe"],
      },
      {
        id: 56,
        name: "Grup 56",
        pricePerUser: "80.000",
        totalSlots: 6,
        availableSlots: 5,
        status: "tersedia",
        members: ["Alice"],
      },
    ],
  },
  spotify: {
    name: "Spotify Premium",
    icon: "🎵",
    plans: [
      {
        name: "Individual",
        price: "15.000",
        duration: "1 Bulan",
        slot: "1 Slot",
        type: "private",
      },
      {
        name: "Duo",
        price: "20.000",
        duration: "1 Bulan",
        slot: "1 Slot",
        type: "private",
      },
      {
        name: "Family",
        price: "12.000",
        duration: "1 Bulan",
        slot: "1 Slot",
        type: "private",
      },
    ],
    groups: [
      {
        id: 21,
        name: "Grup 21",
        pricePerUser: "35.000",
        totalSlots: 6,
        availableSlots: 3,
        status: "tersedia",
        members: ["User A", "User B", "User C"],
      },
      {
        id: 22,
        name: "Grup 22",
        pricePerUser: "35.000",
        totalSlots: 6,
        availableSlots: 1,
        status: "hampir-penuh",
        members: ["User D", "User E", "User F", "User G", "User H"],
      },
    ],
  },
  youtube: {
    name: "YouTube Premium",
    icon: "▶️",
    plans: [
      {
        name: "Individual",
        price: "18.000",
        duration: "1 Bulan",
        slot: "1 Slot",
        type: "private",
      },
      {
        name: "Family",
        price: "15.000",
        duration: "1 Bulan",
        slot: "1 Slot",
        type: "private",
      },
    ],
    groups: [
      {
        id: 31,
        name: "Grup 31",
        pricePerUser: "40.000",
        totalSlots: 5,
        availableSlots: 2,
        status: "tersedia",
        members: ["Member 1", "Member 2", "Member 3"],
      },
    ],
  },
  disney: {
    name: "Disney+ Hotstar",
    icon: "🏰",
    plans: [
      {
        name: "Mobile",
        price: "15.000",
        duration: "1 Bulan",
        slot: "1 Slot",
        type: "private",
      },
      {
        name: "Premium",
        price: "30.000",
        duration: "1 Bulan",
        slot: "1 Slot",
        type: "private",
      },
    ],
    groups: [
      {
        id: 41,
        name: "Grup 41",
        pricePerUser: "45.000",
        totalSlots: 4,
        availableSlots: 3,
        status: "tersedia",
        members: ["Disney Fan"],
      },
    ],
  },
  canva: {
    name: "Canva Pro",
    icon: "🎨",
    plans: [
      {
        name: "Pro",
        price: "25.000",
        duration: "1 Bulan",
        slot: "1 Slot",
        type: "private",
      },
    ],
    groups: [
      {
        id: 51,
        name: "Grup 51",
        pricePerUser: "50.000",
        totalSlots: 5,
        availableSlots: 4,
        status: "tersedia",
        members: ["Designer A"],
      },
    ],
  },
  viu: {
    name: "VIU Premium",
    icon: "📺",
    plans: [
      {
        name: "Premium",
        price: "12.000",
        duration: "1 Bulan",
        slot: "1 Slot",
        type: "private",
      },
    ],
    groups: [
      {
        id: 61,
        name: "Grup 61",
        pricePerUser: "25.000",
        totalSlots: 6,
        availableSlots: 5,
        status: "tersedia",
        members: ["VIU Lover"],
      },
    ],
  },
};

export default function OrderPage() {
  const searchParams = useSearchParams();
  const packageParam = searchParams.get("package") || "netflix";
  const selectedProduct = products[packageParam] || products["netflix"];

  const [particlesReady, setParticlesReady] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(selectedProduct.plans[0]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [orderType, setOrderType] = useState("group"); // "private" or "group" - default: Grup Patungan
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesReady(true);
    });
  }, []);

  useEffect(() => {
    setSelectedPlan(selectedProduct.plans[0]);
    setSelectedGroup(null);
    setOrderType("group"); // Default ke Grup Patungan saat ganti produk
  }, [selectedProduct]);

  const particlesOptions = useMemo(
    () => ({
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
          resize: true,
        },
        modes: {
          push: { quantity: 2 },
          repulse: { distance: 120, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#DBE3F0" },
        links: {
          color: "#3D73B1",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: false,
          speed: 1,
          straight: false,
        },
        number: { density: { enable: true, area: 800 }, value: 50 },
        opacity: { value: 0.4 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFormData({ name: "", email: "", phone: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let message = "";

    if (orderType === "private") {
      message =
        `*Pemesanan ${selectedProduct.name}*%0A%0A` +
        `Tipe: Private Account%0A` +
        `Paket: ${selectedPlan.name}%0A` +
        `Harga: Rp${selectedPlan.price}/${selectedPlan.duration}%0A%0A` +
        `Nama: ${formData.name}%0A` +
        `Email: ${formData.email}%0A` +
        `No. HP/WA: ${formData.phone}%0A%0A` +
        `Mohon info lebih lanjut untuk pemesanan.`;
    } else {
      message =
        `*Pemesanan ${selectedProduct.name} - Grup Patungan*%0A%0A` +
        `Tipe: Grup Patungan%0A` +
        `Grup: ${selectedGroup.name}%0A` +
        `Harga: Rp${selectedGroup.pricePerUser}/user%0A` +
        `Slot Tersedia: ${selectedGroup.availableSlots}/${selectedGroup.totalSlots}%0A%0A` +
        `Nama: ${formData.name}%0A` +
        `Email: ${formData.email}%0A` +
        `No. HP/WA: ${formData.phone}%0A%0A` +
        `Mohon info lebih lanjut untuk pemesanan.`;
    }

    const waNumber = "6281234567890"; // Ganti dengan nomor WA RuangAkun
    const waUrl = `https://wa.me/${waNumber}?text=${message}`;

    window.open(waUrl, "_blank");
    handleClosePopup();
  };

  return (
    <div className="min-h-screen bg-[#F9F7F8]">
      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="text-2xl font-bold text-[#092A4D]">
            RuangAkun
          </a>
          <a
            href="/"
            className="text-sm font-medium text-[#092A4D]/70 transition-colors hover:text-[#3D73B1]"
          >
            ← Kembali ke Beranda
          </a>
        </div>
      </nav>

      {/* Hero Section with Particles */}
      <section className="relative min-h-[40vh] overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10">
          {particlesReady && (
            <Particles
              id="orderParticles"
              className="h-full w-full"
              canvasClassName="h-full w-full"
              options={particlesOptions}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-br from-[#092A4D] via-[#092A4D] to-[#3D73B1]/60 opacity-90" />
          <div className="absolute -right-32 top-24 h-80 w-80 rounded-full bg-[#DBE3F0]/30 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#3D73B1]/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#DBE3F0]/40 bg-[#DBE3F0]/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#DBE3F0]">
            Order Premium
          </span>
          <h1 className="mt-6 text-4xl font-bold text-[#F9F7F8] md:text-5xl">
            {selectedProduct.icon} {selectedProduct.name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#DBE3F0]">
            Nikmati layanan premium dengan harga terjangkau. Akun private, aman,
            dan garansi uang kembali 100%.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative mx-auto -mt-10 max-w-6xl px-6 pb-20">
        <div className={`${glassClasses} p-8`}>
          {/* Header with Icon */}
          <div className="mb-6 flex items-center gap-3">
            <span className="text-3xl">{selectedProduct.icon}</span>
            <h2 className="text-2xl font-bold text-[#092A4D]">
              🛒 Pilih Paket
            </h2>
          </div>

          {/* Order Type Tabs */}
          <div className="mb-8 flex gap-3 border-b border-[#092A4D]/10 pb-4">
            <button
              onClick={() => setOrderType("group")}
              className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                orderType === "group"
                  ? "bg-[#3D73B1] text-white shadow-lg"
                  : "bg-white/50 text-[#092A4D]/70 hover:bg-white/80"
              }`}
            >
              � Grup Patungan
            </button>
            <button
              onClick={() => setOrderType("private")}
              className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                orderType === "private"
                  ? "bg-[#3D73B1] text-white shadow-lg"
                  : "bg-white/50 text-[#092A4D]/70 hover:bg-white/80"
              }`}
            >
              � Akun Private
            </button>
          </div>

          {/* Private Account Section */}
          {orderType === "private" && (
            <div>
              <div className="mb-4 rounded-xl border border-yellow-400/30 bg-yellow-50/50 p-4">
                <p className="text-sm text-[#092A4D]">
                  ℹ️ <strong>Dalam 1 grup berjumlah 6 user</strong> - Harga
                  tercantum adalah untuk 1 slot private account
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {selectedProduct.plans.map((plan) => (
                  <button
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan)}
                    className={`rounded-xl border-2 p-5 text-left transition-all ${
                      selectedPlan.name === plan.name
                        ? "border-[#3D73B1] bg-[#3D73B1]/10 shadow-lg"
                        : "border-[#092A4D]/20 bg-white/50 hover:border-[#3D73B1]/50 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-[#092A4D]">
                          {plan.name}
                        </div>
                        <div className="mt-1 text-xs text-[#092A4D]/60">
                          {plan.slot}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#3D73B1]">
                          Rp{plan.price}
                        </div>
                        <div className="text-xs text-[#092A4D]/60">
                          {plan.duration}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Summary Card */}
              <div className="mt-6 rounded-xl border-2 border-[#092A4D]/10 bg-white/60 p-6">
                <div className="flex items-center justify-between border-b border-[#092A4D]/10 pb-4">
                  <span className="text-sm text-[#092A4D]/70">
                    Harga per user:
                  </span>
                  <span className="text-lg font-medium text-[#092A4D]">
                    Rp{selectedPlan.price}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-lg font-semibold text-[#092A4D]">
                    Total Biaya:
                  </span>
                  <span className="text-2xl font-bold text-[#3D73B1]">
                    Rp{selectedPlan.price}
                  </span>
                </div>
              </div>

              <button
                onClick={handleOpenPopup}
                className="mt-6 w-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-center font-bold text-white transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-xl"
              >
                🛒 Pesan Sekarang
              </button>
            </div>
          )}

          {/* Group Sharing Section */}
          {orderType === "group" && selectedProduct.groups && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#092A4D]">
                  👥 Grup Patungan Tersedia
                </h3>
                <div className="flex gap-2 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="text-[#092A4D]/70">Tersedia</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                    <span className="text-[#092A4D]/70">Hampir Penuh</span>
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {selectedProduct.groups.map((group) => (
                  <div
                    key={group.id}
                    className={`rounded-xl border-2 p-5 transition-all ${
                      selectedGroup?.id === group.id
                        ? "border-[#3D73B1] bg-[#3D73B1]/10 shadow-lg"
                        : "border-[#092A4D]/20 bg-white/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700">
                          {group.id}
                        </div>
                        <div>
                          <div className="font-semibold text-[#092A4D]">
                            {group.name}
                          </div>
                          <div className="text-sm text-[#092A4D]/70">
                            Rp{group.pricePerUser}/user
                          </div>
                          {group.status === "hampir-penuh" && (
                            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                              ⚠️ Hampir Penuh
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-[#092A4D]/70">
                          Slot tersedia
                        </div>
                        <div className="text-lg font-bold text-[#3D73B1]">
                          {group.availableSlots}/{group.totalSlots}
                        </div>
                      </div>
                    </div>

                    {/* Members List */}
                    <div className="mt-4 rounded-lg bg-white/60 p-4">
                      <div className="mb-2 text-xs font-semibold text-[#092A4D]/70">
                        Anggota ({group.totalSlots - group.availableSlots}/
                        {group.totalSlots}):
                      </div>
                      <div className="space-y-2">
                        {group.members.map((member, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-semibold text-white">
                              {idx + 1}
                            </span>
                            <span className="text-[#092A4D]">{member}</span>
                            <span className="text-green-600">✓</span>
                          </div>
                        ))}
                        {Array.from({ length: group.availableSlots }).map(
                          (_, idx) => (
                            <div
                              key={`empty-${idx}`}
                              className="flex items-center gap-2 text-sm"
                            >
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-500">
                                {group.totalSlots - group.availableSlots + idx + 1}
                              </span>
                              <span className="italic text-[#092A4D]/40">
                                Tersedia
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedGroup(group);
                        handleOpenPopup();
                      }}
                      className="mt-4 w-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-center font-semibold text-white transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={group.availableSlots === 0}
                    >
                      {group.availableSlots > 0 ? "+ Gabung" : "Penuh"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className={`${glassClasses} p-6`}>
            <h4 className="mb-3 text-sm font-semibold text-[#092A4D]">
              ✨ Keuntungan Berlangganan
            </h4>
            <ul className="space-y-2 text-xs text-[#092A4D]/70">
              <li className="flex items-start gap-2">
                <span className="text-[#3D73B1]">✓</span>
                <span>Akun aman dan terpercaya</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3D73B1]">✓</span>
                <span>Garansi uang kembali 100%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3D73B1]">✓</span>
                <span>Proses cepat max 5 menit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3D73B1]">✓</span>
                <span>Support 24/7 via WhatsApp</span>
              </li>
            </ul>
          </div>

          <div className={`${glassClasses} p-6`}>
            <h4 className="mb-3 text-sm font-semibold text-[#092A4D]">
              💳 Metode Pembayaran
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-lg bg-white/60 px-3 py-1 text-xs text-[#092A4D]/70">
                QRIS
              </span>
              <span className="rounded-lg bg-white/60 px-3 py-1 text-xs text-[#092A4D]/70">
                BCA
              </span>
              <span className="rounded-lg bg-white/60 px-3 py-1 text-xs text-[#092A4D]/70">
                Mandiri
              </span>
              <span className="rounded-lg bg-white/60 px-3 py-1 text-xs text-[#092A4D]/70">
                BNI
              </span>
              <span className="rounded-lg bg-white/60 px-3 py-1 text-xs text-[#092A4D]/70">
                OVO
              </span>
              <span className="rounded-lg bg-white/60 px-3 py-1 text-xs text-[#092A4D]/70">
                GoPay
              </span>
              <span className="rounded-lg bg-white/60 px-3 py-1 text-xs text-[#092A4D]/70">
                DANA
              </span>
            </div>
          </div>

          <div className={`${glassClasses} p-6 text-center`}>
            <p className="mb-3 text-sm font-semibold text-[#092A4D]">
              Cari produk lain?
            </p>
            <a
              href="/#produk"
              className="inline-block rounded-full border border-[#3D73B1] px-4 py-2 text-sm font-medium text-[#3D73B1] transition-colors hover:bg-[#3D73B1] hover:text-white"
            >
              Lihat Semua Produk
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp Form Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div
            className={`${glassClasses} relative w-full max-w-md bg-white p-8`}
          >
            <button
              onClick={handleClosePopup}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#092A4D]/10 text-[#092A4D] transition-colors hover:bg-[#092A4D]/20"
            >
              ✕
            </button>

            <h3 className="mb-6 text-2xl font-bold text-[#092A4D]">
              📝 Lengkapi Data Anda
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-[#092A4D]"
                >
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#092A4D]/20 bg-white/50 px-4 py-3 text-[#092A4D] placeholder-[#092A4D]/40 backdrop-blur-sm transition-all focus:border-[#3D73B1] focus:outline-none focus:ring-2 focus:ring-[#3D73B1]/20"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#092A4D]"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#092A4D]/20 bg-white/50 px-4 py-3 text-[#092A4D] placeholder-[#092A4D]/40 backdrop-blur-sm transition-all focus:border-[#3D73B1] focus:outline-none focus:ring-2 focus:ring-[#3D73B1]/20"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-[#092A4D]"
                >
                  Nomor WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#092A4D]/20 bg-white/50 px-4 py-3 text-[#092A4D] placeholder-[#092A4D]/40 backdrop-blur-sm transition-all focus:border-[#3D73B1] focus:outline-none focus:ring-2 focus:ring-[#3D73B1]/20"
                  placeholder="08123456789"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 text-center font-bold text-white transition-all hover:from-green-600 hover:to-green-700 hover:shadow-xl"
              >
                💬 Lanjutkan ke WhatsApp
              </button>

              <p className="text-center text-xs text-[#092A4D]/60">
                Dengan klik tombol di atas, Anda akan diarahkan ke WhatsApp untuk
                konfirmasi pemesanan.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
