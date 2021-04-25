<template>
  <div class="main" ref="chart"></div>
</template>

<script>
var echarts = require("echarts");
// 引入自定义主题
// 把 js文件里的root.echarts 改成echarts；
// 然后在该js文件内 import echarts from 'echarts' 或者 var echarts = require("echarts");
import "../../../public/theme/theme1";
export default {
  name: "radarMap",
  mounted() {
    this.init()
  },
  methods: {
    // myChart.showLoading() //获取数据之前显示加载动画
    // myChart.hideLoading() //当服务器加载到数据后隐藏加载动画
    init() {
      let myChart = echarts.init(this.$refs.chart,'theme1');
      myChart.showLoading() //获取数据之前显示加载动画

      const sleep = (timeout = 2000) => new Promise(resolve => {
        setTimeout(resolve,timeout)
      });

      async function data(){
        await sleep();
        myChart.hideLoading() //当服务器加载到数据后隐藏加载动画
        let dataMax = [
          {
            name: '易用性',
            max: 100
          }, {
            name: '功能',
            max: 100
          }, {
            name: '拍照',
            max: 100
          }, {
            name: '跑分',
            max: 100
          }, {
            name: '处理器',
            max: 100
          },
        ]; //各个维度的最大值
        return dataMax
      }

      (async function getData(){
        let datas = await data();
        // console.log(datas)
        let option = {
          title:{
            text:'雷达图'
          },
          radar: {
            indicator: datas, //配置雷达图的各维度最大值
            shape:'polygon' //配置雷达图最外层的图形 circle  polygon多边形
          },
          series: [
            {
              type: 'radar', //雷达图
              label:{ //设置标签的样式
                show:true//显示数值
              },
              areaStyle:{}, //将每一个产品的雷达图形成阴影的面积
              data: [
                {
                  name: '华为',
                  value: [80, 90, 99, 76, 88]
                },
                {
                  name: '中兴手机',
                  value: [69, 80, 79, 78, 88]
                }
              ]
            }
          ]
        }
        myChart.setOption(option);
      })()


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