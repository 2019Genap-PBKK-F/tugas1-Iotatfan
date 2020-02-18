<template>
  <div>
    <div id="app" ref="spreadsheet"></div>
    <div>
        <input type="button" value="Add New Row" @click="() => spreadsheet.insertRow()" />
        <input type="button" value="Delete Selected Row" @click="() => spreadsheet.deleteRow()" />
    </div>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
import axios from 'axios'

export default {
  // name: 'App',
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
    let spreadsheet = jexcel(this.$el, this.jexcelOptions)
    Object.assign(this, { spreadsheet })
  },
  methods: {
    newRow() {
      axios.post('http://iodb.moe:3000/mahasiswa/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      // console.log(columns)
      axios.get('http://iodb.moe:3000/mahasiswa/' + (parseInt(row) + 1)).then(res => {
        var index = Object.values(res.data)
        index[columns] = value
        console.log(index)
        axios.put('http://iodb.moe:3000/mahasiswa/' + index[0], {
          id: index[0],
          nrp: index[1],
          nama: index[2],
          angkatan: index[3],
          jk: index[4],
          lahir: index[5],
          ukt: index[6],
          foto: index[7],
          aktif: index[8]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get('http://iodb.moe:3000/mahasiswa/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
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
        onchange: this.updateRow,
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
