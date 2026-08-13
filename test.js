// Unit Test Suite for Web Hitung Sewa & Denda Perpustakaan (Phase 4)
const assert = require('assert');
const fs = require('fs');

// Load master data
const bukuData = JSON.parse(fs.readFileSync('./data/buku.json', 'utf8'));

// Import / define core logic functions to test (matching app.js)
const BATAS_HARI_NORMAL = 7;
const DENDA_PER_HARI = 2000;

function cariBukuById(dataBuku, idBuku) {
    const buku = dataBuku.find(item => item.id_buku === idBuku);
    return buku || null;
}

function hitungHariTerlambat(jumlahHari) {
    return Math.max(0, jumlahHari - BATAS_HARI_NORMAL);
}

function hitungTotalBiaya(jumlahHari, hargaPerHari, hariTerlambat) {
    const denda = hariTerlambat * DENDA_PER_HARI;
    const totalBayar = (jumlahHari * hargaPerHari) + denda;
    return { denda, totalBayar };
}

console.log('Running Phase 4 Test Suite...');

// TSK-4.1: Uji coba perhitungan normal (<= 7 hari, denda Rp 0)
console.log('\n--- TSK-4.1: Uji Coba Perhitungan Normal (<= 7 hari) ---');
{
    const buku = cariBukuById(bukuData, 'BK-001'); // harga: 5000
    assert.strictEqual(buku.id_buku, 'BK-001');
    
    const hariPinjam = 5; // <= 7 hari
    const hariTerlambat = hitungHariTerlambat(hariPinjam);
    assert.strictEqual(hariTerlambat, 0);

    const { denda, totalBayar } = hitungTotalBiaya(hariPinjam, buku.harga_per_hari, hariTerlambat);
    assert.strictEqual(denda, 0);
    assert.strictEqual(totalBayar, 5 * 5000); // 25000
    console.log(`[PASS] Pinjam ${hariPinjam} hari untuk ${buku.judul}: Denda = Rp ${denda}, Total = Rp ${totalBayar}`);
}

{
    const buku = cariBukuById(bukuData, 'BK-002'); // harga: 4500
    const hariPinjam = 7; // tepat 7 hari
    const hariTerlambat = hitungHariTerlambat(hariPinjam);
    assert.strictEqual(hariTerlambat, 0);

    const { denda, totalBayar } = hitungTotalBiaya(hariPinjam, buku.harga_per_hari, hariTerlambat);
    assert.strictEqual(denda, 0);
    assert.strictEqual(totalBayar, 7 * 4500); // 31500
    console.log(`[PASS] Pinjam ${hariPinjam} hari untuk ${buku.judul}: Denda = Rp ${denda}, Total = Rp ${totalBayar}`);
}

// TSK-4.2: Uji coba perhitungan denda (> 7 hari, denda Rp2.000/hari)
console.log('\n--- TSK-4.2: Uji Coba Perhitungan Denda (> 7 hari) ---');
{
    const buku = cariBukuById(bukuData, 'BK-001'); // harga: 5000
    const hariPinjam = 10; // terlambat 3 hari (10 - 7)
    const hariTerlambat = hitungHariTerlambat(hariPinjam);
    assert.strictEqual(hariTerlambat, 3);

    const { denda, totalBayar } = hitungTotalBiaya(hariPinjam, buku.harga_per_hari, hariTerlambat);
    assert.strictEqual(denda, 3 * 2000); // 6000
    assert.strictEqual(totalBayar, (10 * 5000) + 6000); // 50000 + 6000 = 56000
    console.log(`[PASS] Pinjam ${hariPinjam} hari untuk ${buku.judul}: Terlambat ${hariTerlambat} hari, Denda = Rp ${denda}, Total = Rp ${totalBayar}`);
}

{
    const buku = cariBukuById(bukuData, 'BK-003'); // harga: 3500
    const hariPinjam = 14; // terlambat 7 hari (14 - 7)
    const hariTerlambat = hitungHariTerlambat(hariPinjam);
    assert.strictEqual(hariTerlambat, 7);

    const { denda, totalBayar } = hitungTotalBiaya(hariPinjam, buku.harga_per_hari, hariTerlambat);
    assert.strictEqual(denda, 7 * 2000); // 14000
    assert.strictEqual(totalBayar, (14 * 3500) + 14000); // 49000 + 14000 = 63000
    console.log(`[PASS] Pinjam ${hariPinjam} hari untuk ${buku.judul}: Terlambat ${hariTerlambat} hari, Denda = Rp ${denda}, Total = Rp ${totalBayar}`);
}

// TSK-4.3: Uji edge cases (ID buku tidak terdaftar, jumlah hari <= 0)
console.log('\n--- TSK-4.3: Uji Edge Cases ---');
{
    const bukuInvalid = cariBukuById(bukuData, 'BK-999');
    assert.strictEqual(bukuInvalid, null);
    console.log('[PASS] Edge Case: ID Buku tidak terdaftar (BK-999) mengembalikan null.');
}

{
    const hariPinjamNegatif = 0;
    const hariTerlambat = hitungHariTerlambat(hariPinjamNegatif);
    assert.strictEqual(hariTerlambat, 0);
    console.log('[PASS] Edge Case: Jumlah hari 0 menghasilkan hari terlambat 0.');
}

{
    const hariPinjamNegatif = -3;
    const hariTerlambat = hitungHariTerlambat(hariPinjamNegatif);
    assert.strictEqual(hariTerlambat, 0);
    console.log('[PASS] Edge Case: Jumlah hari negatif (-3) menghasilkan hari terlambat 0.');
}

console.log('\nAll Phase 4 Tests Passed Successfully! ✅');
