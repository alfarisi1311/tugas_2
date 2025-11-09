// Data untuk aplikasi stok
const dataBahanAjar = {
    upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
    kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
    stok: [
        {
            kode: "EKMA4116",
            judul: "Pengantar Manajemen",
            kategori: "MK Wajib",
            upbjj: "Jakarta",
            lokasiRak: "R1-A3",
            harga: 65000,
            qty: 28,
            safety: 20,
            catatanHTML: "<em>Edisi 2024, cetak ulang</em>"
        },
        {
            kode: "EKMA4115",
            judul: "Pengantar Akuntansi",
            kategori: "MK Wajib",
            upbjj: "Jakarta",
            lokasiRak: "R1-A4",
            harga: 60000,
            qty: 7,
            safety: 15,
            catatanHTML: "<strong>Cover baru</strong>"
        },
        {
            kode: "BIOL4201",
            judul: "Biologi Umum (Praktikum)",
            kategori: "Praktikum",
            upbjj: "Surabaya",
            lokasiRak: "R3-B2",
            harga: 80000,
            qty: 12,
            safety: 10,
            catatanHTML: "Butuh <u>pendingin</u> untuk kit basah"
        },
        {
            kode: "FISIP4001",
            judul: "Dasar-Dasar Sosiologi",
            kategori: "MK Pilihan",
            upbjj: "Makassar",
            lokasiRak: "R2-C1",
            harga: 55000,
            qty: 2,
            safety: 8,
            catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder"
        }
    ]
};

// Inisialisasi Vue App untuk Stok
new Vue({
    el: '#stok-app',
    data: {
        upbjjList: dataBahanAjar.upbjjList,
        kategoriList: dataBahanAjar.kategoriList,
        stok: JSON.parse(JSON.stringify(dataBahanAjar.stok)), // Deep copy
        filter: {
            upbjj: '',
            kategori: '',
            status: ''
        },
        sortBy: 'judul',
        showAddForm: false,
        editingItem: null,
        form: {
            kode: '',
            judul: '',
            kategori: '',
            upbjj: '',
            lokasiRak: '',
            harga: 0,
            qty: 0,
            safety: 0,
            catatanHTML: ''
        },
        formMessage: null,
        currentPageStok: 1,
        itemsPerPage: 5
    },
    computed: {
        // Filter dan sortir data stok
        filteredStok() {
            let result = this.stok;
            
            // Filter berdasarkan UT Daerah
            if (this.filter.upbjj) {
                result = result.filter(item => item.upbjj === this.filter.upbjj);
            }
            
            // Filter berdasarkan kategori
            if (this.filter.kategori) {
                result = result.filter(item => item.kategori === this.filter.kategori);
            }
            
            // Filter berdasarkan status stok
            if (this.filter.status) {
                if (this.filter.status === 'aman') {
                    result = result.filter(item => item.qty >= item.safety);
                } else if (this.filter.status === 'menipis') {
                    result = result.filter(item => item.qty < item.safety && item.qty > 0);
                } else if (this.filter.status === 'kosong') {
                    result = result.filter(item => item.qty === 0);
                }
            }
            
            // Sortir data
            if (this.sortBy === 'judul') {
                result.sort((a, b) => a.judul.localeCompare(b.judul));
            } else if (this.sortBy === 'qty') {
                result.sort((a, b) => a.qty - b.qty);
            } else if (this.sortBy === 'harga') {
                result.sort((a, b) => a.harga - b.harga);
            }
            
            return result;
        },
        
        // Pagination untuk stok
        paginatedStok() {
            const startIndex = (this.currentPageStok - 1) * this.itemsPerPage;
            return this.filteredStok.slice(startIndex, startIndex + this.itemsPerPage);
        },
        
        totalPages() {
            return Math.ceil(this.filteredStok.length / this.itemsPerPage);
        }
    },
    watch: {
        // Watch untuk reset pagination saat filter berubah
        filteredStok: {
            handler() {
                this.currentPageStok = 1;
            }
        }
    },
    methods: {
        // Format angka untuk harga
        formatNumber(num) {
            return new Intl.NumberFormat('id-ID').format(num);
        },
        
        // Reset semua filter
        resetFilters() {
            this.filter = {
                upbjj: '',
                kategori: '',
                status: ''
            };
            this.sortBy = 'judul';
        },
        
        // Edit item stok
        editItem(item) {
            this.editingItem = item;
            this.form = { ...item };
            this.showAddForm = true;
        },
        
        // Simpan item stok (tambah atau edit)
        saveItem() {
            // Validasi form
            if (!this.form.kode || !this.form.judul || !this.form.kategori || 
                !this.form.upbjj || !this.form.lokasiRak || 
                this.form.harga <= 0 || this.form.qty < 0 || this.form.safety < 0) {
                this.formMessage = {
                    type: 'danger',
                    text: 'Harap isi semua field yang wajib diisi dengan benar'
                };
                return;
            }
            
            if (this.editingItem) {
                // Update item yang sudah ada
                const index = this.stok.findIndex(item => item.kode === this.editingItem.kode);
                if (index !== -1) {
                    this.stok.splice(index, 1, { ...this.form });
                    this.formMessage = {
                        type: 'success',
                        text: 'Data bahan ajar berhasil diperbarui'
                    };
                }
            } else {
                // Tambah item baru
                // Cek apakah kode sudah ada
                if (this.stok.some(item => item.kode === this.form.kode)) {
                    this.formMessage = {
                        type: 'danger',
                        text: 'Kode bahan ajar sudah ada, gunakan kode yang berbeda'
                    };
                    return;
                }
                
                this.stok.push({ ...this.form });
                this.formMessage = {
                    type: 'success',
                    text: 'Data bahan ajar berhasil ditambahkan'
                };
            }
            
            // Reset form setelah 2 detik
            setTimeout(() => {
                this.cancelForm();
            }, 2000);
        },
        
        // Batal form
        cancelForm() {
            this.showAddForm = false;
            this.editingItem = null;
            this.form = {
                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                lokasiRak: '',
                harga: 0,
                qty: 0,
                safety: 0,
                catatanHTML: ''
            };
            this.formMessage = null;
        }
    },
    mounted() {
        // Inisialisasi data dari localStorage jika ada
        if (localStorage.getItem('stokData')) {
            this.stok = JSON.parse(localStorage.getItem('stokData'));
        }
        
        // Simpan data ke localStorage saat berubah
        this.$watch('stok', (newVal) => {
            localStorage.setItem('stokData', JSON.stringify(newVal));
        }, { deep: true });
    }
});