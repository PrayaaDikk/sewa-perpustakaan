/* ==========================================
   Web Hitung Sewa & Denda Perpustakaan
   Application Script (app.js)
   Prinsip: Single Responsibility (1 Tugas, 1 Fungsi)
   ========================================== */

const BATAS_HARI_NORMAL = 7;
const DENDA_PER_HARI = 2000;

/**
 * TSK-3.1: Membaca input dari form HTML
 * @returns {Object} { idBuku, jumlahHari }
 */
function bacaInputForm() {
    const idBuku = document.getElementById('id-buku').value.trim();
    const jumlahHariInput = document.getElementById('jumlah-hari').value.trim();
    const jumlahHari = jumlahHariInput === '' ? NaN : parseInt(jumlahHariInput, 10);

    return { idBuku, jumlahHari };
}

/**
 * TSK-3.2: Mengambil data master buku dari data/buku.json dengan try...catch
 * @returns {Promise<Array>} Array objek buku atau array kosong jika gagal
 */
async function ambilDataBuku() {
    try {
        const response = await fetch('data/buku.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dataBuku = await response.json();
        return dataBuku;
    } catch (error) {
        console.error('Gagal mengambil data buku:', error);
        tampilkanErrorUmum('Gagal memuat database buku. Silakan muat ulang halaman.');
        return [];
    }
}

/**
 * TSK-3.3: Mencari data buku berdasarkan ID dari array data buku
 * @param {Array} dataBuku 
 * @param {String} idBuku 
 * @returns {Object|null} Objek buku atau null jika tidak ditemukan
 */
function cariBukuById(dataBuku, idBuku) {
    const buku = dataBuku.find(item => item.id_buku === idBuku);
    return buku || null;
}

/**
 * TSK-3.4: Menghitung hari keterlambatan pengembalian (Batas normal 7 hari)
 * @param {Number} jumlahHari 
 * @returns {Number} Jumlah hari keterlambatan (>= 0)
 */
function hitungHariTerlambat(jumlahHari) {
    return Math.max(0, jumlahHari - BATAS_HARI_NORMAL);
}

/**
 * TSK-3.5: Menghitung total biaya sewa dan denda
 * Rumus: (jumlah_hari * harga_per_hari) + denda
 * @param {Number} jumlahHari 
 * @param {Number} hargaPerHari 
 * @param {Number} hariTerlambat 
 * @returns {Object} { denda, totalBayar }
 */
function hitungTotalBiaya(jumlahHari, hargaPerHari, hariTerlambat) {
    const denda = hariTerlambat * DENDA_PER_HARI;
    const totalBayar = (jumlahHari * hargaPerHari) + denda;
    return { denda, totalBayar };
}

/**
 * TSK-3.6: Menampilkan pesan error validasi pada form
 * @param {String} elementId 
 * @param {String} pesan 
 */
function tampilkanFieldError(elementId, pesan) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = pesan;
        errorElement.closest('.form-group')?.classList.add('has-error');
    }
}

/**
 * Menampilkan pesan error umum
 * @param {String} pesan 
 */
function tampilkanErrorUmum(pesan) {
    const generalError = document.getElementById('general-error');
    if (generalError) {
        generalError.textContent = pesan;
        generalError.classList.remove('hidden');
    }
}

/**
 * Membersihkan semua pesan error dan status error form
 */
function bersihkanError() {
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-group').forEach(el => el.classList.remove('has-error'));
    const generalError = document.getElementById('general-error');
    if (generalError) {
        generalError.textContent = '';
        generalError.classList.add('hidden');
    }
}

/**
 * Format angka ke mata uang Rupiah
 * @param {Number} angka 
 * @returns {String}
 */
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(angka);
}

/**
 * TSK-3.7: Manipulasi DOM untuk menampilkan hasil kalkulasi ke ringkasan (Summary Card)
 * @param {Object} hasil 
 */
function renderHasilKeDOM(hasil) {
    const emptyState = document.getElementById('empty-state');
    const summaryCard = document.getElementById('summary-card');

    // Update elemen DOM pada summary card
    document.getElementById('res-id-buku').textContent = hasil.idBuku;
    document.getElementById('res-judul').textContent = hasil.judul;
    document.getElementById('res-harga').textContent = formatRupiah(hasil.hargaPerHari);
    document.getElementById('res-durasi').textContent = `${hasil.jumlahHari} Hari`;
    document.getElementById('res-terlambat').textContent = `${hasil.hariTerlambat} Hari`;
    document.getElementById('res-denda').textContent = formatRupiah(hasil.denda);
    document.getElementById('res-total').textContent = formatRupiah(hasil.totalBayar);

    // Update badge status
    const badgeStatus = document.getElementById('badge-status');
    if (hasil.hariTerlambat > 0) {
        badgeStatus.textContent = 'Terlambat';
        badgeStatus.classList.add('late');
    } else {
        badgeStatus.textContent = 'Normal';
        badgeStatus.classList.remove('late');
    }

    // Tampilkan card, sembunyikan empty state
    emptyState.classList.add('hidden');
    summaryCard.classList.remove('hidden');
}

/**
 * Mengatur ulang tampilan ke state awal (reset)
 */
function resetTampilan() {
    bersihkanError();
    document.getElementById('summary-card').classList.add('hidden');
    document.getElementById('empty-state').classList.remove('hidden');
    document.getElementById('form-hitung').reset();
}

/**
 * TSK-3.8: Event Listener untuk Submit Form & Tombol Reset
 */
document.addEventListener('DOMContentLoaded', () => {
    const formHitung = document.getElementById('form-hitung');
    const btnReset = document.getElementById('btn-reset');

    formHitung.addEventListener('submit', async (event) => {
        event.preventDefault();
        bersihkanError();

        // 1. Baca Input
        const { idBuku, jumlahHari } = bacaInputForm();

        // 2. Validasi Input
        let isValid = true;
        if (!idBuku) {
            tampilkanFieldError('error-id-buku', 'Silakan pilih ID Buku terlebih dahulu.');
            isValid = false;
        }
        if (isNaN(jumlahHari) || jumlahHari <= 0) {
            tampilkanFieldError('error-jumlah-hari', 'Jumlah hari pinjam harus berupa angka lebih dari 0.');
            isValid = false;
        }

        if (!isValid) return;

        // 3. Ambil Data Buku dari JSON
        const dataBuku = await ambilDataBuku();
        if (dataBuku.length === 0) return;

        // 4. Cari Buku Berdasarkan ID
        const buku = cariBukuById(dataBuku, idBuku);
        if (!buku) {
            tampilkanErrorUmum(`ID Buku "${idBuku}" tidak valid atau tidak ditemukan dalam database.`);
            return;
        }

        // 5. Kalkulasi Logika Bisnis
        const hariTerlambat = hitungHariTerlambat(jumlahHari);
        const { denda, totalBayar } = hitungTotalBiaya(jumlahHari, buku.harga_per_hari, hariTerlambat);

        // 6. Siapkan Objek Hasil & Render ke DOM
        const hasil = {
            idBuku: buku.id_buku,
            judul: buku.judul,
            hargaPerHari: buku.harga_per_hari,
            jumlahHari,
            hariTerlambat,
            denda,
            totalBayar
        };

        renderHasilKeDOM(hasil);
    });

    btnReset.addEventListener('click', (event) => {
        event.preventDefault();
        resetTampilan();
    });
});
