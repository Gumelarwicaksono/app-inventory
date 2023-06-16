const fs = require('fs');
const path = require('path');
const Item = require('../item/modelItem.js');

// Menampilkan semua item
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data item.' });
  }
};

// Menambahkan item baru
exports.createItem = async (req, res, next) => {
  try {
    const payload = req.body;

    if (req.file) {
      let temp_path = req.file.path;
      let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
      let filename = req.file.filename + '.' + originalExt;
      let target_path = path.resolve(`public/images/${filename}`);
      // membaca file di temp os nya
      const src = fs.createReadStream(temp_path);
      // setelah baca lalu pindahkan ke faile images
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);
      src.on('end', async () => {
        try {
          let item = new Item({ ...payload, barang: `http://localhost:3000/images/${filename}` });
          await item.save();
          return res.json(item);
        } catch (error) {
          fs.unlinkSync(target_path);
          if (error && error.name === 'ValidationError') {
            return res.json({
              error: 1,
              message: error.message,
              fields: error.errors,
            });
          }
          next(error);
        }
      });
      src.on('error', (error) => {
        next(error);
      });
    } else {
      let item = new Item(payload);
      await item.save();
      return res.json({
        status: 'success created! ',
        item,
      });
    }
  } catch (error) {
    if (error && error.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }
    next(error);
  }
};

// Mengupdate item berdasarkan ID

// Menghapus item berdasarkan ID
exports.deleteItem = async (req, res, next) => {
  try {
    let items = await Item.findByIdAndDelete(req.params.id);
    let curenImage = `/public/images/${items.barang}`;
    if (fs.existsSync(curenImage)) {
      fs.unlinkSync(curenImage);
    }
    return res.json({
      status: 'success deleted !',
    });
  } catch (error) {
    next(error);
  }
};
