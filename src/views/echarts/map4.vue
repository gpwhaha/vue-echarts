<template>
  <div class="map" ref="map"></div>
</template>
<!--散点图-->
<script>
const echarts = require("echarts");
export default {
  name: "map4",
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let myChart = echarts.init(this.$refs.map);
      let yData = [[2, 3], [3, 4], [4, 5], [4, 2], [2, 2], [4, 4], [3, 6], [3, 8], [2, 2], [9, 7]]
      let options = {
        title: {
          text: '散点图'
        },
        xAxis: {
          type: 'value',
          scale: true //摆脱坐标轴的0 根据数值不一定是从0开始
        },
        yAxis: {
          type: 'value',
          scale: true,
        },
        legend: {
          // data: ["佳能","康师傅"], //显示对应的柱状图/
        },
        // tooltip: {
        //   trigger: 'axis',
        // },
        series: [
          {
            // type: 'scatter',
            type:'effectScatter', //涟漪图气泡 有动态效果
            showEffectOn:'render', //render 渲染完成每个点都有动效 emphasis 鼠标经过才会有动效
            rippleEffect:{
              scale: 5 //动画大小
            },
            data: yData,
            // symbolSize: 20 //点的大小
            symbolSize(arg) { //气泡大小
              // console.log(arg)
              let height = arg[0];
              let weight = arg[1];
              if (height / weight > 1.1) {
                return 15
              }
              return 8
            },
            itemStyle: { //气泡颜色
              color(arg) {
                // console.log(arg)
                let height = arg.data[0];
                let weight = arg.data[1];
                if (height / weight > 1.1) {
                  return "skyblue"
                }
                return "pink"
              }
            }
          }
        ]

      }
      myChart.setOption(options)

    }
  }
}
</script>

<style scoped>
.map {
  width: 600px;
  height: 400px;
}
</style>