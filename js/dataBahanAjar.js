// Dummy Data untuk Aplikasi Pemesanan Bahan Ajar UT

// Daftar UT-Daerah
const upbjjList = ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"];

// Daftar Kategori
const kategoriList = ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"];

// Daftar Pengiriman
const pengirimanList = [
    { kode: "REG", nama: "Reguler (3-5 hari)" },
    { kode: "EXP", nama: "Ekspres (1-2 hari)" }
];

// Data Paket Bahan Ajar
const paketList = [
    { 
        id: 1,
        kode: "PAKET-UT-001", 
        nama: "PAKET IPS Dasar", 
        items: ["EKMA4116 - Pengantar Manajemen", "EKMA4115 - Pengantar Akuntansi"], 
        harga: 120000 
    },
    { 
        id: 2,
        kode: "PAKET-UT-002", 
        nama: "PAKET IPA Dasar", 
        items: ["BIOL4201 - Biologi Umum (Praktikum)", "FISIP4001 - Dasar-Dasar Sosiologi"], 
        harga: 140000 
    }
];

// Data Stok Bahan Ajar
const bahanAjarData = [
    {
        id: 1,
        kode: "EKMA4116",
        nama: "Pengantar Manajemen",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasi: "R1-A3",
        harga: 65000,
        qty: 28,
        safety: 20,
        catatan: "<em>Edisi 2024, cetak ulang</em>"
    },
    {
        id: 2,
        kode: "EKMA4115",
        nama: "Pengantar Akuntansi",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasi: "R1-A4",
        harga: 60000,
        qty: 7,
        safety: 15,
        catatan: "<strong>Cover baru</strong>"
    },
    {
        id: 3,
        kode: "BIOL4201",
        nama: "Biologi Umum (Praktikum)",
        kategori: "Praktikum",
        upbjj: "Surabaya",
        lokasi: "R3-B2",
        harga: 80000,
        qty: 12,
        safety: 10,
        catatan: "Butuh <u>pendingin</u> untuk kit basah"
    },
    {
        id: 4,
        kode: "FISIP4001",
        nama: "Dasar-Dasar Sosiologi",
        kategori: "MK Pilihan",
        upbjj: "Makassar",
        lokasi: "R2-C1",
        harga: 55000,
        qty: 2,
        safety: 8,
        catatan: "Stok <i>menipis</i>, prioritaskan reorder"
    }
];

// Data Tracking DO (untuk referensi)
const trackingData = {
    "DO2025-0001": {
        nim: "123456789",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "PAKET-UT-001",
        total: 120000,
        perjalanan: [
            { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
            { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
            { waktu: "2025-08-26 08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" }
        ]
    }
};