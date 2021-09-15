<template>
  <div class="chart">
      <Vue3ChartJs
      id="chart1"
      ref="chartRef"
      type="line"
      :data="chartData"
      :options="options"
    ></Vue3ChartJs>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import 'chartjs-adapter-moment'
import {ref} from 'vue'
import {Watch} from 'vue-property-decorator'

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

  @Watch('chartData', {deep:true})
  updateChart() {
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
