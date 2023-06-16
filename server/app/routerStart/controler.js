const Customer = require('../customer/modelCustomer');
const Item = require('../item/modelItem');
const data = require('../../data');

const fillData = async (req, res) => {
  try {
    // Mengimpor data dari file data.js
    const customersData = data.customers;
    const itemsData = data.items;

    // Menghapus semua data yang ada pada koleksi Customer dan Item
    await Customer.deleteMany();
    await Item.deleteMany();

    // Menggunakan insertMany untuk menyimpan banyak dokumen sekaligus ke dalam koleksi Customer dan Item
    await Customer.insertMany(customersData);
    await Item.insertMany(itemsData);

    res.status(200).json({ message: 'Data berhasil diisi.' });
  } catch (error) {
    console.error('Terjadi kesalahan dalam mengisi data:', error);
    res.status(500).json({ error: 'Terjadi kesalahan dalam mengisi data.' });
  }
};

module.exports = {
  fillData,
};
