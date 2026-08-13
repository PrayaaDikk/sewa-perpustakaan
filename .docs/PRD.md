````markdown
# Product Requirement Document (PRD)

## 1. Overview & Objectives

- **Product Name:** Web Hitung Sewa & Denda Perpustakaan
- **Document Owner:** Product Manager / Development Team
- **Target Release Date:** Q3 2026
- **Product Vision:** Menyediakan aplikasi berbasis web yang responsif, cepat, dan akurat untuk menghitung biaya sewa dan denda keterlambatan pengembalian buku perpustakaan.
- **Success Metrics (KPIs):**
    - **Accuracy Rate:** 100% kalkulasi denda dan tarif sewa sesuai logika bisnis.
    - **Response Time:** < 1 detik untuk pemrosesan data kalkulasi.
    - **User Satisfaction:** Kemudahan penggunaan antarmuka web oleh petugas perpustakaan.

---

## 2. Target Audience & User Personas

- **Primary User:** Petugas Perpustakaan (Librarian) yang mencatat transaksi peminjaman/pengembalian secara cepat.
- **Secondary User:** Anggota / Peminjam Buku yang ingin mengecek estimasi biaya sewa dan denda secara mandiri melalui web.

---

## 3. User Features & Functional Requirements

### 3.1 Core Features

| Feature ID | Feature Name             | Description                                                                        | Priority    |
| :--------- | :----------------------- | :--------------------------------------------------------------------------------- | :---------- |
| **FE-01**  | Input Data Transaksi     | Form input untuk memasukkan `ID Buku` dan `Jumlah Hari Pinjam`.                    | High (P0)   |
| **FE-02**  | Fetch Tarif Buku         | Sistem secara otomatis mengambil tarif sewa per hari berdasarkan `ID Buku`.        | High (P0)   |
| **FE-03**  | Kalkulasi Denda Otomatis | Menghitung keterlambatan (jika pinjam > 7 hari) dan mengalikan denda Rp2.000/hari. | High (P0)   |
| **FE-04**  | Rincian Pembayaran       | Menampilkan detail ID Buku, Total Denda, dan Total Biaya Sewa secara visual.       | High (P0)   |
| **FE-05**  | Reset Form               | Tombol untuk membersihkan inputan dan mengulang kalkulasi baru.                    | Medium (P1) |

---

## 4. System Logic & Algorithm Rules

### 4.1 Business Rules

1. **Batas Peminjaman Normal:** 7 Hari.
2. **Tarif Denda:** Rp2.000 per hari untuk setiap hari keterlambatan melebihi 7 hari.
3. **Rumus Kalkulasi:**
    - `hari_terlambat = MAX(0, jumlah_hari - 7)`
    - `denda = hari_terlambat * 2000`
    - `total_bayar = (jumlah_hari * harga_per_hari) + denda`

### 4.2 Pseudocode Implementation

```text
ALGORITHM HitungSewaPerpustakaan

VARIABLES:
    id_buku         : STRING
    jumlah_hari     : INTEGER
    harga_per_hari  : REAL
    hari_terlambat  : INTEGER
    denda           : REAL
    total_bayar     : REAL

MAIN PROGRAM:
    START

    READ id_buku, jumlah_hari

    harga_per_hari = CekBiayaSewaPerHari(id_buku)

    IF jumlah_hari > 7 THEN
        hari_terlambat = jumlah_hari - 7
        denda = hari_terlambat * 2000
    ELSE
        denda = 0
    ENDIF

    total_bayar = (jumlah_hari * harga_per_hari) + denda

    DISPLAY "ID Buku: " + id_buku
    DISPLAY "Total Denda: Rp " + denda
    DISPLAY "Total Bayar: Rp " + total_bayar

    END
```
````

---

## 5. User Interface (UI) & Interaction Requirements

- **Layout:** Single-page Application (SPA) yang bersih dan minimalis.
- **Input Fields:**
- Field Teks/Dropdown: `ID Buku`
- Field Angka (Min: 1): `Jumlah Hari Pinjam`
- Tombol Utama: `Hitung Sewa`

- **Output Display:** Kartu ringkasan (Summary Card) berisi highlight angka `Total Bayar` dan breakdown `Denda`.

---

## 6. Non-Functional Requirements

- **Usability:** Antarmuka intuitif tanpa memerlukan pelatihan khusus bagi pengguna.
- **Compatibility:** Dapat diakses dengan lancar di browser desktop maupun mobile (Chrome, Edge, Firefox, Safari).
- **Performance:** Pemrosesan logika berjalan secara _client-side_ (JavaScript) untuk respons yang instan.

---

## 7. Edge Cases & Safety Handling

- **Input Kosong / Invalid:** Tampilkan instruksi peringatan (_validation error_) jika pengguna tidak mengisi ID Buku atau memasukkan durasi hari <= 0.
- **ID Buku Tidak Ditemukan:** Berikan pesan _"ID Buku tidak valid"_ jika data tarif tidak tersedia di database/master data.

```

```
