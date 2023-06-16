<template>
  <div class="pembelian">
    <h1>Daftar Pembelian</h1>

    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Pelanggan</th>
          <th>Item</th>
          <th>Qty</th>
          <th>Kode Transaksi</th>
          <th>Tanggal Transaksi</th>
          <th>Harga satuan</th>
          <th>Diskon</th>
          <th>Total Harga</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pembelian, index) in pembelianList" :key="pembelian._id">
          <td>{{ index + 1 }}</td>
          <td>{{ pembelian.customer ? pembelian.customer.nama : '' }}</td>
          <td>
            <div>
              <div v-for="item in pembelian.item" :key="item.itemId._id">
                {{ item.itemId.nama_item }}
              </div>
            </div>
          </td>
          <td>
            <div>
              <div v-for="item in pembelian.item" :key="item.itemId._id">
                {{ item.qty }}
              </div>
            </div>
          </td>
          <td>{{ pembelian.code_transaksi }}</td>
          <td>{{ pembelian.tanggal_transaksi }}</td>
          <td>
            <div>
              <div v-for="item in pembelian.item" :key="item.itemId._id">
                {{ item.itemId.harga_satuan }}
              </div>
            </div>
          </td>
          <td>{{ pembelian.customer ? pembelian.customer.diskon : '' }}%</td>
          <td>{{ pembelian.total_harga }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      pembelianList: [], // Daftar pembelian
    };
  },
  mounted() {
    // Panggil fungsi untuk mengambil daftar pembelian dari API
    this.fetchPembelianList();
  },
  methods: {
    fetchPembelianList() {
      // Panggil API untuk mengambil daftar pembelian
      axios
        .get('http://localhost:3000/api/pembelian')
        .then((response) => {
          // Isi daftar pembelian dari respons API

          this.pembelianList = response.data.pembelian;
        })
        .catch((error) => {
          console.error('Terjadi kesalahan dalam mengambil daftar pembelian:', error);
        });
    },
  },
};
</script>

<style scoped>
/* Gaya CSS khusus untuk komponen Pembelian */
</style>
