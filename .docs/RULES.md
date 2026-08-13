# Project Rules & Development Guidelines (`RULES.md`)

Dokumen ini berisi standar pengembangan, konvensi penamaan, tech stack, serta aturan arsitektur kode untuk proyek **Web Hitung Sewa & Denda Perpustakaan**.

---

## 1. Tech Stack & Arsitektur

Proyek ini menggunakan arsitektur **Client-Side Lightweight Web Application** tanpa *backend server* terpisah.

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Markup (Structure)** | **HTML5** | Menggunakan elemen semantik HTML5 (`<header>`, `<main>`, `<section>`, `<form>`, dll). |
| **Styling (UI/Design)** | **CSS3** | Layout responsif (Flexbox/Grid), skema warna modular, dan antarmuka bersih/minimalis. |
| **Logic (Behavior)** | **JavaScript (ES6+)** | Modular script untuk kalkulasi, *fetch* JSON, manipulasi DOM, dan validasi *input*. |
| **Data Storage** | **JSON** | *Flat-file database* lokal (`data/buku.json`) sebagai master data tarif buku. |

---

## 2. Struktur Direktori Proyek

```text
sewa-perpustakaan/
│
├── index.html          # Halaman utama (Form Input & Display Hasil)
├── css/
│   └── style.css       # Style & layouting responsif
├── js/
│   └── app.js          # File utama (mengimpor fungsi modular sesuai prinsip 1 tugas 1 fungsi)
└── data/
    └── buku.json       # Database lokal (Master Data Tarif Buku)
```

---

## 3. Konvensi Penamaan (Naming Conventions)

1. **File & Folder:**
   - Direktori: Huruf kecil dengan tanda hubung (`css/`, `js/`, `data/`, `.docs/`).
   - File HTML/CSS/JS: Huruf kecil, *kebab-case* atau *camelCase* yang konsisten (misal: `style.css`, `app.js`, `buku.json`).
2. **JavaScript:**
   - **Variabel & Konstanta:** Menggunakan `camelCase` (misal: `jumlahHari`, `hargaPerHari`, `totalBayar`). Konstanta global/tetapan menggunakan `UPPER_SNAKE_CASE` (misal: `DENDA_PER_HARI`, `BATAS_HARI_NORMAL`).
   - **Fungsi:** Menggunakan format *verb-first* / `camelCase` yang mendeskripsikan aksi tugasnya (misal: `fetchDataBuku`, `hitungDenda`, `renderHasilSewa`, `validasiInput`).
3. **HTML & CSS:**
   - **ID & Class CSS:** Menggunakan *kebab-case* (misal: `class="summary-card"`, `id="form-hitung"`, `id="input-id-buku"`).
   - **Atribut HTML:** Huruf kecil dengan tanda kutip ganda (`""`).

---

## 4. Aturan Tambahan & Standar Koding

### 4.1. Penggunaan HTML Semantik
Setiap halaman web wajib menggunakan elemen HTML5 semantik untuk meningkatkan aksesibilitas (*accessibility*) dan keterbacaan struktur dokumen:
- Gunakan `<header>` untuk bagian kepala halaman/judul.
- Gunakan `<main>` untuk konten utama aplikasi.
- Gunakan `<section>` atau `<article>` untuk mengelompokkan form input dan kartu hasil ringkasan.
- Gunakan `<form>` untuk pembungkus input interaktif beserta elemen `<label>` yang terasosiasi dengan *control* input (`for` dan `id`).
- Gunakan `<button>` untuk aksi interaktif (bukan `<div>` atau `<span>` yang diberi event klik).

### 4.2. Prinsip Satu Tugas, Satu Fungsi (Single Responsibility Principle) untuk JavaScript
Setiap fungsi di dalam file JavaScript wajib menerapkan prinsip modularitas tinggi (**One Task, One Function**):
- **Pemisahan Tanggung Jawab:** Jangan menggabungkan proses *fetch* data, kalkulasi logika bisnis, validasi, dan manipulasi DOM di dalam satu fungsi besar.
- **Ukuran & Kompleksitas:** Buat fungsi kecil dan spesifik yang hanya melakukan satu tugas kalkulasi atau operasi tunggal.
- **Contoh Pemecahan Fungsi:**
  - `bacaInputForm()`: Hanya bertugas mengambil nilai dari elemen *form*.
  - `ambilDataBuku()`: Hanya bertugas melakukan *fetch* dan *parse* file JSON `buku.json`.
  - `cariBukuById(dataBuku, idBuku)`: Hanya bertugas mencocokkan data buku berdasarkan ID.
  - `hitungHariTerlambat(jumlahHari)`: Hanya bertugas menghitung selisih hari (> 7 hari).
  - `hitungTotalBiaya(jumlahHari, hargaPerHari, hariTerlambat)`: Hanya bertugas melakukan operasi aritmatika biaya sewa dan denda.
  - `renderHasilKeDOM(hasil)`: Hanya bertugas memperbarui tampilan antarmuka (DOM).

---

## 5. Logika Bisnis & Aturan Perhitungan

1. **Batas Peminjaman Normal:** 7 Hari.
2. **Tarif Denda:** Rp2.000 per hari untuk setiap hari keterlambatan melebihi 7 hari.
3. **Rumus Kalkulasi:**
   - $\text{hari\_terlambat} = \max(0, \text{jumlah\_hari} - 7)$
   - $\text{denda} = \text{hari\_terlambat} \times 2000$
   - $\text{total\_bayar} = (\text{jumlah\_hari} \times \text{harga\_per\_hari}) + \text{denda}$
