"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    description: '',
    features: '',
    base_price: '',
    admin_price: '',
    min_user: 1,
    max_user: 10,
  });

  const [iconFile, setIconFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Convert semicolon-separated values to JSON array
      let featuresArray = null;
      if (formData.features.trim()) {
        featuresArray = formData.features
          .split(';')
          .map(item => item.trim())
          .filter(item => item.length > 0);
      }

      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('duration', formData.duration);
      submitData.append('description', formData.description);
      submitData.append('features', featuresArray && featuresArray.length > 0 ? JSON.stringify(featuresArray) : '');
      submitData.append('base_price', formData.base_price);
      submitData.append('admin_price', formData.admin_price);
      submitData.append('min_user', formData.min_user);
      submitData.append('max_user', formData.max_user);

      if (iconFile) {
        submitData.append('icon', iconFile);
      }

      const response = await fetch('/api/admin/providers', {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Provider berhasil ditambahkan!' });

        // Reset form
        setFormData({
          name: '',
          duration: '',
          description: '',
          features: '',
          base_price: '',
          admin_price: '',
          min_user: 1,
          max_user: 10,
        });
        setIconFile(null);

        // Close form after 2 seconds
        setTimeout(() => {
          setShowForm(false);
          setMessage({ type: '', text: '' });
          router.refresh();
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Gagal menambahkan provider' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat menambahkan provider' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B2F52] via-[#123D6A] to-[#3D73B1] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-[#092A4D] mb-2">Admin Dashboard</h1>
          <p className="text-[#092A4D]/70 mb-8">Kelola provider layanan premium</p>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full sm:w-auto px-6 py-3 bg-[#3D73B1] text-white rounded-full font-semibold hover:bg-[#092A4D] transition-colors"
            >
              + Tambah Provider
            </button>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#092A4D]">Form Tambah Provider</h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setMessage({ type: '', text: '' });
                  }}
                  className="text-gray-500 hover:text-[#092A4D] text-2xl"
                >
                  &times;
                </button>
              </div>

              {message.text && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    message.type === 'success'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#092A4D] mb-1">
                    Nama Provider *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D73B1] focus:border-transparent"
                    placeholder="e.g., Netflix, Spotify"
                  />
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-[#092A4D] mb-1">
                    Durasi *
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D73B1] focus:border-transparent"
                    placeholder="e.g., 1 Bulan, 30 Hari"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-[#092A4D] mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D73B1] focus:border-transparent"
                    placeholder="Deskripsi singkat tentang layanan ini"
                  />
                </div>

                <div>
                  <label htmlFor="features" className="block text-sm font-medium text-[#092A4D] mb-1">
                    Features
                  </label>
                  <textarea
                    id="features"
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D73B1] focus:border-transparent"
                    placeholder='4K Ultra HD; Multiple Devices; Download Content'
                  />
                  <p className="mt-1 text-xs text-gray-500">Pisahkan setiap fitur dengan titik koma (;)</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="base_price" className="block text-sm font-medium text-[#092A4D] mb-1">
                      Harga Provider (Rp) *
                    </label>
                    <input
                      type="number"
                      id="base_price"
                      name="base_price"
                      value={formData.base_price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D73B1] focus:border-transparent"
                      placeholder="e.g., 100000"
                    />
                  </div>

                  <div>
                    <label htmlFor="admin_price" className="block text-sm font-medium text-[#092A4D] mb-1">
                      Biaya Admin (Rp) *
                    </label>
                    <input
                      type="number"
                      id="admin_price"
                      name="admin_price"
                      value={formData.admin_price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D73B1] focus:border-transparent"
                      placeholder="e.g., 5000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="min_user" className="block text-sm font-medium text-[#092A4D] mb-1">
                      Min User *
                    </label>
                    <input
                      type="number"
                      id="min_user"
                      name="min_user"
                      value={formData.min_user}
                      onChange={handleInputChange}
                      required
                      min="1"
                      max="10"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D73B1] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="max_user" className="block text-sm font-medium text-[#092A4D] mb-1">
                      Max User *
                    </label>
                    <input
                      type="number"
                      id="max_user"
                      name="max_user"
                      value={formData.max_user}
                      onChange={handleInputChange}
                      required
                      min="1"
                      max="10"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D73B1] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="icon" className="block text-sm font-medium text-[#092A4D] mb-1">
                    Icon/Logo
                  </label>
                  <input
                    type="file"
                    id="icon"
                    name="icon"
                    accept="image/jpeg,image/png,image/webp,image/svg+xml"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D73B1] focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">Accepted: JPG, PNG, WebP, SVG (max 5MB)</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-[#3D73B1] text-white rounded-full font-semibold hover:bg-[#092A4D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Menyimpan...' : 'Simpan Provider'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setMessage({ type: '', text: '' });
                    }}
                    className="px-6 py-3 border border-gray-300 text-[#092A4D] rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
