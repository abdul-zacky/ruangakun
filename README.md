# RuangAkun

Aplikasi manajemen akun modern yang dibangun dengan Next.js 14 dan App Router.

## Arsitektur Proyek

```
ruangakun/
├── src/
│   └── app/
│       ├── layout.js          # Root layout dengan metadata
│       ├── page.js             # Homepage
│       ├── page.module.css     # CSS Modules untuk homepage
│       └── globals.css         # Global styles
├── public/                     # Static assets
├── package.json
├── next.config.js
├── .eslintrc.json
└── .gitignore
```

## Fitur Utama

- ✅ **App Router** - Menggunakan Next.js 14 App Router terbaru
- ✅ **CSS Modules** - Component-scoped styling
- ✅ **ESLint** - Code quality dan best practices
- ✅ **Struktur Folder `src/`** - Memisahkan source code dari konfigurasi

## Persyaratan

- Node.js 18.17 atau lebih tinggi
- npm atau yarn

## Instalasi

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Scripts

```bash
npm run dev      # Jalankan development server
npm run build    # Build untuk production
npm run start    # Jalankan production server
npm run lint     # Jalankan ESLint
```

## Struktur Best Practices

Proyek ini mengikuti best practices Next.js:

1. **`src/app/` directory** - Semua source code di dalam `src/`
2. **App Router** - Menggunakan fitur routing terbaru Next.js
3. **CSS Modules** - Scoped CSS untuk setiap komponen
4. **Metadata API** - SEO-friendly dengan metadata di layout
5. **ESLint** - Code quality terjaga

## Pengembangan Selanjutnya

Struktur siap untuk ditambahkan:
- `/src/app/dashboard` - Halaman dashboard
- `/src/app/accounts` - Manajemen akun
- `/src/app/reports` - Laporan
- `/src/components` - Reusable components
- `/src/lib` - Utility functions
- `/src/styles` - Shared styles

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
