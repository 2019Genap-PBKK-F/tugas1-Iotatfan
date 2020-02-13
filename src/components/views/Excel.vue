<template>
  <div>
    <div id="app" ref="spreadsheet"></div>
    <div>
        <input type="button" value="Add New Row" @click="() => spreadsheet.insertRow()" />
        <input type="button" value="Delete Selected Row" @click="() => spreadsheet.deleteRow()" /></div>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
var data = [
  ['05111740000067', 'Muhammad Iqbal Imani Atfan', '2017', 'Laki-laki', '23-02-1999', 'Rp 2.500.000,00', '', true]
]
var options = {
  data: data,
  allowToolbar: true,
  columns: [
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
export default {
  name: 'App',
  mounted: function () {
    let spreadsheet = jexcel(this.$el, options)
    Object.assign(this, { spreadsheet })
  }
}
</script>
