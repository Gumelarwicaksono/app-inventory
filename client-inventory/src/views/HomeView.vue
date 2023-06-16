<template>
  <div class="home" style="padding-bottom: 100px">
    <h1>Data Pelanggan</h1>
    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Contact</th>
          <th>Email</th>
          <th>Alamat</th>
          <th>Diskon</th>
          <th>KTP</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer._id">
          <td>{{ customer.nama }}</td>
          <td>{{ customer.contact }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.alamat }}</td>
          <td>{{ customer.diskon }}%</td>
          <td>
            <img :src="getCustomerImageUrl(customer.ktp)" width="50" alt="Gambar Pelanggan" />
          </td>
          <td>
            <form @submit.prevent="updateDiskon(customer._id, customer.diskon)">
              <input v-model="customer.diskon" type="number" min="0" max="100" required />
              <button type="submit">Update Diskon</button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
    <DataItems />
  </div>
</template>

<script>
import axios from 'axios';
import DataItems from '@/components/DataItems.vue';
export default {
  name: 'data-items',
  components: {
    DataItems,
  },
  data() {
    return {
      customers: [],
    };
  },
  mounted() {
    this.fetchCustomers();
  },
  methods: {
    fetchCustomers() {
      // Permintaan GET ke API untuk mendapatkan daftar pelanggan
      axios
        .get('http://localhost:3000/api/customers')
        .then((response) => {
          this.customers = response.data;
        })
        .catch((error) => {
          console.error('Terjadi kesalahan dalam mengambil data pelanggan:', error);
        });
    },
    updateDiskon(customerId, diskon) {
      // Permintaan PUT ke API untuk memperbarui diskon pelanggan
      axios
        .put(`http://localhost:3000/api/customers/${customerId}/update-diskon`, { diskon })
        .then((response) => {
          if (response) {
            alert('Diskon pelanggan berhasil diperbarui.');
          }
        })
        .catch((error) => {
          console.error('Terjadi kesalahan dalam memperbarui diskon pelanggan:', error);
        });
    },
    getCustomerImageUrl(imageFileName) {
      // Mengembalikan URL gambar pelanggan berdasarkan nama file gambar
      return imageFileName;
    },
  },
};
//
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  padding: 8px;
  border: 1px solid #ccc;
}

button {
  background-color: grey;
  color: white;
  padding: 7px;
  border-radius: 5px;
  margin: 1px;
  border: none;
}
</style>
