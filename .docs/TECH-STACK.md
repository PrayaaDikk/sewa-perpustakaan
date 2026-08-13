````markdown
# Dokumentasi Spesifikasi Teknis (Tech Stack)

## 1. Overview Teknologi

Sistem Web Hitung Sewa & Denda Perpustakaan dibangun menggunakan arsitektur **Client-Side Lightweight Web Application**. Seluruh logika bisnis, validasi, dan pemrosesan kalkulasi dijalankan secara langsung di _browser_ pengguna tanpa membutuhkan _backend server_ terpisah.

---

## 2. Rincian Tech Stack

| Komponen                | Teknologi                             | Deskripsi & Peran                                                                                                         |
| :---------------------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------ |
| **Markup (Structure)**  | **HTML5**                             | Menyediakan struktur elemen antarmuka web, termasuk _form input_, tombol aksi, dan area _card display_ hasil perhitungan. |
| **Styling (UI/Design)** | **CSS3**                              | Mengatur tata letak responsif (_Flexbox/Grid_), skema warna, tipografi, dan gaya visual kartu rincian tagihan.            |
| **Logic (Behavior)**    | **JavaScript (ES6+)**                 | Menangani logika utama: membaca input, melakukan _fetch_ data JSON, menghitung denda/total bayar, serta manipulasi DOM.   |
| **Data Storage**        | **JSON (JavaScript Object Notation)** | Bertindak sebagai _flat-file database_ lokal untuk menyimpan _master data_ buku beserta tarif sewa harian.                |

---

## 3. Struktur Direktori Proyek

```text
sewa-perpustakaan/
│
├── index.html          # Halaman utama (Form Input & Display Hasil)
├── css/
│   └── style.css       # Style & layouting responsif
├── js/
│   └── app.js          # Logika kalkulasi, event handler, & fetch JSON
└── data/
    └── buku.json       # Database lokal (Master Data Tarif Buku)
```
````

---

## 4. Skema Database JSON (`data/buku.json`)

File `buku.json` berfungsi menyimpan daftar buku yang tersedia beserta tarif sewa harian masing-masing:

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

## 5. Alur Pemrosesan Data (Client-Side Workflow)

```text
[User Form Input]
       │
       ▼
[JavaScript Event Listener (Submit)]
       │
       ▼
[Fetch Data 'data/buku.json'] ──> [Filter Match: id_buku]
                                        │
                                        ▼
                          [Kalkulasi Denda & Total Bayar]
                                        │
                                        ▼
                        [Manipulasi DOM / Update UI Web]

```

1. **Input Reader:** JavaScript membaca nilai `id_buku` dan `jumlah_hari` dari form HTML.
2. **Data Lookup:** Mengambil data dari `buku.json` menggunakan API `fetch()` dan mencocokkan `id_buku`.
3. **Calculation:** Menjalankan rumus denda (jika `jumlah_hari` > 7) dan mengkalkulasi `total_bayar`.
4. **DOM Rendering:** Menampilkan hasil perhitungan langsung ke dalam elemen HTML secara instan (_without page reload_).

```

```
