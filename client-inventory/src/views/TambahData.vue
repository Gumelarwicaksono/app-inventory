<template>
  <div class="tambah-data">
    <div style="position: relative; left: 25%">
      <div style="width: 50%; text-align: left">
        <h2>Tambah Item</h2>
        <table>
          <tr>
            <td>Nama Item:</td>
            <td><input type="text" v-model="namaItem" required /></td>
          </tr>
          <tr>
            <td>Unit:</td>
            <td>
              <select v-model="unit" required>
                <option value="kg">Kg</option>
                <option value="pcs">Pcs</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Stok:</td>
            <td><input type="number" v-model="stok" required /></td>
          </tr>
          <tr>
            <td>Harga Satuan:</td>
            <td><input type="number" v-model="hargaSatuan" required /></td>
          </tr>
          <tr>
            <td>Gambar Barang:</td>
            <td><input type="file" @change="onFileChange" required /></td>
          </tr>
          <tr>
            <td colspan="2"><button @click="tambahItem">Tambah</button></td>
          </tr>
        </table>
      </div>
      <div style="width: 50%; text-align: left">
        <TambahCustomer />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TambahCustomer from '@/components/TambahCustomer.vue';

export default {
  name: 'tambah-customer',
  comments: {
    TambahCustomer,
  },
  data() {
    return {
      namaItem: '',
      unit: 'kg',
      stok: 0,
      hargaSatuan: 0,
      barang: null,
    };
  },
  methods: {
    tambahItem() {
      const formData = new FormData();
      formData.append('nama_item', this.namaItem);
      formData.append('unit', this.unit);
      formData.append('stok', this.stok);
      formData.append('harga_satuan', this.hargaSatuan);
      formData.append('barang', this.barang);
      axios
        .post('http://localhost:3000/api/items', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response) {
            alert('Item berhasil ditambahkan.');
            this.resetForm();
            this.$router.push('/');
          }
        })
        .catch((error) => {
          console.error('Terjadi kesalahan dalam menambahkan item:', error);
        });
    },
    onFileChange(event) {
      this.barang = event.target.files[0];
    },
    resetForm() {
      this.namaItem = '';
      this.unit = 'kg';
      this.stok = 0;
      this.hargaSatuan = 0;
      this.barang = null;
    },
  },
  components: { TambahCustomer },
};
</script>
