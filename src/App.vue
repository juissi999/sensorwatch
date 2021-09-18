<template>
  <img alt="Vue logo" src="./assets/logo.png" />
      <h1>Sensorwatch</h1>
  <Chart :chartData="chartData" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Chart from "./components/Chart.vue";
import { io } from "socket.io-client"

@Options({
  components: {
    Chart,
  },
})
  // labels: [new Date(86400000), // Day 1
  //          new Date(2 * 86400000), // Day 2
  //          new Date(3 * 86400000), // Day 3
  //          new Date(4 * 86400000)],
export default class App extends Vue {
  chartData = {
    labels:[],
      datasets: [
        {
          label:'',
          backgroundColor: [
            '#41B883',
          ],
          data: []
        }
      ]
  }

  socket = null

  updateData = (newData) => {
    this.chartData.labels = this.chartData.labels.concat(newData.timestamp)
    this.chartData.datasets[0].data = this.chartData.datasets[0].data.concat(newData.datapoint)
    this.chartData.datasets[0].label = newData.label
  }
  drawData = (dataVector) => {
    this.chartData.labels = this.chartData.labels=dataVector.map(dp=>dp.timestamp)
    this.chartData.datasets[0].data = dataVector.map(dp=>dp.datapoint)
    this.chartData.datasets[0].label = dataVector[0].label
  }
  mounted() {
    
    this.socket = io()
    this.socket.on('data', (datapoints:any[])=>{
      //datapoints.forEach((dp:any)=>this.drawData(dp))
      this.drawData(datapoints)
    })
    this.socket.on("connect_error", (err:any) => {
      console.log(`connect_error due to ${err.message}`)
    })
  }
  // beforeUnmount() {
  //   this.socket.disconnect()
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
