<!--商家注册的横向柱状图-->
<template>
  <div class="com-container">
    <div class="com-chart" ref="seller"></div>
  </div>
</template>

<script>
import '../../public/theme/purple-passion'
import throttle from '../util/throttle'
import debounce from '../util/debounce'

export default {
  name: "Seller",
  data() {
    return {
      chartInstance: null,
      allData: null,
      currentPage: 1, //当前页数
      totalPage: 0, //总页数
      timerId: null, //定时器标识
    }
  },
  mounted() {
    this.init()
    this.getData()
    // window.addEventListener('resize', this.screenAdapter)
    window.addEventListener('resize', debounce(this.screenAdapter, 200))//监听窗口大小变化
    this.screenAdapter()//屏幕首次加载完成 需要主动适配
  },
  destroyed() {
    clearInterval(this.timerId)
    window.removeEventListener('resize', this.screenAdapter)//避免内存泄漏 移除事件
  },
  methods: {
    //初始化echarts图表
    init() {
      this.chartInstance = this.$echarts.init(this.$refs.seller, 'dark')
      const initOption = {
        title: {
          text: '| 商家销售统计',
          left: 20,
          top: 20
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true //距离包含坐标轴上的文字
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              color: '#2d3443'
            }
          }
        },
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: 'white'
              }
            },
            itemStyle: {
              barBorderRadius: [0, 33, 33, 0],
              //柱的颜色渐变效果  x1,y1,x2,y2 代表坐标轴 0 0 1 0渐变方向向左
              color: {
                type: 'linear',//径向渐变
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0, color: '#5052ee' //0%处颜色
                  }, {
                    offset: 1, color: '#ab6ee5' //100%处颜色
                  },
                ]
              }
              // color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
              //   {
              //     offset: 0,
              //     color: '#5052ee'
              //   }, {
              //     offset: 1,
              //     color: '#ab6ee5'
              //   }
              // ])//x1,y1,x2,y2
            }
          }
        ]
      }
      this.chartInstance.setOption(initOption)
      // 对图标对象进行鼠标事件的监听
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timerId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    //获取数据
    async getData() {
      const {data: res} = await this.$axios.get('../../data/seller.json')
      this.allData = res.data
      console.log(res)
      this.allData.sort((a, b) => a.value - b.value) //从小到大 排序
      //每5个元素显示一页
      this.totalPage = this.allData.length % 5 === 0 ? this.allData.length / 5 : this.allData.length / 5 + 1
      this.updateChart()
      // 启动定时器
      this.startInterval()
    },
    //更新图表
    updateChart() {
      const start = (this.currentPage - 1) * 5
      const end = this.currentPage * 5
      //slice函数 截取数组 包含start开头 但是不包含end结尾
      const showData = this.allData.slice(start, end)
      const sellerNames = showData.map(item => item.name)
      const sellerValues = showData.map(item => item.value)
      // 进行option分离  这里只负责加载数据
      const dataOption = {
        yAxis: {
          data: sellerNames
        },
        series: [
          {
            data: sellerValues,
          }
        ]
      }
      this.chartInstance.setOption(dataOption)
    },
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      this.timerId = setInterval(() => {
        this.currentPage++
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1
        }
        this.updateChart()
      }, 4000)
    },
    //屏幕大小分辨率适配
    screenAdapter() {
      const titleFontsize = this.$refs.seller.offsetWidth / 100 * 3.6 || 69.12
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontsize
          },
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontsize,
            }
          }
        },
        series: [
          {
            barWidth: titleFontsize,
            itemStyle: {
              barBorderRadius: [0, titleFontsize / 2, titleFontsize / 2, 0], //柱的圆角
            }
          }
        ]
      }
      this.chartInstance.setOption(adapterOption)
      // 手动调用图表对象的resize 才能产生效果
      this.chartInstance.resize()
    }
  }
}
</script>

<style scoped>

</style>