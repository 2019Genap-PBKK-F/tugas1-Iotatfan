<template>
  <div>
    <div id="app" ref="chart"></div>
    <div class="col-sm-4 col-xs-8">
      <p class="text-center">
        <strong>Jumlah Mahasiswa</strong>
      </p>
      <canvas id="genderChart"></canvas>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js'

var host = 'http://localhost:8012/'

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
      axios.get(host + 'api/gender/').then(res => {
        console.log(res.data[0])
        var genderChart = document.getElementById('genderChart')
        var genderChartConfig = {
          type: 'pie',
          data: {
            labels: ['Laki-Laki', 'Perempuan'],
            datasets: [{
              data: Object.values(res.data[0]),
              backgroundColor: ['#00a65a', '#f39c12'],
              hoverBackgroundColor: ['#00a65a', '#f39c12']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: !this.isMobile,
            legend: {
              position: 'bottom',
              display: true
            }

          }
        }
        new Chart(genderChart, genderChartConfig)  // eslint-disable-line no-new
      })
    }
  },
  computed: {
    isMobile () {
      return (window.innerWidth <= 800 && window.innerHeight <= 600)
    }
  }
}
</script>
