<template>
  <div class="chart">
      <Vue3ChartJs
      id="chart1"
      type="line"
      :data="chartData"
    ></Vue3ChartJs>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

@Options({
  props: {
    chartData: null
  },
  components:{ Vue3ChartJs }
})
export default class Chart extends Vue {
  msg!: string;
}
</script>
<style scoped>
.chart{
  width: 500px;
  height: 500px;
}
</style>
