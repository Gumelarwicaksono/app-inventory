// item.js (file schema model)

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  nama_item: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    enum: ['kg', 'pcs'],
    required: true,
  },
  stok: {
    type: Number,
    required: true,
  },
  harga_satuan: {
    type: Number,
    required: true,
  },
  barang: {
    type: String, // Menyimpan path file gambar
    required: true,
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
