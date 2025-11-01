"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Tag, Calendar, Users } from "lucide-react";

// Data produk (sama seperti di provider page)
const products = {
  netflix: {
    name: "Netflix",
    icon: "🎬",
    pricing: [
      { users: 2, price: "45.000", originalPrice: "90.000", duration: "30 hari", recommended: true },
      { users: 3, price: "30.000", originalPrice: "90.000", duration: "30 hari", recommended: false },
      { users: 4, price: "22.500", originalPrice: "90.000", duration: "30 hari", recommended: false },
      { users: 6, price: "15.000", originalPrice: "90.000", duration: "30 hari", recommended: false },
    ],
    groups: [
      {
        id: 54,
        name: "Grup 54",
        pricePerUser: "45.000",
        totalSlots: 2,
        availableSlots: 1,
        userCount: 2,
        status: "tersedia",
        members: ["FATMA SURYANI HARAHAP"],
        isFull: false,
      },
      {
        id: 55,
        name: "Grup 55",
        pricePerUser: "30.000",
        totalSlots: 3,
        availableSlots: 2,
        userCount: 3,
        status: "tersedia",
        members: ["John Doe"],
        isFull: false,
      },
      {
        id: 56,
        name: "Grup 56",
        pricePerUser: "22.500",
        totalSlots: 4,
        availableSlots: 0,
        userCount: 4,
        status: "penuh",
        members: ["Alice", "Bob", "Charlie", "Diana"],
        isFull: true,
      },
      {
        id: 57,
        name: "Grup 57",
        pricePerUser: "15.000",
        totalSlots: 6,
        availableSlots: 3,
        userCount: 6,
        status: "tersedia",
        members: ["User A", "User B", "User C"],
        isFull: false,
      },
      {
        id: 58,
        name: "Grup 58",
        pricePerUser: "45.000",
        totalSlots: 2,
        availableSlots: 0,
        userCount: 2,
        status: "penuh",
        members: ["Eve", "Frank"],
        isFull: true,
      },
      {
        id: 59,
        name: "Grup 59",
        pricePerUser: "30.000",
        totalSlots: 3,
        availableSlots: 1,
        userCount: 3,
        status: "tersedia",
        members: ["Grace", "Henry"],
        isFull: false,
      },
      {
        id: 60,
        name: "Grup 60",
        pricePerUser: "22.500",
        totalSlots: 4,
        availableSlots: 2,
        userCount: 4,
        status: "tersedia",
        members: ["Ivy", "Jack"],
        isFull: false,
      },
      {
        id: 61,
        name: "Grup 61",
        pricePerUser: "15.000",
        totalSlots: 6,
        availableSlots: 0,
        userCount: 6,
        status: "penuh",
        members: ["Kate", "Liam", "Mia", "Noah", "Olivia", "Peter"],
        isFull: true,
      },
      {
        id: 62,
        name: "Grup 62",
        pricePerUser: "45.000",
        totalSlots: 2,
        availableSlots: 1,
        userCount: 2,
        status: "tersedia",
        members: ["Quinn"],
        isFull: false,
      },
      {
        id: 63,
        name: "Grup 63",
        pricePerUser: "30.000",
        totalSlots: 3,
        availableSlots: 0,
        userCount: 3,
        status: "penuh",
        members: ["Ryan", "Sophia", "Thomas"],
        isFull: true,
      },
      {
        id: 64,
        name: "Grup 64",
        pricePerUser: "22.500",
        totalSlots: 4,
        availableSlots: 3,
        userCount: 4,
        status: "tersedia",
        members: ["Uma"],
        isFull: false,
      },
      {
        id: 65,
        name: "Grup 65",
        pricePerUser: "15.000",
        totalSlots: 6,
        availableSlots: 4,
        userCount: 6,
        status: "tersedia",
        members: ["Victor", "Wendy"],
        isFull: false,
      },
    ],
  },
  spotify: {
    name: "Spotify Premium",
    icon: "🎵",
    pricing: [
      { users: 2, price: "35.000", originalPrice: "70.000", duration: "30 hari", recommended: true },
      { users: 3, price: "23.333", originalPrice: "70.000", duration: "30 hari", recommended: false },
      { users: 4, price: "17.500", originalPrice: "70.000", duration: "30 hari", recommended: false },
      { users: 6, price: "11.666", originalPrice: "70.000", duration: "30 hari", recommended: false },
    ],
    groups: [
      {
        id: 21,
        name: "Grup 21",
        pricePerUser: "35.000",
        totalSlots: 2,
        availableSlots: 1,
        userCount: 2,
        status: "tersedia",
        members: ["User A"],
        isFull: false,
      },
      {
        id: 22,
        name: "Grup 22",
        pricePerUser: "23.333",
        totalSlots: 3,
        availableSlots: 0,
        userCount: 3,
        status: "penuh",
        members: ["User B", "User C", "User D"],
        isFull: true,
      },
    ],
  },
  youtube: {
    name: "YouTube Premium",
    icon: "▶️",
    pricing: [
      { users: 2, price: "40.000", originalPrice: "80.000", duration: "30 hari", recommended: true },
      { users: 3, price: "26.666", originalPrice: "80.000", duration: "30 hari", recommended: false },
      { users: 4, price: "20.000", originalPrice: "80.000", duration: "30 hari", recommended: false },
      { users: 5, price: "16.000", originalPrice: "80.000", duration: "30 hari", recommended: false },
    ],
    groups: [
      {
        id: 31,
        name: "Grup 31",
        pricePerUser: "40.000",
        totalSlots: 2,
        availableSlots: 1,
        userCount: 2,
        status: "tersedia",
        members: ["Member 1"],
        isFull: false,
      },
    ],
  },
  disney: {
    name: "Disney+ Hotstar",
    icon: "🏰",
    pricing: [
      { users: 2, price: "45.000", originalPrice: "90.000", duration: "30 hari", recommended: true },
      { users: 3, price: "30.000", originalPrice: "90.000", duration: "30 hari", recommended: false },
      { users: 4, price: "22.500", originalPrice: "90.000", duration: "30 hari", recommended: false },
    ],
    groups: [
      {
        id: 41,
        name: "Grup 41",
        pricePerUser: "45.000",
        totalSlots: 2,
        availableSlots: 1,
        userCount: 2,
        status: "tersedia",
        members: ["Disney Fan"],
        isFull: false,
      },
    ],
  },
  canva: {
    name: "Canva Pro",
    icon: "🎨",
    pricing: [
      { users: 2, price: "50.000", originalPrice: "100.000", duration: "30 hari", recommended: true },
      { users: 3, price: "33.333", originalPrice: "100.000", duration: "30 hari", recommended: false },
      { users: 5, price: "20.000", originalPrice: "100.000", duration: "30 hari", recommended: false },
    ],
    groups: [
      {
        id: 51,
        name: "Grup 51",
        pricePerUser: "50.000",
        totalSlots: 2,
        availableSlots: 1,
        userCount: 2,
        status: "tersedia",
        members: ["Designer A"],
        isFull: false,
      },
    ],
  },
  viu: {
    name: "VIU Premium",
    icon: "📺",
    pricing: [
      { users: 2, price: "25.000", originalPrice: "50.000", duration: "30 hari", recommended: true },
      { users: 3, price: "16.666", originalPrice: "50.000", duration: "30 hari", recommended: false },
      { users: 6, price: "8.333", originalPrice: "50.000", duration: "30 hari", recommended: false },
    ],
    groups: [
      {
        id: 61,
        name: "Grup 61",
        pricePerUser: "25.000",
        totalSlots: 2,
        availableSlots: 1,
        userCount: 2,
        status: "tersedia",
        members: ["VIU Lover"],
        isFull: false,
      },
    ],
  },
};

