<template>
  <div class="chart">
      <Vue3ChartJs
      :id="doughnutChart.id"
      :type="doughnutChart.type"
      :data="doughnutChart.data"
    ></Vue3ChartJs>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

@Options({
  props: {
    msg: String,
  },
  components:{Vue3ChartJs}
})
export default class Chart extends Vue {
  msg!: string;

  doughnutChart = {
      id: 'doughnut',
      type: 'doughnut',
      data: {
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
          {
            backgroundColor: [
              '#41B883',
              '#E46651',
              '#00D8FF',
              '#DD1B16'
            ],
            data: [40, 20, 80, 10]
          }
        ]
      }
  }
}
</script>
<style scoped>
.chart{
  width: 500px;
  height: 500px;
}
</style>
