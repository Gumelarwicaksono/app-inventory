<template>
  <div class="tambah-customer">
    <h2>Tambah Customer</h2>
    <table>
      <tr>
        <td>Nama:</td>
        <td><input type="text" v-model="nama" required /></td>
      </tr>
      <tr>
        <td>Contact:</td>
        <td><input type="text" v-model="contact" required /></td>
      </tr>
      <tr>
        <td>Email:</td>
        <td><input type="email" v-model="email" required /></td>
      </tr>
      <tr>
        <td>Alamat:</td>
        <td><input type="text" v-model="alamat" required /></td>
      </tr>
      <tr>
        <td>Diskon:</td>
        <td><input type="number" v-model="diskon" required /></td>
      </tr>
      <tr>
        <td>Tipe Diskon:</td>
        <td>
          <select v-model="tipeDiskon" required>
            <option value="persentase">Persentase</option>
            <option value="fix">Fix</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>KTP:</td>
        <td><input type="file" @change="onFileChange" required /></td>
      </tr>
      <tr>
        <td>Status Log:</td>
        <td><input type="checkbox" v-model="sttlog" /></td>
      </tr>
      <tr>
        <td colspan="2"><button @click="tambahCustomer">Tambah</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nama: '',
      contact: '',
      email: '',
      alamat: '',
      diskon: 0,
      tipeDiskon: 'persentase',
      ktp: null,
      sttlog: false,
    };
  },
  methods: {
    tambahCustomer() {
      const formData = new FormData();
      formData.append('nama', this.nama);
      formData.append('contact', this.contact);
      formData.append('email', this.email);
      formData.append('alamat', this.alamat);
      formData.append('diskon', this.diskon);
      formData.append('tipe_diskon', this.tipeDiskon);
      formData.append('ktp', this.ktp);
      formData.append('sttlog', this.sttlog);

      axios
        .post('http://localhost:3000/api/customers', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response) {
            alert('Customer berhasil ditambahkan.');
            this.resetForm();
            this.$router.push('/');
          }
        })
        .catch((error) => {
          console.error('Terjadi kesalahan dalam menambahkan customer:', error);
        });
    },
    onFileChange(event) {
      this.ktp = event.target.files[0];
    },
    resetForm() {
      this.nama = '';
      this.contact = '';
      this.email = '';
      this.alamat = '';
      this.diskon = 0;
      this.tipeDiskon = 'persentase';
      this.ktp = null;
      this.sttlog = false;
    },
  },
};
</script>
