<template>
  <img alt="Vue logo" src="./assets/logo.png" />
      <h1>Sensorwatch</h1>
  <Chart :chartData="chartData" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Chart from "./components/Chart.vue";

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
          backgroundColor: [
            '#41B883',
          ],
          data: []
        }
      ]
  }

  test = () => {
    this.chartData.labels = this.chartData.labels.concat(new Date())
    this.chartData.datasets[0].data = this.chartData.datasets[0].data.concat(11)
    setTimeout(this.test, 1000)
  }
  mounted() {
    setTimeout(this.test, 1000)
  }
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
