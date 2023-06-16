const router = require('express').Router();
const multer = require('multer');
const os = require('os');
const controlerCustomer = require('./controlerCustomer.js');

// POST - Menambahkan new Customer  baru
router.post('/customers', multer({ dest: os.tmpdir() }).single('ktp'), controlerCustomer.createCustomer);
router.post('/customers/login', controlerCustomer.loginCustomer);
router.get('/customers', controlerCustomer.me);
router.put('/customers/:customerId/update-diskon', controlerCustomer.updateDiskonCustomer);

// PUT - Mengupdate item berdasarkan ID
// router.put('/items/:id', multer({ dest: os.tmpdir() }).single('barang'), controlerItem.updateItem);

// DELETE - Menghapus item berdasarkan ID
// router.delete('/items/:id', controlerItem.deleteItem);

module.exports = router;
