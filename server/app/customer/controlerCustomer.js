const Customer = require('./modelCustomer.js');
const path = require('path');
const fs = require('fs');

exports.createCustomer = async (req, res, next) => {
  try {
    const payload = req.body;

    if (req.file) {
      let temp_path = req.file.path;
      let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
      let filename = req.file.filename + '.' + originalExt;
      let target_path = path.resolve(`public/imagesCustomer/${filename}`);
      // membaca file di temp os nya
      const src = fs.createReadStream(temp_path);
      // setelah baca lalu pindahkan ke faile images
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);
      src.on('end', async () => {
        try {
          let customers = new Customer({ ...payload, ktp: `http://localhost:3000/images-customer/${filename}` });
          await customers.save();
          return res.json(customers);
        } catch (error) {
          fs.unlinkSync(target_path);
          if (error && error.name === 'validationError') {
            return res.json({
              error: 1,
              message: error.message,
              fileds: error.errors,
            });
          }
          next(error);
        }
      });
      src.on('error', () => {
        next(error);
      });
    } else {
      let customers = new Customer(payload);
      await customers.save();
      return res.json({
        status: 'success created! ',
        customers,
      });
    }
  } catch (error) {
    if (error && error.name === 'validationError') {
      return res.json({
        error: 1,
        message: error.message,
        fileds: error.errors,
      });
    }
    next(error);
  }
};

exports.updateDiskonCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const { diskon } = req.body;

    // Temukan customer berdasarkan ID
    const customer = await Customer.findByIdAndUpdate(customerId, { diskon: diskon }, { new: true });

    if (!customer) {
      return res.status(404).json({ error: 'Customer tidak ditemukan.' });
    }

    return res.json({ message: 'Diskon customer berhasil diperbarui.', customer });
  } catch (error) {
    return res.status(500).json({ error: 'Terjadi kesalahan dalam memperbarui diskon customer.' });
  }
};

exports.loginCustomer = async (req, res, next) => {
  try {
    const { email } = req.body;
    const customer = await Customer.findOne({ email });

    if (email !== customer.email) {
      return res.status(404).json({ message: 'Email salah !' });
    } else {
      // Login berhasil
      customer.sttlog = true;
      customer.save();
      return res.status(200).json({ message: 'Login berhasil.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat melakukan login.' });
  }
};

exports.me = async (req, res) => {
  try {
    const customer = await Customer.find();
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat login.' });
  }
};
