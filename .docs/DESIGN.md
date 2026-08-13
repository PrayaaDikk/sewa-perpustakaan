# Dokumen Desain Sistem & UI/UX (`DESIGN.md`)

Dokumen ini mendefinisikan arsitektur folder, skema basis data, tata cara *error handling*, serta spesifikasi desain antarmuka (*UI/UX*) dan desain responsif berdasarkan referensi visual modern dashboard perpustakaan.

---

## 1. Desain Visual & Color Palette (Referensi Gambar 1)

Terinspirasi dari antarmuka web perpustakaan modern yang bersih, elegan, dan ramah pengguna (*clean dashboard aesthetic*):

### 1.1. Color Palette
- **Background Utama (Canvas):** `#F7F5F0` (Warm Cream / Soft Beige)
- **Container / Card Background:** `#FFFFFF` (Pure White dengan *soft shadow*)
- **Primary / Accent Color (Sidebar & Buttons):** `#1B3B2B` (Deep Forest Green / Dark Emerald)
- **Secondary / Hover Color:** `#2C5E45` (Medium Forest Green)
- **Text Primary (Headings & Dark Text):** `#1A1A1A` (Charcoal Black)
- **Text Secondary (Subtitles & Labels):** `#6B7280` (Muted Gray)
- **Border & Divider Color:** `#E5E7EB` (Light Gray)
- **Feedback / Alert Colors:**
  - Success/Info: `#10B981` (Emerald Green)
  - Warning/Error: `#EF4444` (Soft Red)

### 1.2. Typography & Styling Rules
- **Font Family:** Inter, Poppins, or system-ui sans-serif.
- **Border Radius:** *Rounded-xl* (`12px` hingga `16px`) untuk kartu, tombol, dan kotak pencarian.
- **Shadows:** *Soft drop shadows* (`0 4px 6px -1px rgba(0, 0, 0, 0.05)`) untuk memberikan kesan melayang (*elevated cards*).

---

## 2. Skema Basis Data (Database Schema)

Karena menggunakan pendekatan *Client-Side Lightweight Web Application*, data disimpan dalam bentuk *flat-file* JSON di direktori `data/buku.json`.

### 2.1. Struktur Tabel / Koleksi `buku.json`

| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id_buku` | `STRING` | Primary Key, Unique | Kode unik identifikasi buku (misal: `BK-001`). |
| `judul` | `STRING` | Not Null | Nama / judul lengkap buku perpustakaan. |
| `harga_per_hari`| `NUMBER` (Real) | Not Null, > 0 | Tarif sewa dasar per hari dalam Rupiah. |

### 2.2. Contoh Data JSON (`data/buku.json`)
```json
[
    {
        "id_buku": "BK-001",
        "judul": "Algoritma dan Pemrograman",
        "harga_per_hari": 5000
    },
    {
        "id_buku": "BK-002",
        "judul": "Struktur Data C++",
        "harga_per_hari": 4500
    },
    {
        "id_buku": "BK-003",
        "judul": "Dasar-Dasar Web HTML/CSS",
        "harga_per_hari": 3500
    }
]
```

---

## 3. Arsitektur Folder & Struktur Proyek

Struktur direktori dirancang modular dan bersih untuk memisahkan struktur (*HTML*), presentasi (*CSS*), logika (*JS*), dan data (*JSON*):

```text
sewa-perpustakaan/
│
├── index.html              # Halaman utama (Semantic HTML5 layout)
├── css/
│   └── style.css           # Styling global, variabel warna, & layout responsif
├── js/
│   └── app.js              # Modulus logika utama (mengikuti prinsip 1 tugas 1 fungsi)
└── data/
    └── buku.json           # Master data tarif buku (Local JSON database)
```

---

## 4. Tata Cara Error Handling (Error Handling Procedures)

Untuk memastikan aplikasi tetap stabil dan memberikan umpan balik yang jelas kepada pengguna (*User Feedback*), diterapkan aturan penanganan kesalahan berikut:

1. **Validasi Form Input (*Client-Side Validation*):**
   - Jika kolom `ID Buku` kosong atau `Jumlah Hari Pinjam` $\le 0$:
     - Hentikan eksekusi perhitungan.
     - Tampilkan pesan kesalahan (*error banner* / *tooltip*) berwarna merah di bawah *input* terkait.
2. **Penanganan ID Buku Tidak Ditemukan:**
   - Jika pengguna memasukkan `ID Buku` yang tidak terdaftar di `buku.json`:
     - Tangkap kondisi *match not found*.
     - Tampilkan *alert/warning* di area hasil: *"ID Buku tidak valid atau tidak ditemukan dalam database."*
3. **Penanganan Kegagalan Fetch JSON (`try...catch`):**
   - Saat aplikasi melakukan `fetch('data/buku.json')`, wajib dibungkus dalam blok `try...catch`.
   - Jika terjadi *network error* atau file gagal dimuat:
     - Catat error ke *console* (`console.error`).
     - Tampilkan pesan *fallback* yang ramah pengguna di antarmuka web: *"Gagal memuat database buku. Silakan muat ulang halaman."*

---

## 5. Desain Responsif (Responsive Design)

Aplikasi dirancang dengan pendekatan *Mobile-First / Responsive Grid* agar optimal di berbagai ukuran layar:

1. **Breakpoint & Layout:**
   - **Mobile Devices (< 768px):**
     - Layout berubah menjadi *single-column stack* (Sidebar tersembunyi atau berubah menjadi *dropdown/hamburger menu*, form input dan kartu hasil disusun vertikal penuh).
   - **Desktop / Tablet (> 768px):**
     - Layout *dashboard* dua kolom (Sidebar navigasi di sebelah kiri, area utama *Discover / Calculator Dashboard* di sebelah kanan, terinspirasi dari layout referensi Gambar 1).
2. **Teknik Layout CSS:**
   - Menggunakan **CSS Flexbox** dan **CSS Grid** untuk perataan elemen yang fleksibel dan dinamis tanpa elemen *floating* yang kaku.
   - Menggunakan unit relatif (`rem`, `%`, `vw`) untuk ukuran font dan *padding* agar proporsional di segala resolusi layar.
