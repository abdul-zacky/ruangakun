import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Selamat Datang di RuangAkun</h1>
        <p>
          Sistem Manajemen Akun Modern
        </p>
      </div>

      <div className={styles.center}>
        <div className={styles.logo}>
          <h2>🏠 RuangAkun</h2>
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="/dashboard"
          className={styles.card}
        >
          <h2>
            Dashboard <span>-&gt;</span>
          </h2>
          <p>Lihat ringkasan akun dan aktivitas terkini.</p>
        </a>

        <a
          href="/accounts"
          className={styles.card}
        >
          <h2>
            Kelola Akun <span>-&gt;</span>
          </h2>
          <p>Tambah, edit, dan kelola semua akun Anda.</p>
        </a>

        <a
          href="/reports"
          className={styles.card}
        >
          <h2>
            Laporan <span>-&gt;</span>
          </h2>
          <p>Akses laporan keuangan dan analitik lengkap.</p>
        </a>

        <a
          href="/settings"
          className={styles.card}
        >
          <h2>
            Pengaturan <span>-&gt;</span>
          </h2>
          <p>Konfigurasi aplikasi dan preferensi Anda.</p>
        </a>
      </div>
    </main>
  )
}
