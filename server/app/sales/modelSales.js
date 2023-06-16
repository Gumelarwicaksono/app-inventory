const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  item: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
    },
  ],
  code_transaksi: {
    type: String,
    required: true,
  },
  tanggal_transaksi: {
    type: Date,
    required: true,
  },
  total_harga: {
    type: Number,
    required: true,
  },
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
