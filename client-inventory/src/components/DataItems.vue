<template>
  <div class="data-items">
    <h3 style="color: red">Silahkan pilih customer sebelum membeli !</h3>
    <select v-model="selectedCustomer" style="font-size: large">
      <option :value="null" disabled selected hidden>Pilih Customer</option>
      <option v-for="customer in customers" :key="customer._id" :value="customer._id">{{ customer.nama }}</option>
    </select>

    <h2>Daftar Item</h2>
    <table>
      <thead>
        <tr>
          <th>Nama Item</th>
          <th>Harga</th>
          <th>Stok</th>
          <th>barang</th>
          <th>Qty</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item._id">
          <td>{{ item.nama_item }}</td>
          <td>{{ item.harga_satuan }}</td>
          <td>{{ item.stok }}</td>
          <td>
            <img :src="item.barang" width="50" alt="Gambar Pelanggan" />
          </td>
          <td>
            <input type="number" v-model="item.qty" min="0" step="1" />
          </td>
          <td>
            <button @click="beliItem">Beli</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showResult">
      <h2>Hasil Pembelian</h2>
      <p v-if="purchaseSuccess" style="color: greenyellow">Pembelian berhasil.</p>
      <p v-if="purchaseError" style="color: brown">Terjadi kesalahan dalam melakukan pembelian.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      customers: [],
      items: [],
      selectedCustomer: null,
      showResult: false,
      purchaseSuccess: false,
      purchaseError: false,
    };
  },
  mounted() {
    this.fetchCustomers();
    this.fetchItems();
  },
  methods: {
    fetchCustomers() {
      axios
        .get('http://localhost:3000/api/customers')
        .then((response) => {
          this.customers = response.data;
        })
        .catch((error) => {
          console.error('Terjadi kesalahan dalam mengambil data pelanggan:', error);
        });
    },
    fetchItems() {
      axios
        .get('http://localhost:3000/api/items')
        .then((response) => {
          this.items = response.data.map((item) => ({
            ...item,
            qty: 0,
          }));
        })
        .catch((error) => {
          console.error('Terjadi kesalahan dalam mengambil data item:', error);
        });
    },
    beliItem() {
      const customerId = this.selectedCustomer;
      const selectedItems = this.items.filter((item) => item.qty > 0);

      if (selectedItems.length === 0) {
        alert('Pilih setidaknya satu item untuk dibeli.');
        return;
      }

      const data = {
        customerId: customerId,
        items: selectedItems.map((item) => ({
          itemId: item._id,
          qty: item.qty,
        })),
      };

      axios
        .post('http://localhost:3000/api/pembelian', data)
        .then((response) => {
          if (response) {
            this.purchaseSuccess = true;
            alert('pembelian berhasil ');
            this.$router.push('/pembelian');
          }
        })
        .catch((error) => {
          console.error('Terjadi kesalahan dalam melakukan pembelian:', error);
          this.purchaseError = true;
        })
        .finally(() => {
          this.showResult = true;
        });
    },
  },
};
</script>
