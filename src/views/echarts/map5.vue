<template>
  <div class="map" ref="map"></div>
</template>

<script>
const echarts = require("echarts");
export default {
  name: "map5",
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let myChart = echarts.init(this.$refs.map);
      // 饼图的数据，数组中多个对象 要有name和value
      let pieData = [
        {
          name: '淘宝',
          value: 11223
        }, {
          name: '京东',
          value: 22123
        }, {
          name: '唯品会',
          value: 5123
        }, {
          name: '1号店',
          value: 7234
        }, {
          name: '聚美优品',
          value: 9123
        },
      ]
      let options = {
        // 主题调色盘（全局）
        // color:['red','green','blue','skyblue','orange'],
        title: {
          text: '饼图'
        },
        series: [
          {
            // color:['red','green','blue','skyblue','orange'],//局部调色盘 会覆盖全局调色盘样式  遵循就近原则
            type: 'pie', //
            data: pieData,
            // 饼图半径
            radius: 100,//像素  也可以设置成百分比 例如20% 就是（盒子元素短的一侧的长度的一半 * 20%）
            // radius:['50%','70%'],//圆环 第一个元素是内圆的半径，第二个为外圆的半径
            roseType: 'radius',//南丁格尔图 根据占比 显示不同的大小
            selectedMode: 'multiple',//single选中效果，能够将一个选中的区域偏离原点一小段距离 multiple 能够将多个选中的区域偏离原点一小段距离
            selectedOffset: 30, //选中便宜距离
            label: { //饼图文字的显示
              show: true,
              formatter(arg) {
                // console.log(arg)
                let {name, value, percent} = arg
                return `${name}平台${value}元\n占比${percent}%`
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