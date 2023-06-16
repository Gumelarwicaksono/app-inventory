const customers = [
  {
    nama: 'wicak',
    contact: '08123456789',
    email: 'wicak@example.com',
    alamat: 'Jl. landak Alamat No. 123',
    diskon: 10,
    tipe_diskon: 'persentase',
    ktp: '/images/c1.jpg',
    sttlog: true,
  },
  {
    nama: 'sono',
    contact: '08987654321',
    email: 'sono@example.com',
    alamat: 'Jl. Alamat duren No. 456',
    diskon: 0,
    tipe_diskon: 'fix',
    ktp: '/images/c2.jpg',
    sttlog: false,
  },
];

const items = [
  {
    nama_item: 'kopi',
    unit: 'kg',
    stok: 10,
    harga_satuan: 10000,
    barang: '/images/b1.jpg',
  },
  {
    nama_item: 'apel',
    unit: 'pcs',
    stok: 5,
    harga_satuan: 5000,
    barang: '/images/b2.jpg',
  },
];

module.exports = {
  customers,
  items,
};
