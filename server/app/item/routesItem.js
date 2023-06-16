const router = require('express').Router();
const multer = require('multer');
const os = require('os');
const controlerItem = require('../item/controlerItem.js');
// const { upload } = require('../../middlewares/middlewares.js');

// GET - Menampilkan semua item
router.get('/items', controlerItem.getAllItems);

// POST - Menambahkan item baru
router.post('/items', multer({ dest: os.tmpdir() }).single('barang'), controlerItem.createItem);

// PUT - Mengupdate item berdasarkan ID
// router.put('/items/:id', multer({ dest: os.tmpdir() }).single('barang'), controlerItem.updateItem);

// DELETE - Menghapus item berdasarkan ID
router.delete('/items/:id', controlerItem.deleteItem);

module.exports = router;
