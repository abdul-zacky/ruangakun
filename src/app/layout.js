import './globals.css'

export const metadata = {
  title: 'RuangAkun',
  description: 'Aplikasi RuangAkun - Manajemen Akun',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
