// Data untuk aplikasi tracking
const dataTracking = {
    pengirimanList: [
        { kode: "REG", nama: "Reguler (3-5 hari)" },
        { kode: "EXP", nama: "Ekspres (1-2 hari)" }
    ],
    paket: [
        { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116","EKMA4115"], harga: 120000 },
        { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201","FISIP4001"], harga: 140000 }
    ]
};

// Inisialisasi Vue App untuk Tracking
new Vue({
    el: '#tracking-app',
    data: {
        pengirimanList: dataTracking.pengirimanList,
        paket: dataTracking.paket,
        showDOForm: false,
        doForm: {
            nomorDO: '',
            nim: '',
            nama: '',
            tanggalKirim: '',
            ekspedisi: '',
            paket: '',
            totalHarga: 0
        },
        doFormMessage: null,
        deliveryOrders: [],
        selectedDO: null,
        doCounter: 1
    },
    computed: {
        // Computed untuk form DO
        selectedPaket() {
            if (!this.doForm.paket) return null;
            return this.paket.find(p => p.kode === this.doForm.paket);
        }
    },
    watch: {
        // Watch untuk update nomor DO otomatis
        doCounter: {
            handler(newVal) {
                this.doForm.nomorDO = `DO2025-${newVal.toString().padStart(3, '0')}`;
            },
            immediate: true
        },
        
        // Watch untuk update total harga otomatis
        selectedPaket: {
            handler(newVal) {
                if (newVal) {
                    this.doForm.totalHarga = newVal.harga;
                } else {
                    this.doForm.totalHarga = 0;
                }
            },
            immediate: true
        }
    },
    methods: {
        // Format angka untuk harga
        formatNumber(num) {
            return new Intl.NumberFormat('id-ID').format(num);
        },
        
        // Format tanggal
        formatDate(dateString) {
            if (!dateString) return '';
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('id-ID', options);
        },
        
        // Simpan DO baru
        saveDO() {
            // Validasi form DO
            if (!this.doForm.nim || !this.doForm.nama || !this.doForm.tanggalKirim || 
                !this.doForm.ekspedisi || !this.doForm.paket) {
                this.doFormMessage = {
                    type: 'danger',
                    text: 'Harap isi semua field yang wajib diisi'
                };
                return;
            }
            
            // Buat DO baru
            const newDO = {
                nomorDO: this.doForm.nomorDO,
                nim: this.doForm.nim,
                nama: this.doForm.nama,
                tanggalKirim: this.doForm.tanggalKirim,
                ekspedisi: this.doForm.ekspedisi,
                paket: this.doForm.paket,
                total: this.doForm.totalHarga,
                status: 'Dipesan',
                perjalanan: [
                    { 
                        waktu: new Date().toLocaleString('id-ID'), 
                        keterangan: 'Pesanan diterima dan sedang diproses' 
                    }
                ]
            };
            
            this.deliveryOrders.push(newDO);
            this.doCounter++;
            
            this.doFormMessage = {
                type: 'success',
                text: 'DO berhasil dibuat dengan nomor: ' + this.doForm.nomorDO
            };
            
            // Reset form setelah 2 detik
            setTimeout(() => {
                this.cancelDOForm();
            }, 2000);
        },
        
        // Batal form DO
        cancelDOForm() {
            this.showDOForm = false;
            this.doForm = {
                nomorDO: '',
                nim: '',
                nama: '',
                tanggalKirim: '',
                ekspedisi: '',
                paket: '',
                totalHarga: 0
            };
            this.doFormMessage = null;
        },
        
        // Dapatkan nama paket berdasarkan kode
        getPaketName(kode) {
            const p = this.paket.find(item => item.kode === kode);
            return p ? p.nama : 'Tidak diketahui';
        },
        
        // Lihat detail tracking DO
        viewTracking(doItem) {
            this.selectedDO = doItem;
        }
    },
    mounted() {
        // Inisialisasi data dari localStorage jika ada
        if (localStorage.getItem('deliveryOrders')) {
            this.deliveryOrders = JSON.parse(localStorage.getItem('deliveryOrders'));
        }
        
        if (localStorage.getItem('doCounter')) {
            this.doCounter = parseInt(localStorage.getItem('doCounter'));
        }
        
        // Simpan data ke localStorage saat berubah
        this.$watch('deliveryOrders', (newVal) => {
            localStorage.setItem('deliveryOrders', JSON.stringify(newVal));
        }, { deep: true });
        
        this.$watch('doCounter', (newVal) => {
            localStorage.setItem('doCounter', newVal.toString());
        });
    }
});