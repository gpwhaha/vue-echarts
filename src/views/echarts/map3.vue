<template>
  <div class="map" ref="map"></div>
</template>

<script>
const echarts = require("echarts");
export default {
  name: "map3",
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let myChart = echarts.init(this.$refs.map);
      let xData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      let yData = [3000, 2000, 1000, 2500, 4000, 5002, 3241, 2313, 4234, 5345, 6757, 1323]
      // let yData2 = [3001, 3002, 3003, 3009, 3006, 3001, 3007, 3008, 3009, 3006, 3005, 3000]
      let yData2 = [4001,2002,5003, 6009, 7006, 5001, 6007, 5008, 3009, 4006, 3005, 8000]
      let options = {
        title: {
          text: '折线图'
        },
        xAxis: {
          type: 'category',
          data: xData,
          boundaryGap:false //让最左侧的点紧贴着x轴
        },
        yAxis: {
          type: 'value',
          scale: true //当数值过于接近时 避免显示成一条直线
        },
        legend: {
          data: ["佳能","康师傅"], //显示对应的柱状图
        },
        tooltip: {
          trigger:'axis',
        },
        series: [
          {
            name:'佳能',
            data:yData2,
            type:'line',
            stack:'all',//避免两条线重叠 要在避免的属性上都设置(堆叠图)
            areaStyle:{}
          },
          {
            name: '康师傅',
            data: yData,
            type: 'line',
            stack:'all',
            markPoint: {
              data: [
                {
                  type: 'max'//显示标记最大值点
                },
                {
                  type: 'min'
                }
              ]
            },
            markLine: {
              data: [
                {
                  type: 'average'
                }
              ]
            },
            markArea: {
              data: [
                [{xAxis: '1月'}, {xAxis: '2月'}], //显示区间
                [{xAxis: '6月'}, {xAxis: '7月'}]
              ]
            },
            //曲线显示平滑
            smooth:true,
            //线条配置
            lineStyle:{
              color:'skyblue',
              type:'dashed',//dotted solid
            },
            //填充风格
            areaStyle:{
              color:'pink'
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