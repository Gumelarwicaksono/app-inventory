const router = require('express').Router();
const salesController = require('./controlerSales.js');

// router.post('/hitungTotalHarga', salesController.hitungTotalHarga);
router.post('/pembelian', salesController.pembelian);
router.get('/pembelian', salesController.getAllPembelian);
router.get('/pembelian/:pembelianId', salesController.getDetailPembelian);

module.exports = router;
