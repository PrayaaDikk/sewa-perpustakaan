# Daftar Tugas Pengembangan (TASKS.md)

Dokumen ini berisi daftar tugas (*task checklist*) terstruktur untuk membangun aplikasi **Web Hitung Sewa & Denda Perpustakaan** berdasarkan dokumen spesifikasi (`PRD.md`, `TECH-STACK.md`, `RULES.md`, dan `DESIGN.md`).

---

## Phase 1: Setup & Struktur Direktori
- [x] **TSK-1.1**: Membuat struktur direktori proyek (`css/`, `js/`, `data/`, dan `.docs/`).
- [x] **TSK-1.2**: Membuat file *database* lokal `data/buku.json` berisi master data buku beserta tarif sewa harian (`id_buku`, `judul`, `harga_per_hari`).

## Phase 2: Desain Antarmuka & Markup (HTML5 & CSS3)
- [x] **TSK-2.1**: Membuat file `index.html` dengan penerapan **HTML5 Semantik** (`<header>`, `<main>`, `<section>`, `<form>`, `<label>`, `<button>`).
- [x] **TSK-2.2**: Membuat file `css/style.css` dengan menerapkan *color palette* referensi (Warm Cream background `#F7F5F0`, Deep Forest Green `#1B3B2B`, *soft shadows*, dan *rounded cards*).
- [x] **TSK-2.3**: Mengimplementasikan *responsive layout* (Mobile-first & Desktop Grid/Flexbox dashboard).

## Phase 3: Implementasi Logika JavaScript (Prinsip 1 Tugas, 1 Fungsi)
- [x] **TSK-3.1**: Membuat modul `js/app.js` dengan fungsi pembaca input form (`bacaInputForm`).
- [x] **TSK-3.2**: Membuat fungsi *async* `ambilDataBuku()` untuk mengambil data dari `data/buku.json` dengan penanganan `try...catch`.
- [x] **TSK-3.3**: Membuat fungsi pencarian buku `cariBukuById(dataBuku, idBuku)`.
- [x] **TSK-3.4**: Membuat fungsi kalkulasi keterlambatan `hitungHariTerlambat(jumlahHari)` (Batas normal 7 hari).
- [x] **TSK-3.5**: Membuat fungsi kalkulasi biaya `hitungTotalBiaya(jumlahHari, hargaPerHari, hariTerlambat)` (Rumus: `(jumlah_hari * harga_per_hari) + denda`).
- [x] **TSK-3.6**: Membuat fungsi penanganan *error/validation* (`tampilkanError`) untuk input kosong atau ID tidak valid.
- [x] **TSK-3.7**: Membuat fungsi manipulasi DOM `renderHasilKeDOM(hasil)` untuk menampilkan ringkasan pembayaran secara instan.
- [x] **TSK-3.8**: Menghubungkan *event listener* pada *submit form* dan tombol *reset*.

## Phase 4: Pengujian & Verifikasi (Testing & Quality Assurance)
- [x] **TSK-4.1**: Melakukan uji coba perhitungan normal ($\le 7$ hari, denda Rp 0).
- [x] **TSK-4.2**: Melakukan uji coba perhitungan denda ($> 7$ hari, denda Rp2.000/hari).
- [x] **TSK-4.3**: Melakukan uji *edge cases* (input kosong, jumlah hari $\le 0$, ID buku tidak terdaftar).
- [x] **TSK-4.4**: Verifikasi responsivitas tampilan di berbagai ukuran layar (*mobile* dan *desktop*).
