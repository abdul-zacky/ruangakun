"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useSearchParams, useRouter } from "next/navigation";

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
  const router = useRouter();
  const packageParam = searchParams.get("package") || "netflix";
  const selectedProduct = products[packageParam] || products["netflix"];

  const [particlesReady, setParticlesReady] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(selectedProduct.plans[0]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [orderType, setOrderType] = useState("group"); // "private" or "group" - default: Grup Patungan
  const [showPopup, setShowPopup] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesReady(true);
    });

    // Load saved info from cookies
    const savedName = getCookie("user_name");
    const savedPhone = getCookie("user_phone");
    const savedEmail = getCookie("user_email");

    if (savedName || savedPhone || savedEmail) {
      setFormData({
        name: savedName || "",
        phone: savedPhone || "",
        email: savedEmail || "",
      });
      setSaveInfo(true);
    }
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

  // Cookie helpers
  const setCookie = (name, value, days = 365) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  };

  const getCookie = (name) => {
    if (typeof document === "undefined") return "";
    return document.cookie.split("; ").reduce((r, v) => {
      const parts = v.split("=");
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save to cookies if checkbox is checked
    if (saveInfo) {
      setCookie("user_name", formData.name);
      setCookie("user_phone", formData.phone);
      setCookie("user_email", formData.email);

      // Save to database cookie_user entry
      const ruangAkunId = getCookie("RuangAkunID");
      if (ruangAkunId) {
        try {
          await fetch("/api/user/update-info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: ruangAkunId,
              fullName: formData.name,
              whatsappNumber: formData.phone,
              email: formData.email,
            }),
          });
        } catch (error) {
          console.error("Failed to save user info to database:", error);
        }
      }
    } else {
      // Clear cookies if unchecked
      setCookie("user_name", "", -1);
      setCookie("user_phone", "", -1);
      setCookie("user_email", "", -1);
    }

    // Prepare order data
    const orderData = {
      product: selectedProduct.name,
      productSlug: packageParam,
      orderType: orderType,
      plan: orderType === "private" ? selectedPlan : null,
      group: orderType === "group" ? selectedGroup : null,
      customer: formData,
      timestamp: new Date().toISOString(),
    };

    // Save order data to sessionStorage
    sessionStorage.setItem("currentOrder", JSON.stringify(orderData));

    // Redirect to payment page
    router.push("/payment");
  };

  const navigation = [
    { label: "Beranda", href: "/" },
    { label: "Manfaat", href: "/#manfaat" },
    { label: "Produk", href: "/#produk" },
    { label: "Cara Order", href: "/#cara-order" },
    { label: "Transformasi", href: "/#transformasi" },
    { label: "Kontak", href: "/#kontak" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#092A4D] via-[#3D73B1] to-[#DBE3F0]">
      {/* Particles Background */}
      {particlesReady && (
        <Particles
          id="orderParticles"
          className="absolute inset-0 z-0"
          options={particlesOptions}
        />
      )}

      {/* Navigation - Same as Landing Page */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4">
        <nav
          className="pointer-events-auto mt-6 flex w-full max-w-6xl items-center justify-between rounded-full px-6 py-4 border border-white/30 bg-white/60 backdrop-blur-xl shadow-lg"
          aria-label="Navigasi utama"
        >
          <a href="/" className="text-lg font-semibold tracking-tight text-[#092A4D]">
            RuangAkun
          </a>
          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[#092A4D] hover:text-[#3D73B1] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="/"
            className="text-sm font-medium text-[#092A4D] hover:text-[#3D73B1] transition-colors md:hidden"
          >
            ← Kembali
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            Order Premium
          </span>
          <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl drop-shadow-lg">
            {selectedProduct.name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white drop-shadow">
            Nikmati layanan premium dengan harga terjangkau. Akun private, aman,
            dan garansi uang kembali 100%.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">
              Pilih Paket
            </h2>
          </div>

          {/* Order Type Tabs */}
          <div className="mb-8 flex gap-3 border-b border-white/20 pb-4">
            <button
              onClick={() => setOrderType("group")}
              className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                orderType === "group"
                  ? "bg-white text-[#092A4D] shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
              }`}
            >
              Grup Patungan
            </button>
            <button
              onClick={() => setOrderType("private")}
              className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                orderType === "private"
                  ? "bg-white text-[#092A4D] shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
              }`}
            >
              Akun Private
            </button>
          </div>

          {/* Private Account Section */}
          {orderType === "private" && (
            <div>
              <div className="mb-4 rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm p-4">
                <p className="text-sm text-white drop-shadow">
                  <strong>Dalam 1 grup berjumlah 6 user</strong> - Harga
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
                        ? "border-white bg-white/30 shadow-lg backdrop-blur-sm"
                        : "border-white/30 bg-white/10 backdrop-blur-sm hover:border-white/50 hover:bg-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-white">
                          {plan.name}
                        </div>
                        <div className="mt-1 text-xs text-white/70">
                          {plan.slot}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">
                          Rp{plan.price}
                        </div>
                        <div className="text-xs text-white/70">
                          {plan.duration}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Summary Card */}
              <div className="mt-6 rounded-xl border-2 border-white/30 bg-white/20 backdrop-blur-sm p-6">
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <span className="text-sm text-white/80">
                    Harga per user:
                  </span>
                  <span className="text-lg font-medium text-white">
                    Rp{selectedPlan.price}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-lg font-semibold text-white">
                    Total Biaya:
                  </span>
                  <span className="text-2xl font-bold text-white">
                    Rp{selectedPlan.price}
                  </span>
                </div>
              </div>

              <button
                onClick={handleOpenPopup}
                className="mt-6 w-full rounded-full bg-gradient-to-r from-[#3D73B1] to-[#092A4D] px-6 py-4 text-center font-bold text-white transition-all hover:opacity-90 hover:shadow-xl"
              >
                Pesan Sekarang
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
                    <span className="text-white/80 drop-shadow">Tersedia</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                    <span className="text-white/80 drop-shadow">Hampir Penuh</span>
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
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm text-2xl font-bold text-white border border-white/50">
                          {group.id}
                        </div>
                        <div>
                          <div className="font-semibold text-[#092A4D]">
                            {group.name}
                          </div>
                          <div className="text-sm text-white/80 drop-shadow">
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
                        <div className="text-sm text-white/80 drop-shadow">
                          Slot tersedia
                        </div>
                        <div className="text-lg font-bold text-[#3D73B1]">
                          {group.availableSlots}/{group.totalSlots}
                        </div>
                      </div>
                    </div>

                    {/* Members List */}
                    <div className="mt-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 p-4">
                      <div className="mb-2 text-xs font-semibold text-white/80 drop-shadow">
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
                            <span className="text-green-400">✓</span>
                          </div>
                        ))}
                        {Array.from({ length: group.availableSlots }).map(
                          (_, idx) => (
                            <div
                              key={`empty-${idx}`}
                              className="flex items-center gap-2 text-sm"
                            >
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 border border-white/40 text-xs font-semibold text-white/70">
                                {group.totalSlots - group.availableSlots + idx + 1}
                              </span>
                              <span className="italic text-white/60">
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
                      className="mt-4 w-full rounded-full bg-gradient-to-r from-[#3D73B1] to-[#092A4D] px-6 py-3 text-center font-semibold text-white transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
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
            <ul className="space-y-2 text-xs text-white/80 drop-shadow">
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
              <span className="rounded-lg bg-white/60 px-3 py-1 text-xs text-white/80 drop-shadow">
                QRIS
              </span>
              <span className="rounded-lg bg-white/60 px-3 py-1 text-xs text-white/80 drop-shadow">
                BCA
              </span>
              <span className="rounded-lg bg-white/60 px-3 py-1 text-xs text-white/80 drop-shadow">
                Mandiri
              </span>
              <span className="rounded-lg bg-white/60 px-3 py-1 text-xs text-white/80 drop-shadow">
                BNI
              </span>
              <span className="rounded-lg bg-white/60 px-3 py-1 text-xs text-white/80 drop-shadow">
                OVO
              </span>
              <span className="rounded-lg bg-white/60 px-3 py-1 text-xs text-white/80 drop-shadow">
                GoPay
              </span>
              <span className="rounded-lg bg-white/60 px-3 py-1 text-xs text-white/80 drop-shadow">
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

      {/* Form Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="backdrop-blur-2xl bg-white/98 rounded-3xl border-2 border-white shadow-2xl relative w-full max-w-md p-8">
            <button
              onClick={handleClosePopup}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#092A4D]/10 text-[#092A4D] transition-colors hover:bg-[#092A4D]/20"
            >
              ✕
            </button>

            <h3 className="mb-6 text-2xl font-bold text-[#092A4D]">
              Lengkapi Data Anda
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
                  placeholder="nama@email.com"
                />
              </div>

              {/* Checkbox to save info */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="saveInfo"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#3D73B1] focus:ring-[#3D73B1] focus:ring-offset-0"
                />
                <label htmlFor="saveInfo" className="text-sm text-[#092A4D]/80 cursor-pointer select-none">
                  Simpan informasi saya untuk pemesanan berikutnya
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-[#3D73B1] to-[#092A4D] px-6 py-4 text-center font-bold text-white transition-all hover:opacity-90 hover:shadow-xl"
              >
                Lanjutkan
              </button>

              <p className="text-center text-xs text-[#092A4D]/60">
                Dengan klik tombol di atas, Anda akan diarahkan ke halaman pembayaran.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
