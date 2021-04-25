<template>
  <div class="com-container" @dblclick="revertMap" >
    <div class="com-chart" ref="map"></div>
  </div>
</template>
<!--商家分布表-->
<script>
import debounce from "../util/debounce";
import '../../public/theme/chalk'

export default {
  name: "Map",
  data() {
    return {
      chartInstance: null,
      allData: null,
      mapData:{} //所获到的省份地图矢量数据
    }
  },
  mounted() {
    this.init()
    this.getData()
    window.addEventListener('resize', debounce(this.screenAdapter, 200))//监听窗口大小变化
    this.screenAdapter()//屏幕首次加载完成 需要主动适配
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)//避免内存泄漏 移除事件
  },
  methods: {
    async init() {
      this.chartInstance = this.$echarts.init(this.$refs.map, 'chalk')
      const res = await this.$axios.get('../../data/china.json')
      // console.log(res.data)
      this.$echarts.registerMap('china', res.data)
      const initOption = {
        title: {
          text: '| 商家分布',
          left: 20,
          top: 20
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          itemStyle: {
            areaColor: '#2e72bf',
            borderColor: '#333'
          },
        },
        //三个按钮的位置
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical' //垂直排放
        }
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('click',async arg => {
        // const province = res.data.features.filter(item => item.properties.name == arg.name)
        // console.log('...', province[0])
        const dd = await this.$axios.get('../../data/xinjiang.json')
        this.$echarts.registerMap('xinjiang',dd.data)
        const changeOption = {
          geo:{
            map:'xinjiang'
          }
        }
        this.chartInstance.setOption(changeOption)
      })
    },
    async getData() {
      const res = await this.$axios.get('../../data/map.json')
      // console.log(res.data.data)
      this.allData = res.data.data
      this.updateChart()
    },
    updateChart() {
      const legendArr = this.allData.map(item => item.name)
      const seriesArr = this.allData.map(item => {
        // return 的这个对象就代表的是一个类别下面的所有散点数据
        // 如果想在地图中显示散点的数据，就需要给三点的图表配置coordinateSystem:geo
        return {
          type: 'effectScatter',
          rippleEffect: {
            scale: 5,//涟漪效果
            brushType: 'stroke',//涟漪圆圈空心效果
          },
          name: item.name,
          data: item.children,
          coordinateSystem: 'geo'
        }
      })
      const dataOption = {
        legend: {
          data: legendArr
        },
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter() {
      const titleFontsize = this.$refs.map.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontsize
          }
        },
        // 图例大小  三个小圆点
        legend: {
          itemWidth: titleFontsize / 2, //图标大小
          itemHeight: titleFontsize / 2,
          itemGap: titleFontsize / 2, //每个图例之间的间隔
          textStyle: {
            fontSize: titleFontsize / 2
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    //双击返回中国地图
    revertMap(){
      const revertOption = {
        geo:{
          map: 'china'
        }
      }
      this.chartInstance.setOption(revertOption)
    }

  }
}
</script>

<style scoped>

</style>