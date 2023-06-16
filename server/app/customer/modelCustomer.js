// customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  diskon: {
    type: Number,
    required: true,
  },
  tipe_diskon: {
    type: String,
    enum: ['persentase', 'fix'],
    required: true,
  },
  ktp: {
    type: String,
    required: true,
  },
  sttlog: Boolean,
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
