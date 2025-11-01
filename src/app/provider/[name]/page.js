"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Tag, Calendar, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { calculatePriceFormatted, getPricingBreakdown, calculateAdminPrice } from "@/lib/pricing";

// Data produk subscription sharing
const products = {
  netflix: {
    name: "Netflix",
    icon: "🎬",
    logo: "/netflix-logo.png", // You can replace with actual logo
    description: "Netflix adalah layanan streaming terkemuka yang menawarkan berbagai film, serial TV, anime, dokumenter, dan konten original berkualitas tinggi. Nikmati pengalaman menonton tanpa iklan dengan kualitas hingga 4K Ultra HD.",
    features: [
      "Akses tak terbatas ke ribuan film dan serial",
      "Konten original Netflix eksklusif",
      "Streaming hingga 4K Ultra HD + HDR",
      "Download untuk ditonton offline",
      "Tidak ada iklan",
      "Bisa dibatalkan kapan saja"
    ],
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
    ],
  },
  spotify: {
    name: "Spotify Premium",
    icon: "🎵",
    logo: "/spotify-logo.png",
    description: "Spotify Premium memberikan akses tak terbatas ke jutaan lagu dan podcast dari seluruh dunia. Dengarkan musik favorit tanpa iklan, dengan kualitas audio superior dan kemampuan download offline.",
    features: [
      "Jutaan lagu dan podcast",
      "Dengarkan tanpa iklan",
      "Kualitas audio hingga 320 kbps",
      "Download untuk offline listening",
      "Skip lagu tanpa batas",
      "Akses di semua perangkat"
    ],
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
    logo: "/youtube-logo.png",
    description: "YouTube Premium menghadirkan pengalaman menonton tanpa gangguan iklan, akses ke YouTube Music, dan fitur background play. Nikmati konten favorit dengan lebih nyaman.",
    features: [
      "Tanpa iklan di semua video",
      "Background play & picture-in-picture",
      "Akses YouTube Music Premium",
      "Download video untuk offline",
      "YouTube Originals eksklusif",
      "Support untuk kreator favorit"
    ],
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
    logo: "/disney-logo.png",
    description: "Disney+ Hotstar menghadirkan konten eksklusif dari Disney, Pixar, Marvel, Star Wars, dan National Geographic. Plus akses ke konten lokal dan olahraga internasional.",
    features: [
      "Konten Disney, Pixar, Marvel, Star Wars",
      "Film dan series Hotstar Originals",
      "Live sports termasuk EPL & F1",
      "Streaming hingga 4K UHD",
      "Download konten untuk offline",
      "Multi-profile support"
    ],
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
    logo: "/canva-logo.png",
    description: "Canva Pro adalah platform desain grafis profesional yang mudah digunakan. Akses jutaan template, foto premium, elemen desain, dan fitur kolaborasi tim untuk membuat konten visual yang memukau.",
    features: [
      "Jutaan template premium",
      "100GB cloud storage",
      "Background remover & Magic Resize",
      "Brand Kit untuk konsistensi brand",
      "Kolaborasi tim real-time",
      "Akses ke seluruh foto & elemen premium"
    ],
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
    logo: "/viu-logo.png",
    description: "VIU Premium memberikan akses ke ribuan drama Korea, Mandarin, Thailand, dan konten Asia lainnya. Tonton serial favorit dengan subtitle bahasa Indonesia tanpa iklan.",
    features: [
      "Ribuan drama Asia terbaru",
      "Episode terbaru 8 jam setelah tayang",
      "Tanpa iklan",
      "Download untuk offline viewing",
      "Subtitle bahasa Indonesia",
      "Streaming hingga Full HD"
    ],
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

// Helper function to get image URL from storage
const getImageUrl = (iconPath) => {
  if (!iconPath) return null;
  if (iconPath.startsWith('http')) return iconPath;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/provider-icons/${iconPath}`;
};

// Cookie helpers (defined before component to avoid hoisting issues)
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

export default function ProviderPage() {
  const params = useParams();
  const router = useRouter();
  const productSlug = params.name;

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUserCount, setSelectedUserCount] = useState(null);
  const [activeTab, setActiveTab] = useState("tersedia"); // "tersedia" or "penuh"
  const [showPopup, setShowPopup] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [ruangan, setRuangan] = useState([]);

  // Fetch provider data from database
  useEffect(() => {
    const fetchProvider = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('provider')
        .select('*')
        .eq('slug', productSlug)
        .single();

      if (error || !data) {
        console.error('Error fetching provider:', error);
        router.push('/');
        return;
      }

      setProvider(data);

      // Set default selected user count to max_user
      setSelectedUserCount(data.max_user);

      setLoading(false);
    };

    fetchProvider();
  }, [productSlug, router]);

  // Fetch ruangan for this provider
  useEffect(() => {
    if (!provider) return;

    const fetchRuangan = async () => {
      const { data, error } = await supabase
        .from('ruangan')
        .select(`
          *,
          ruangan_users (
            id,
            slot_number,
            cookie_user_id,
            payment_id,
            cookie_user (
              full_name
            )
          )
        `)
        .eq('provider_id', provider.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching ruangan:', error);
        return;
      }

      setRuangan(data || []);
    };

    fetchRuangan();
  }, [provider]);

  // Load saved info from cookies
  useEffect(() => {
    const savedName = getCookie("user_name");
    const savedPhone = getCookie("user_phone");

    if (savedName || savedPhone) {
      setFormData({
        name: savedName || "",
        phone: savedPhone || "",
      });
      setSaveInfo(true);
    }
  }, []);

  if (loading || !provider) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-[#092A4D] text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  // Calculate current price based on selected user count using centralized utility
  const pricePerUser = calculatePriceFormatted(provider.base_price, selectedUserCount, provider.max_user, provider.admin_price).replace('Rp', '');

  // Get full pricing breakdown for selected user count
  const pricingBreakdown = getPricingBreakdown(provider.base_price, selectedUserCount, provider.max_user, provider.admin_price);

  // Generate pricing options based on provider's min_user and max_user
  const pricingOptions = [];
  for (let users = provider.min_user; users <= provider.max_user; users++) {
    pricingOptions.push({
      users,
      price: calculatePriceFormatted(provider.base_price, users, provider.max_user, provider.admin_price).replace('Rp', ''),
      duration: provider.duration,
      recommended: users === provider.max_user // Recommend max users for best price
    });
  }

  // Filter ruangan based on active tab
  const filteredRuangan = ruangan
    .filter(room => {
      if (activeTab === "tersedia") {
        return room.status === "tersedia";
      } else {
        return room.status === "penuh" || room.status === "aktif";
      }
    })
    .slice(0, 10); // Show only latest 10

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
      product: provider.name,
      productSlug: productSlug,
      providerId: provider.id,
      userCount: selectedUserCount,
      pricePerUser: pricePerUser,
      totalPrice: pricePerUser,
      basePrice: provider.base_price,
      adminPrice: provider.admin_price,
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
          <a
            href="/"
            className="text-sm font-medium text-[#092A4D] hover:text-[#3D73B1] transition-colors md:hidden"
          >
            ← Kembali
          </a>
        </nav>
      </header>

      {/* Product Brief Section */}
      <section className="relative pt-32 pb-12 bg-gradient-to-b from-[#F9F7F8] to-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Product Icon/Logo */}
            <div className="relative h-24 w-24 rounded-3xl bg-white border-2 border-[#DBE3F0] p-4 shadow-lg overflow-hidden">
              {getImageUrl(provider.icon) && (
                <Image
                  src={getImageUrl(provider.icon)}
                  alt={provider.name}
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-[#092A4D] md:text-5xl">
                {provider.name}
              </h1>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#DBE3F0]/50 px-4 py-2 text-sm font-semibold text-[#092A4D]">
                  <Tag size={16} />
                  Rp{pricePerUser}/user
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#DBE3F0]/50 px-4 py-2 text-sm font-semibold text-[#092A4D]">
                  <Calendar size={16} />
                  {provider.duration}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#DBE3F0]/50 px-4 py-2 text-sm font-semibold text-[#092A4D]">
                  <Users size={16} />
                  {selectedUserCount} User
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="relative mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="flex-1">
            {/* Product Details Section */}
            <div id="product-details" className="mb-12 lg:mb-12">
              <h2 className="text-2xl font-bold text-[#092A4D] mb-6">
                Deskripsi Produk
              </h2>
              <p className="text-[#092A4D]/80 leading-relaxed mb-8">
                {provider.description || 'Layanan premium dengan harga terjangkau melalui sistem patungan.'}
              </p>

              {/* Features */}
              {provider.features && Array.isArray(provider.features) && provider.features.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-[#092A4D] mb-4">
                    Fitur Unggulan
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {provider.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3D73B1]/10 text-[#3D73B1] flex-shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="text-[#092A4D]/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Skema Harga */}
              <h3 className="text-xl font-bold text-[#092A4D] mb-4">
                Skema Harga
              </h3>
              <div className="bg-[#F9F7F8] rounded-2xl p-6 border border-[#DBE3F0]/30">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#092A4D]/80">
                      Harga Provider
                    </span>
                    <span className="text-sm font-semibold text-[#092A4D]">
                      Rp{provider.base_price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#092A4D]/80">
                      Jumlah Member Per Grup
                    </span>
                    <span className="text-sm font-semibold text-[#092A4D]">
                      {selectedUserCount} orang
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#092A4D]/80">
                      Harga Patungan
                    </span>
                    <span className="text-sm font-semibold text-[#092A4D]">
                      Rp{provider.base_price.toLocaleString('id-ID')} ÷ {selectedUserCount} = {pricingBreakdown.basePricePerUserFormatted}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#092A4D]/80">
                      Biaya Admin
                    </span>
                    <span className="text-sm font-semibold text-[#092A4D]">
                      {pricingBreakdown.scaledAdminPriceFormatted}
                      {pricingBreakdown.increasePercentage > 0 && (
                        <span className="text-xs text-[#092A4D]/60 ml-1">
                          (+{pricingBreakdown.increasePercentage}%)
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="h-px bg-[#092A4D]/10"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-[#092A4D]">
                      Harga Paket Perbulan
                    </span>
                    <span className="text-xl font-bold text-[#3D73B1]">
                      {pricingBreakdown.totalPriceFormatted}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Checkout Section - Only visible on mobile */}
            <div className="lg:hidden mb-12">
              <div className="rounded-2xl border-2 border-[#DBE3F0]/30 bg-white shadow-lg p-5">
                <h3 className="text-base font-bold text-[#092A4D] mb-3">
                  Jumlah User
                </h3>

                {/* User Count Selector */}
                <div className="space-y-2 mb-4">
                  {pricingOptions.map((option) => (
                    <button
                      key={option.users}
                      onClick={() => setSelectedUserCount(option.users)}
                      className={`w-full rounded-lg border-2 p-2.5 text-left transition-all relative ${
                        selectedUserCount === option.users
                          ? "border-[#3D73B1] bg-[#3D73B1]/5 shadow-md"
                          : "border-[#DBE3F0]/50 bg-[#F9F7F8] hover:border-[#3D73B1]/30"
                      }`}
                    >
                      {option.recommended && (
                        <span className="absolute -top-1.5 right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          Rekomendasi
                        </span>
                      )}
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-[#092A4D]">
                          {option.users} User
                        </span>
                      </div>
                      <div className="text-lg font-bold text-[#3D73B1]">
                        Rp{option.price}
                      </div>
                      <div className="text-[10px] text-[#092A4D]/60 mt-0.5">
                        {option.duration}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Have Promo Code */}
                <button className="w-full mb-4 flex items-center justify-center gap-2 text-xs text-[#092A4D]/60 hover:text-[#3D73B1] transition-colors">
                  <span>Punya kode promo?</span>
                </button>

                {/* Price Summary */}
                <div className="border-t border-[#DBE3F0]/30 pt-3 mb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-[#092A4D]/60">
                      Harga per user:
                    </span>
                    <span className="text-sm font-semibold text-[#092A4D]">
                      Rp{pricePerUser}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-[#092A4D]">
                      Total Biaya:
                    </span>
                    <span className="text-xl font-bold text-[#3D73B1]">
                      Rp{pricePerUser}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleOpenPopup}
                  className="w-full rounded-full bg-gradient-to-r from-[#3D73B1] to-[#092A4D] px-6 py-3 text-center font-bold text-white transition-all hover:opacity-90 hover:shadow-xl"
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>

            {/* Ruangan Section */}
            <div id="ruangan" className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#092A4D]">
                  Ruangan
                </h2>
                <Link
                  href={`/provider/${productSlug}/daftar-ruangan`}
                  className="text-sm font-semibold text-[#3D73B1] hover:text-[#092A4D] transition-colors"
                >
                  Lihat Semua →
                </Link>
              </div>

              {/* Tab Switch */}
              <div className="mb-6 flex gap-3 border-b border-[#DBE3F0]/30 pb-4">
                <button
                  onClick={() => setActiveTab("tersedia")}
                  className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                    activeTab === "tersedia"
                      ? "bg-[#3D73B1] text-white shadow-lg"
                      : "bg-[#F9F7F8] text-[#092A4D] hover:bg-[#DBE3F0]/50"
                  }`}
                >
                  Ruangan Tersedia
                </button>
                <button
                  onClick={() => setActiveTab("penuh")}
                  className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                    activeTab === "penuh"
                      ? "bg-[#3D73B1] text-white shadow-lg"
                      : "bg-[#F9F7F8] text-[#092A4D] hover:bg-[#DBE3F0]/50"
                  }`}
                >
                  Ruangan Penuh
                </button>
              </div>

              {/* Groups List */}
              <div className="space-y-4">
                {filteredRuangan.length > 0 ? (
                  filteredRuangan.map((room) => {
                    const members = room.ruangan_users || [];
                    const availableSlots = provider.max_user - room.user_count;

                    return (
                      <div
                        key={room.id}
                        className="rounded-2xl border-2 border-[#DBE3F0]/30 bg-[#F9F7F8] p-6 transition-all hover:border-[#3D73B1]/30 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#3D73B1] to-[#092A4D] text-xl font-bold text-white shadow-md">
                              {room.id.slice(0, 4)}
                            </div>
                            <div>
                              <div className="font-semibold text-[#092A4D] text-lg">
                                Room #{room.id.slice(0, 8)}
                              </div>
                              <div className="text-sm text-[#092A4D]/60">
                                Rp{pricePerUser}/user • {provider.max_user} user max
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-[#092A4D]/60 mb-1">
                              Slot tersedia
                            </div>
                            <div className="text-lg font-bold text-[#3D73B1]">
                              {availableSlots}/{provider.max_user}
                            </div>
                          </div>
                        </div>

                        {/* Members List */}
                        <div className="rounded-xl bg-white border border-[#DBE3F0]/30 p-4 mb-4">
                          <div className="mb-3 text-xs font-semibold text-[#092A4D]/60">
                            Anggota ({room.user_count}/{provider.max_user}):
                          </div>
                          <div className="space-y-2">
                            {members.map((member, idx) => (
                              <div
                                key={member.id}
                                className="flex items-center gap-2 text-sm"
                              >
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-semibold text-white">
                                  {member.slot_number}
                                </span>
                                <span className="text-[#092A4D]">
                                  {member.cookie_user?.full_name || `User ${member.slot_number}`}
                                </span>
                                <span className="text-green-500">✓</span>
                              </div>
                            ))}
                            {Array.from({ length: availableSlots }).map((_, idx) => (
                              <div
                                key={`empty-${idx}`}
                                className="flex items-center gap-2 text-sm"
                              >
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#DBE3F0]/50 border border-[#DBE3F0] text-xs font-semibold text-[#092A4D]/40">
                                  {room.user_count + idx + 1}
                                </span>
                                <span className="italic text-[#092A4D]/40">
                                  Tersedia
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {room.status === "tersedia" && (
                          <button
                            onClick={handleOpenPopup}
                            className="w-full rounded-full bg-gradient-to-r from-[#3D73B1] to-[#092A4D] px-6 py-3 text-center font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
                          >
                            Gabung Ruangan
                          </button>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 text-[#092A4D]/60">
                    Belum ada ruangan {activeTab === "tersedia" ? "tersedia" : "penuh"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar (Desktop Only) */}
          <div className="hidden lg:block lg:w-80">
            <div className="lg:sticky lg:top-32">
              <div className="rounded-2xl border-2 border-[#DBE3F0]/30 bg-white shadow-lg p-5">
                <h3 className="text-base font-bold text-[#092A4D] mb-3">
                  Jumlah User
                </h3>

                {/* User Count Selector */}
                <div className="space-y-2 mb-4">
                  {pricingOptions.map((option) => (
                    <button
                      key={option.users}
                      onClick={() => setSelectedUserCount(option.users)}
                      className={`w-full rounded-lg border-2 p-2.5 text-left transition-all relative ${
                        selectedUserCount === option.users
                          ? "border-[#3D73B1] bg-[#3D73B1]/5 shadow-md"
                          : "border-[#DBE3F0]/50 bg-[#F9F7F8] hover:border-[#3D73B1]/30"
                      }`}
                    >
                      {option.recommended && (
                        <span className="absolute -top-1.5 right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          Rekomendasi
                        </span>
                      )}
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-[#092A4D]">
                          {option.users} User
                        </span>
                      </div>
                      <div className="text-lg font-bold text-[#3D73B1]">
                        Rp{option.price}
                      </div>
                      <div className="text-[10px] text-[#092A4D]/60 mt-0.5">
                        {option.duration}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Have Promo Code */}
                <button className="w-full mb-4 flex items-center justify-center gap-2 text-xs text-[#092A4D]/60 hover:text-[#3D73B1] transition-colors">
                  <span>Punya kode promo?</span>
                </button>

                {/* Price Summary */}
                <div className="border-t border-[#DBE3F0]/30 pt-3 mb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-[#092A4D]/60">
                      Harga per user:
                    </span>
                    <span className="text-sm font-semibold text-[#092A4D]">
                      Rp{pricePerUser}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-[#092A4D]">
                      Total Biaya:
                    </span>
                    <span className="text-xl font-bold text-[#3D73B1]">
                      Rp{pricePerUser}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleOpenPopup}
                  className="w-full rounded-full bg-gradient-to-r from-[#3D73B1] to-[#092A4D] px-6 py-4 text-center font-bold text-white transition-all hover:opacity-90 hover:shadow-xl"
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>
          </div>
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
