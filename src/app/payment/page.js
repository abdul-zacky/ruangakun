"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function PaymentPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);
  const [particlesInit, setParticlesInit] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    // Initialize particles
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesInit(true);
    });

    // Load order data from sessionStorage
    const savedOrder = sessionStorage.getItem("currentOrder");
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
    } else {
      // Redirect back if no order data
      router.push("/");
    }
  }, [router]);

  // Countdown timer
  useEffect(() => {
    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!orderData) {
    return null;
  }

  const price =
    orderData.orderType === "private"
      ? orderData.plan?.price
      : orderData.group?.pricePerUser;

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
      {particlesInit && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 120,
            particles: {
              color: { value: "#ffffff" },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.2,
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
              number: {
                density: { enable: true, area: 800 },
                value: 80,
              },
              opacity: { value: 0.3 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 z-0"
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

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 pt-32">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Selesaikan Pembayaran
          </h1>
          <p className="text-white text-sm md:text-base drop-shadow">
            Silakan lakukan pembayaran sebelum waktu habis
          </p>
        </div>

        {/* Timer */}
        <div className="max-w-md mx-auto mb-8">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="text-center">
              <p className="text-white text-sm mb-2 drop-shadow">Waktu Pembayaran</p>
              <div className="text-4xl font-bold text-white font-mono drop-shadow-lg">
                {formatTime(timeRemaining)}
              </div>
              {timeRemaining <= 0 && (
                <p className="text-red-300 text-sm mt-2 drop-shadow">
                  Waktu pembayaran telah habis
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Left Column - Order Information */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              Detail Pesanan
            </h2>

            {/* Product Info */}
            <div className="space-y-4">
              <div className="pb-4 border-b border-white/20">
                <p className="text-white/80 drop-shadow text-sm mb-1">Produk</p>
                <p className="text-white font-semibold text-lg">
                  {orderData.product}
                </p>
              </div>

              <div className="pb-4 border-b border-white/20">
                <p className="text-white/80 text-sm mb-1 drop-shadow">Tipe Pemesanan</p>
                <p className="text-white font-semibold drop-shadow">
                  {orderData.orderType === "private"
                    ? "Akun Private"
                    : "Grup Patungan"}
                </p>
              </div>

              {orderData.orderType === "private" ? (
                <div className="pb-4 border-b border-white/20">
                  <p className="text-white/80 text-sm mb-1 drop-shadow">Paket</p>
                  <p className="text-white font-semibold drop-shadow">
                    {orderData.plan?.name}
                  </p>
                  <p className="text-white/80 text-sm drop-shadow">
                    {orderData.plan?.duration}
                  </p>
                </div>
              ) : (
                <div className="pb-4 border-b border-white/20">
                  <p className="text-white/80 text-sm mb-1 drop-shadow">Grup</p>
                  <p className="text-white font-semibold drop-shadow">
                    {orderData.group?.name}
                  </p>
                  <p className="text-white/80 text-sm drop-shadow">
                    Slot: {orderData.group?.availableSlots}/
                    {orderData.group?.totalSlots} tersedia
                  </p>
                </div>
              )}

              <div className="pb-4 border-b border-white/20">
                <p className="text-white/80 drop-shadow text-sm mb-1">Nama</p>
                <p className="text-white font-semibold">
                  {orderData.customer.name}
                </p>
              </div>

              <div className="pb-4 border-b border-white/20">
                <p className="text-white/80 drop-shadow text-sm mb-1">Email</p>
                <p className="text-white font-semibold">
                  {orderData.customer.email}
                </p>
              </div>

              <div className="pb-4 border-b border-white/20">
                <p className="text-white/80 drop-shadow text-sm mb-1">No. WhatsApp</p>
                <p className="text-white font-semibold">
                  {orderData.customer.phone}
                </p>
              </div>

              {/* Total Price */}
              <div className="pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-white/80 drop-shadow text-lg">Total Pembayaran</p>
                  <p className="text-white font-bold text-2xl">
                    {formatPrice(price)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - QR Code */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              Scan QR Code
            </h2>

            {/* QR Code Display */}
            <div className="bg-white rounded-2xl p-6 mb-6">
              <div className="aspect-square w-full max-w-sm mx-auto flex items-center justify-center">
                {/* Dummy QR Code - Replace with actual QR code generator */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Simple QR-like pattern */}
                  <rect width="200" height="200" fill="white" />
                  <rect x="10" y="10" width="60" height="60" fill="black" />
                  <rect x="20" y="20" width="40" height="40" fill="white" />
                  <rect x="30" y="30" width="20" height="20" fill="black" />

                  <rect x="130" y="10" width="60" height="60" fill="black" />
                  <rect x="140" y="20" width="40" height="40" fill="white" />
                  <rect x="150" y="30" width="20" height="20" fill="black" />

                  <rect x="10" y="130" width="60" height="60" fill="black" />
                  <rect x="20" y="140" width="40" height="40" fill="white" />
                  <rect x="30" y="150" width="20" height="20" fill="black" />

                  {/* Center pattern */}
                  <rect x="80" y="80" width="40" height="40" fill="black" />
                  <rect x="90" y="90" width="20" height="20" fill="white" />

                  {/* Random pattern */}
                  <rect x="10" y="80" width="10" height="10" fill="black" />
                  <rect x="30" y="80" width="10" height="10" fill="black" />
                  <rect x="50" y="80" width="10" height="10" fill="black" />
                  <rect x="10" y="100" width="10" height="10" fill="black" />
                  <rect x="30" y="100" width="10" height="10" fill="black" />
                  <rect x="50" y="100" width="10" height="10" fill="black" />

                  <rect x="130" y="80" width="10" height="10" fill="black" />
                  <rect x="150" y="80" width="10" height="10" fill="black" />
                  <rect x="170" y="80" width="10" height="10" fill="black" />
                  <rect x="130" y="100" width="10" height="10" fill="black" />
                  <rect x="150" y="100" width="10" height="10" fill="black" />
                  <rect x="170" y="100" width="10" height="10" fill="black" />

                  <rect x="80" y="130" width="10" height="10" fill="black" />
                  <rect x="100" y="130" width="10" height="10" fill="black" />
                  <rect x="80" y="150" width="10" height="10" fill="black" />
                  <rect x="100" y="150" width="10" height="10" fill="black" />
                  <rect x="80" y="170" width="10" height="10" fill="black" />
                  <rect x="100" y="170" width="10" height="10" fill="black" />
                </svg>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span>💳</span>
                  <span>Cara Pembayaran</span>
                </h3>
                <ol className="text-white/80 drop-shadow text-sm space-y-2 list-decimal list-inside">
                  <li>Buka aplikasi e-wallet atau mobile banking Anda</li>
                  <li>Pilih menu Scan QR Code</li>
                  <li>Arahkan kamera ke QR code di atas</li>
                  <li>Pastikan nominal pembayaran sesuai</li>
                  <li>Konfirmasi pembayaran</li>
                </ol>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span>ℹ️</span>
                  <span>Informasi</span>
                </h3>
                <ul className="text-white/80 drop-shadow text-sm space-y-1">
                  <li>• Pembayaran diproses otomatis</li>
                  <li>• Akun akan dikirim via email & WhatsApp</li>
                  <li>• Proses maksimal 5 menit setelah pembayaran</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Link
            href={`/order?package=${orderData.productSlug}`}
            className="inline-flex items-center gap-2 text-white hover:text-white/80 drop-shadow transition-colors"
          >
            <span>←</span>
            <span>Kembali ke Halaman Pemesanan</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
