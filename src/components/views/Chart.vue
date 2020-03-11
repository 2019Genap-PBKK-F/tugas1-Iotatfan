<template>
  <div>
    <div id="app" ref="chart"></div>
    <canvas id="myChart" width="400" height="400">

    </canvas>
  </div>
</template>

<script>
import axios from 'axios'

var host = 'http://10.199.14.46:8012/'

export default {
  // name: 'App',
  data() {
    return {
      mahasiswa: [],
      form: {
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
  },
  methods: {
    load() {
      axios.get(host + 'api/mahasiswa/').then(res => {
        console.log(res.data)
      })
    },
    newRow() {
      axios.post(host + 'api/mahasiswa/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get(host + 'api/mahasiswa/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put(host + 'api/mahasiswa/' + index[0], {
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
      axios.get(host + 'api/mahasiswa').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + 'api/mahasiswa/' + index[0])
      })
    }
  }
}
</script>
