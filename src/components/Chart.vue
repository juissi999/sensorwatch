<template>
  <div class="chart">
      <Vue3ChartJs
      id="chart1"
      ref="chartRef"
      type="line"
      :data="chartData"
      :options="options"
      @click="onClicked"
    ></Vue3ChartJs>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import 'chartjs-adapter-moment'
import {ref} from 'vue'

@Options({
  props: {
    chartData: null
  },
  components:{ Vue3ChartJs }
})
export default class Chart extends Vue {
  chartRef = ref(null)

  options = {
    scales: {
      x: {
        type: 'time',
      }
    }
  }
onClicked() {
  this.chartRef.update(250)
}

}
</script>
<style scoped>
.chart{
  width: 500px;
  height: 500px;
}
</style>
