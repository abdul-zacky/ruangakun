#!/usr/bin/env python3
import re

# Read the file
with open('src/app/order/page.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add useRouter import
content = content.replace(
    'import { useSearchParams } from "next/navigation";',
    'import { useSearchParams, useRouter } from "next/navigation";'
)

# 2. Remove glassClasses variable
content = content.replace(
    'const glassClasses =\n  "rounded-3xl border border-white/30 bg-white/40 backdrop-blur-xl shadow-lg shadow-[#092A4D0d]";',
    '// Removed - using inline classes for glass morphism effect'
)

# 3. Update return statement - background and particles
content = content.replace(
    'return (\n    <div className="min-h-screen bg-[#F9F7F8]">',
    'const navigation = [\n    { label: "Beranda", href: "/" },\n    { label: "Manfaat", href: "/#manfaat" },\n    { label: "Produk", href: "/#produk" },\n    { label: "Cara Order", href: "/#cara-order" },\n    { label: "Transformasi", href: "/#transformasi" },\n    { label: "Kontak", href: "/#kontak" },\n  ];\n\n  return (\n    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#092A4D] via-[#3D73B1] to-[#DBE3F0]">'
)

# Write the file
with open('src/app/order/page.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Order page updated successfully!")
