// itemController.test.js (file unit test)

const request = require('supertest');
const app = require('../app.js');
const Item = require('../app/item/modelItem.js');

describe('Item Controller', () => {
  let itemId;

  beforeAll(async () => {
    // Hapus semua item sebelum menjalankan unit test
    await Item.deleteMany({});
  });

  afterAll(async () => {
    // Hapus semua item setelah menjalankan unit test
    await Item.deleteMany({});
  });

  // Test POST - Menambahkan item baru
  // describe('POST /items', () => {
  //   it('should create a new item', async () => {
  //     const response = await request(app).post('/api/items').field('nama_item', 'Barang Test').field('unit', 'pcs').field('stok', '10').field('harga_satuan', '1000').attach('barang', './test/test-image.jpg');

  //     expect(response.statusCode).toBe(201);
  //     expect(response.body).toHaveProperty('_id');
  //     expect(response.body).toHaveProperty('nama_item', 'Barang Test');
  //     expect(response.body).toHaveProperty('unit', 'pcs');
  //     expect(response.body).toHaveProperty('stok', 10);
  //     expect(response.body).toHaveProperty('harga_satuan', 1000);
  //     expect(response.body).toHaveProperty('barang');

  //     itemId = response.body._id;
  //   });
  // });

  // Test GET - Menampilkan semua item
  describe('GET /items', () => {
    it('should get all items', async () => {
      const response = await request(app).get('/api/items');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
    });
  });

  // Test PUT - Mengupdate item berdasarkan ID
  // describe('PUT /items/:id', () => {
  //   it('should update an item', async () => {
  //     const response = await request(app).put(`/api/items/${itemId}`).send({
  //       nama_item: 'Barang Test Update',
  //       unit: 'kg',
  //       stok: 5,
  //       harga_satuan: 2000,
  //     });

  //     expect(response.statusCode).toBe(200);
  //     expect(response.body).toHaveProperty('_id', itemId);
  //     expect(response.body).toHaveProperty('nama_item', 'Barang Test Update');
  //     expect(response.body).toHaveProperty('unit', 'kg');
  //     expect(response.body).toHaveProperty('stok', 5);
  //     expect(response.body).toHaveProperty('harga_satuan', 2000);
  //     expect(response.body).toHaveProperty('barang');
  //   });
  // });

  // Test DELETE - Menghapus item berdasarkan ID
  //   describe('DELETE /items/:id', () => {
  //     it('should delete an item', async () => {
  //       const response = await request(app).delete(`/api/items/${itemId}`);

  //       expect(response.statusCode).toBe(200);
  //       expect(response.body).toHaveProperty('message', 'Item berhasil dihapus.');
  //     });
  //   });
});
