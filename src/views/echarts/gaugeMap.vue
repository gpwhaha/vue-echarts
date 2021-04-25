<template>
  <div class="main" ref="chart"></div>
</template>

<script>
var echarts = require("echarts");
export default {
  name: "gaugeMap",
  mounted() {
    this.init()
  },
  methods: {
    init() {
      /**
       * 默认内置两套主题：light dark
       * 在初始化时可以init指明
       * let myChart = echarts.init(dom,'light);
       */
      let myChart = echarts.init(this.$refs.chart,'dark');
      let option = {
        title: {
          text: '仪表盘'
        },
        series: [
          {
            type: 'gauge', //仪表盘
            min: 50, //控制仪表盘数值范围
            max: 120,
            data: [
              {
                value: 97,
                itemStyle:{
                  color:'pink'
                }
              }, //每一个对象代表一个指针
              {
                value: 80,
                itemStyle:{
                  color:'skyblue'
                }
              }
            ]
          }
        ]
      }
      myChart.setOption(option);
    }
  }
}
</script>

<style scoped>
.main {
  width: 600px;
  height: 400px;
}
</style>