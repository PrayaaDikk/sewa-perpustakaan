# Web Hitung Sewa & Denda Perpustakaan

Aplikasi berbasis web yang responsif, cepat, dan akurat untuk menghitung biaya sewa dan denda keterlambatan pengembalian buku perpustakaan secara mandiri maupun oleh petugas perpustakaan.

## Fitur Utama

- **Input Data Transaksi**: Form untuk memilih ID Buku dan memasukkan jumlah hari pinjam.
- **Fetch Tarif Buku**: Sistem secara otomatis mengambil tarif sewa harian berdasarkan ID Buku dari database lokal (`data/buku.json`).
- **Kalkulasi Denda Otomatis**: Menghitung keterlambatan (jika peminjaman > 7 hari) dengan tarif denda Rp2.000 per hari.
- **Rincian Pembayaran**: Menampilkan ringkasan tagihan lengkap dengan breakdown denda dan total bayar secara instan.
- **Reset Form**: Tombol untuk membersihkan input dan mengulang kalkulasi baru.

## Tech Stack

- **Markup**: HTML5 (Semantic elements)
- **Styling**: CSS3 (Flexbox/Grid, Responsive layout, Warm Cream & Deep Forest Green palette)
- **Logic**: JavaScript (ES6+, Single Responsibility Principle / 1 tugas 1 fungsi)
- **Storage**: JSON (Flat-file database lokal `data/buku.json`)

## Struktur Direktori Proyek

```text
web/
├── index.html          # Halaman utama aplikasi (Form & Dashboard Display)
├── css/
│   └── style.css       # Desain antarmuka, warna, dan layout responsif
├── js/
│   └── app.js          # Logika kalkulasi, fetch JSON, dan manipulasi DOM
├── data/
│   └── buku.json       # Database master tarif buku
├── .docs/              # Dokumentasi spesifikasi proyek (PRD, TECH-STACK, DESIGN, RULES, TASKS)
├── test.js             # Skrip unit test pengujian logika bisnis
└── README.md           # Dokumentasi proyek
```

## Aturan Bisnis & Rumus Kalkulasi

1. **Batas Peminjaman Normal**: 7 Hari.
2. **Tarif Denda**: Rp2.000 per hari untuk setiap hari keterlambatan melebihi 7 hari.
3. **Rumus Kalkulasi**:
    - `hari_terlambat = MAX(0, jumlah_hari - 7)`
    - `denda = hari_terlambat * 2000`
    - `total_bayar = (jumlah_hari * harga_per_hari) + denda`

## Cara Menjalankan Aplikasi

1. Clone atau unduh repositori ini.
2. Buka folder proyek di browser atau jalankan menggunakan local server (seperti Live Server di VS Code).
3. Akses file `index.html` melalui browser Anda.

## Cara Menjalankan Unit Testing

Untuk menjalankan pengujian logika bisnis:

```bash
node test.js
```
