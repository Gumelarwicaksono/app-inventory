const Sales = require('./modelSales');
const Customer = require('../customer/modelCustomer');
const Item = require('../item/modelItem');

exports.pembelian = async (req, res) => {
  try {
    const { customerId, items } = req.body;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      throw new Error('Pelanggan tidak ditemukan.');
    }

    const sales = new Sales({
      customer: customerId,
      item: [],
      code_transaksi: generateCodeTransaksi(),
      tanggal_transaksi: new Date(),
      total_harga: 0,
    });

    let totalHarga = 0;

    for (const itemData of items) {
      const { itemId, qty } = itemData;
      const item = await Item.findById(itemId);

      if (!item) {
        throw new Error('Barang tidak ditemukan.');
      }

      if (qty > item.stok) {
        throw new Error('Jumlah pembelian melebihi stok yang tersedia.');
      }

      item.stok -= qty;
      sales.item.push({
        itemId: itemId,
        qty: qty,
      });

      totalHarga += qty * item.harga_satuan;

      await item.save();
    }

    // Menghitung diskon berdasarkan modul Customer
    if (customer.diskon > 0 && customer.diskon <= 100) {
      const diskon = customer.diskon / 100;
      totalHarga *= 1 - diskon;
    }

    sales.total_harga = Math.ceil(totalHarga);

    await customer.save();
    await sales.save();

    const customerName = customer.nama;
    const diskon = customer.diskon;
    const purchasedItems = [];

    for (const item of sales.item) {
      const itemData = await Item.findById(item.itemId);
      const itemDetails = {
        nama_item: itemData.nama_item,
        harga_satuan: itemData.harga_satuan,
        jumlah: item.qty,
      };
      purchasedItems.push(itemDetails);
    }

    res.status(200).json({
      message: 'Pembelian berhasil.',
      customer: customerName,
      items: purchasedItems,
      diskon: `${diskon} %`,
      total_harga: sales.total_harga,
    });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan dalam melakukan pembelian.' });
  }
};

// Fungsi untuk menghasilkan kode transaksi unik
function generateCodeTransaksi() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomString = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `TRX-${timestamp}-${randomString}`;
}

exports.getDetailPembelian = async (req, res) => {
  try {
    const { pembelianId } = req.params;
    const pembelian = await Sales.findById(pembelianId).populate('customer').populate({ path: 'item.itemId', model: 'Item' });

    if (!pembelian) {
      return res.status(404).json({ error: 'Pembelian tidak ditemukan.' });
    }

    res.status(200).json({ pembelian });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil detail pembelian.' });
  }
};

exports.getAllPembelian = async (req, res) => {
  try {
    const pembelian = await Sales.find().populate('customer').populate({ path: 'item.itemId', model: 'Item' });

    res.status(200).json({ pembelian });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data pembelian.' });
  }
};
