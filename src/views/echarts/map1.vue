<template>
  <div>
    <div class="main" ref="chart"></div>
    <button @click="change">修改数据</button>
  </div>

</template>
<!--柱状图-->
<script>
// import echarts  from 'echarts'
var echarts = require("echarts");
export default {
  name: "map1",
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let myChart = echarts.init(this.$refs.chart);
      // 指定图表的配置项和数据
      let option = {
        animation: true, //动画开启
        // animationDuration:3000,//持续时长
        animationDuration(arg) {
          // console.log(arg) //代表不同的柱
          return 3000 * arg
        },
        animationEasing: 'bounceOut', //linear匀速  bounceOut带有回弹效果
        // animationThreshold: 6, //动画阈值  超过则没有动画效果
        // 显示坐标轴网格 控制直角坐标系的布局和大小
        grid: {
          show: true,
          borderColor: 'pink',
          borderWidth: 5,
          left: 220,
          top: 120,
          width: 300,
          height: 200
        },
        title: {
          text: "柱状图",
          textStyle: {
            color: 'red'
          },
          borderWidth: 5,
          borderColor: 'skyblue',
          borderRadius: 5,
          left: 50,
          top: 10
        },
        //区域滑动缩放
        dataZoom: [
          {
            xAxisIndex: 0,
            type: 'slider', //slider开启底部区域滑动 inside 鼠标滚动滑动
          },
          {
            yAxisIndex: 0,
            type: 'slider', //slider开启底部区域滑动 inside 鼠标滚动滑动
            start: 0,
            end: 70 //百分比 默认一开始显示的缩放区域
          }
        ],
        //工具提示
        tooltip: {
          trigger: 'axis',
          triggerOn: 'click',
          formatter(arg) {
            console.log(arg)
            return arg[0].name + "的数量是" + arg[0].data
          }
        },
        //工具按钮
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none"//区域缩放
            },
            dataView: {
              readOnly: false //数据视图
            },
            magicType: {
              type: ["line", "bar"]
            },
            restore: {},//重置
            saveAsImage: {}//导出图片
          }
        },
        //图列
        legend: {
          data: ["销量", "生产"], //显示对应的柱状图
        },
        xAxis: {
          type: 'category', //category类目轴 要设置data ；value数值轴 在下面的series设置数值
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          boundaryGap: true,
          position: 'top' //坐标轴显示位置
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
            barWidth: '50%',
            itemStyle: {
              color: {
                type: 'linear',//线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0, color: 'red' //0%处颜色
                  }, {
                    offset: 1, color: 'skyblue' //100%处颜色
                  },
                ]
              }
            }
          },
          {
            name: "生产",
            type: "bar",
            data: [50, 10, 16, 30, 20, 40],
            itemStyle: {
              color: {
                type: 'radial',//径向渐变
                x: 0.5,
                y: 0.5,
                r: 2.5,
                colorStops: [
                  {
                    offset: 0, color: 'red' //0%处颜色
                  }, {
                    offset: 1, color: 'skyblue' //100%处颜色
                  },
                ]
              }
            },
            markPoint: {
              data: [
                {
                  name: '最大值',
                  type: 'max'//显示标记最大值点
                },
                {
                  name: '最小值',
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
            label: {
              show: true,
              rotate: 60,
              position: 'top'
            },
            barWidth: '50%'
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      // window.onresize 监听窗口变化
      window.onresize = () => myChart.resize() //让图表自适应窗口大小
    },
    change() {
      let myChart = echarts.init(this.$refs.chart);
      let option = {
        series: [
          {
            data: [10, 20, 30, 40, 50, 60]
          },
          {
            data: [10, 20, 30, 40, 50, 60]
          }
        ],
      }
      // setOption可以设置多次  新旧option是整合 只要修改要改数据的地方
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