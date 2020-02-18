<template>
  <div>
    <div id="app" ref="spreadsheet"></div>
    <div>
        <input type="button" value="Add New Row" @click="() => spreadsheet.insertRow()" />
        <input type="button" value="Delete Selected Row" @click="() => spreadsheet.deleteRow()" />
    </div>
    <ul v-for="user in mahasiswa" :key="user.id">
      <li>
        <span>{{user.nrp}} | {{user.nama}} | {{user.nrp}} | {{user.angkatan}} | {{user.jk}} | {{user.lahir}} | Rp {{user.ukt}} </span>&#160;
      </li>
    </ul>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
import axios from 'axios'

// var data = [
//   ['05111740000067', 'Muhammad Iqbal Imani Atfan', '2017', 'Laki-laki', '23-02-1999', 'Rp 2.500.000,00', '', true]
// ]
// var options = {
//   data: mahasiswa,
//   allowToolbar: true,
//   columns: [
//     { type: 'hidden', title: 'id', width: '10px'},
//     { type: 'text', title: 'NRP', width: '120px' },
//     { type: 'text', title: 'Nama', width: '200px' },
//     { type: 'text', title: 'Angkatan', width: '80px' },
//     { type: 'dropdown', title: 'Jenis Kelamin', width: '120px', source: [ 'Laki-laki', 'Perempuan' ], autocomplete: true },
//     { type: 'calendar', title: 'Tanggal Lahir', width: '120px' },
//     { type: 'numeric', title: 'UKT', width: '120px', mask: 'Rp #.##,00', decimal: ',' },
//     { type: 'image', title: 'Photo', width: '120px' },
//     { type: 'checkbox', title: 'Aktif', width: '80px' }
//   ]
// }

export default {
  name: 'App',
  data() {
    return {
      mahasiswa: [],
      form: {
        id: '',
        nrp: '',
        nama: '',
        angkatan: '',
        jk: '',
        lahir: '',
        ukt: '',
        foto: '',
        aktif: ''
      }
    }
  },
  mounted() {
    this.load()
    let spreadsheet = jexcel(this.$el, this.jexcelOptions)
    Object.assign(this, { spreadsheet })
  },
  methods: {
    load() {
      axios.get('http://iodb.moe:3000/mahasiswa').then(res => {
        this.mahasiswa = Object.values(res.data) // data dari API masukin ke mahasiswa
      }).catch((err) => {
        console.log(err)
      })
    },
    newRow() {
      axios.post('http://iodb.moe:3000/mahasiswa/', this.form).then(res => {
        console.log(res.data)
      })
    },
    // updateRow(form, x, y) {
    //   var temp = []
    //   axios.get('http://iodb.moe:3000/mahasiswa/' + form.id).then(res => {
    //   })
    // },
    deleteRow(instance, id) {
      axios.get('http://iodb.moe:3000/mahasiswa/').then(res => {
        var index = Object.values(res.data[id])
        axios.delete('http://iodb.moe:3000/mahasiswa/' + index[0])
      })
    }
  },
  computed: {
    jexcelOptions() {
      return {
        data: this.mahasiswa,
        allowToolbar: true,
        url: 'http://iodb.moe:3000/mahasiswa/',
        onchange: this.update,
        oninsertrow: this.newRow,
        ondeleterow: this.deleteRow,
        columns: [
          { type: 'hidden', title: 'id', width: '10px' },
          { type: 'text', title: 'NRP', width: '120px' },
          { type: 'text', title: 'Nama', width: '200px' },
          { type: 'text', title: 'Angkatan', width: '80px' },
          { type: 'dropdown', title: 'Jenis Kelamin', width: '120px', source: [ 'Laki-laki', 'Perempuan' ], autocomplete: true },
          { type: 'calendar', title: 'Tanggal Lahir', width: '120px' },
          { type: 'numeric', title: 'UKT', width: '120px', mask: 'Rp #.##,00', decimal: ',' },
          { type: 'image', title: 'Photo', width: '120px' },
          { type: 'checkbox', title: 'Aktif', width: '80px' }
        ]
      }
    }
  }
}
</script>