export default function DaftarRuanganPage() {
  const params = useParams();
  const router = useRouter();
  const productSlug = params.name;
  const product = products[productSlug];

  const [selectedUserCount, setSelectedUserCount] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  // Redirect if product not found
  useEffect(() => {
    if (!product) {
      router.push("/");
      return;
    }

    // Set default selected user count to recommended option
    const recommended = product.pricing.find(p => p.recommended);
    if (recommended) {
      setSelectedUserCount(recommended.users);
    } else {
      setSelectedUserCount(product.pricing[0].users);
    }

    // Load saved info from cookies
    const savedName = getCookie("user_name");
    const savedPhone = getCookie("user_phone");

    if (savedName || savedPhone) {
      setFormData({
        name: savedName || "",
        phone: savedPhone || "",
      });
      setSaveInfo(true);
    }
  }, [product, router]);

  if (!product) {
    return null;
  }

  // Get current price based on selected user count
  const currentPricing = product.pricing.find(p => p.users === selectedUserCount) || product.pricing[0];

  // Filter groups based on selected user count
  const availableGroups = product.groups
    .filter(group => group.userCount === selectedUserCount && !group.isFull);

  const fullGroups = product.groups
    .filter(group => group.userCount === selectedUserCount && group.isFull);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save to cookies if checkbox is checked
    if (saveInfo) {
      setCookie("user_name", formData.name);
      setCookie("user_phone", formData.phone);
    } else {
      setCookie("user_name", "", -1);
      setCookie("user_phone", "", -1);
    }

    // Prepare order data
    const orderData = {
      product: product.name,
      productSlug: productSlug,
      userCount: selectedUserCount,
      pricePerUser: currentPricing.price,
      totalPrice: currentPricing.price,
      customer: formData,
      timestamp: new Date().toISOString(),
    };

    // Save order data to sessionStorage
    sessionStorage.setItem("currentOrder", JSON.stringify(orderData));

    // Redirect to payment page
    router.push("/payment");
  };

  const navigation = [
    { label: "Daftar Layanan", href: "/#produk" },
    { label: "Tentang", href: "/#manfaat" },
    { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <div className="relative min-h-screen bg-white">
      {/* Navigation */}
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
          <Link
            href={`/provider/${productSlug}`}
            className="text-sm font-medium text-[#092A4D] hover:text-[#3D73B1] transition-colors"
          >
            ← Kembali
          </Link>
        </nav>
      </header>

      {/* Product Brief Section */}
      <section className="relative pt-32 pb-12 bg-gradient-to-b from-[#F9F7F8] to-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Product Icon/Logo */}
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#3D73B1] to-[#092A4D] text-5xl shadow-lg">
              {product.icon}
            </div>

            {/* Product Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-[#092A4D] md:text-5xl">
                Daftar Ruangan {product.name}
              </h1>

              {/* User Count Selector */}
              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                {product.pricing.map((option) => (
                  <button
                    key={option.users}
                    onClick={() => setSelectedUserCount(option.users)}
                    className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                      selectedUserCount === option.users
                        ? "bg-gradient-to-r from-[#3D73B1] to-[#092A4D] text-white shadow-lg"
                        : "bg-[#DBE3F0]/50 text-[#092A4D] hover:bg-[#DBE3F0]"
                    }`}
                  >
                    {option.users} User - Rp{option.price}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative mx-auto max-w-6xl px-6 pb-20">
        {/* Ruangan Tersedia */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#092A4D] mb-6">
            Ruangan Tersedia ({availableGroups.length})
          </h2>

          {availableGroups.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {availableGroups.map((group) => (
                <div
                  key={group.id}
                  className="rounded-2xl border-2 border-[#DBE3F0]/30 bg-[#F9F7F8] p-6 transition-all hover:border-[#3D73B1]/30 hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#3D73B1] to-[#092A4D] text-xl font-bold text-white shadow-md">
                        {group.id}
                      </div>
                      <div>
                        <div className="font-semibold text-[#092A4D] text-lg">
                          {group.name}
                        </div>
                        <div className="text-sm text-[#092A4D]/60">
                          Rp{group.pricePerUser}/user • {group.userCount} user
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#092A4D]/60 mb-1">
                        Slot tersedia
                      </div>
                      <div className="text-lg font-bold text-[#3D73B1]">
                        {group.availableSlots}/{group.totalSlots}
                      </div>
                    </div>
                  </div>

                  {/* Members List */}
                  <div className="rounded-xl bg-white border border-[#DBE3F0]/30 p-4 mb-4">
                    <div className="mb-3 text-xs font-semibold text-[#092A4D]/60">
                      Anggota ({group.totalSlots - group.availableSlots}/{group.totalSlots}):
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
                          <span className="text-green-500">✓</span>
                        </div>
                      ))}
                      {Array.from({ length: group.availableSlots }).map(
                        (_, idx) => (
                          <div
                            key={`empty-${idx}`}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#DBE3F0]/50 border border-[#DBE3F0] text-xs font-semibold text-[#092A4D]/40">
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
                    onClick={handleOpenPopup}
                    className="w-full rounded-full bg-gradient-to-r from-[#3D73B1] to-[#092A4D] px-6 py-3 text-center font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
                  >
                    Gabung Ruangan
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#092A4D]/60 bg-[#F9F7F8] rounded-2xl">
              Tidak ada ruangan tersedia untuk {selectedUserCount} user
            </div>
          )}
        </div>

        {/* Ruangan Penuh */}
        <div>
          <h2 className="text-2xl font-bold text-[#092A4D] mb-6">
            Ruangan Penuh ({fullGroups.length})
          </h2>

          {fullGroups.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {fullGroups.map((group) => (
                <div
                  key={group.id}
                  className="rounded-2xl border-2 border-[#DBE3F0]/30 bg-[#F9F7F8] p-6 opacity-60"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#092A4D]/50 to-[#092A4D]/30 text-xl font-bold text-white shadow-md">
                        {group.id}
                      </div>
                      <div>
                        <div className="font-semibold text-[#092A4D] text-lg">
                          {group.name}
                        </div>
                        <div className="text-sm text-[#092A4D]/60">
                          Rp{group.pricePerUser}/user • {group.userCount} user
                        </div>
                        <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                          Penuh
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#092A4D]/60 mb-1">
                        Slot tersedia
                      </div>
                      <div className="text-lg font-bold text-red-500">
                        {group.availableSlots}/{group.totalSlots}
                      </div>
                    </div>
                  </div>

                  {/* Members List */}
                  <div className="rounded-xl bg-white border border-[#DBE3F0]/30 p-4">
                    <div className="mb-3 text-xs font-semibold text-[#092A4D]/60">
                      Anggota ({group.totalSlots}/{group.totalSlots}):
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
                          <span className="text-green-500">✓</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#092A4D]/60 bg-[#F9F7F8] rounded-2xl">
              Tidak ada ruangan penuh untuk {selectedUserCount} user
            </div>
          )}
        </div>
      </section>

      {/* Form Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="backdrop-blur-2xl bg-white rounded-3xl border-2 border-[#DBE3F0]/30 shadow-2xl relative w-full max-w-md p-8">
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
                  className="w-full rounded-xl border border-[#092A4D]/20 bg-white px-4 py-3 text-[#092A4D] placeholder-[#092A4D]/40 transition-all focus:border-[#3D73B1] focus:outline-none focus:ring-2 focus:ring-[#3D73B1]/20"
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
                  className="w-full rounded-xl border border-[#092A4D]/20 bg-white px-4 py-3 text-[#092A4D] placeholder-[#092A4D]/40 transition-all focus:border-[#3D73B1] focus:outline-none focus:ring-2 focus:ring-[#3D73B1]/20"
                  placeholder="08123456789"
                />
              </div>

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
