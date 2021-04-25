<template>
  <div class="main" ref="chart"></div>
</template>

<script>
var echarts = require("echarts");
export default {
  name: "chinaMap",
  mounted() {
    this.init()
    // this.cors()//测试跨域
  },
  methods: {
    init() {
      let myChart = echarts.init(this.$refs.chart);
      let airData = [
        {name: '上海市', value: 33},
        {name: '北京市', value: 30},
        {name: '天津市', value: 13},
        {name: '江苏省', value: 43},
        {name: '河北省', value: 35},
        {name: '云南省', value: 37},
        {name: '湖南省', value: 12},
        {name: '安徽省', value: 78},
        {name: '山东省', value: 90},
        {name: '浙江省', value: 89},
        {name: '广西省', value: 97},
        {name: '湖北省', value: 77},
      ]//空气质量数据
      let scatterData = [{
        value: [114.502461, 38.045474]  //散点地理经纬度
      }]
      this.$axios.get('../../data/china.json')
          .then(res => {
            // console.log(res.data)
            // 先获取到中国地图的矢量地图数据
            echarts.registerMap('chinaMap', res.data)
            // 指定图表的配置项和数据
            let option = {
              title: {
                text: '中国地图'
              },
              geo: {
                type: 'map',
                map: "chinaMap",
                roam: false,// 设置拖拽和缩放
                zoom: 1.53, //设置初始化缩放比例
                center: [105, 36], // 调整地图位置 中心点坐标
                label: {
                  normal: {
                    show: false, //关闭省份名展示
                    fontSize: "10",
                    color: "rgba(0,0,0,0.7)"
                  },
                  emphasis: {
                    show: true
                  }
                },
              },
              series: [
                {
                  data: airData,
                  geoIndex: 0, //将空气质量的数据和第0个geo配置关联
                  type: 'map'
                },
                {
                  data: scatterData,
                  type: 'effectScatter',
                  coordinateSystem: 'geo', //指明散点使用的坐标系 geo坐标系统
                  rippleEffect: {
                    scale: 10,  //指定涟漪动画大小\
                    // color:'skyblue'
                  },
                }
              ],
              visualMap: {
                min: 0,
                max: 100,
                inRange: {
                  color: ['white', 'orange'] //控制显示颜色渐变范围
                },
                calculable: true //出现滑块效果
              }
            }
            myChart.setOption(option);
            // 给图标添加事件
            myChart.on('click',()=>{
              console.log('click')
            })
            // window.onresize 监听窗口变化
            window.onresize = () => myChart.resize() //让图表自适应窗口大小
          })
          .catch(err => console.log(err))

    },
    cors(){
      this.$axios.get('http://127.0.0.1:3000/').then(res=>console.log(res))
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