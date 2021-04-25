<template>
  <div class="com-container">
    <div class="title" :style="comStyle">
      <span>{{ '| ' + showTitle }}</span>
      <span class="iconfont title-icon" :style="comStyle" @click="showChoice = !showChoice">&#xe626;</span>
      <transition name="bounce">
      <div class="select-con " v-show="showChoice" :style="marginStyle">
        <div class="select-item" v-for="(item,index) in selectTypes " :key="item.key" @click="handleSelect(item.key)">
          {{ item.name }}
        </div>
      </div>
      </transition>
    </div>
    <div class="com-chart" ref="trend"></div>
  </div>
</template>

<script>
import debounce from "../util/debounce";
import '../../public/theme/chalk'

export default {
  name: "Trend",
  data() {
    return {
      chartInstance: null,
      allData: null,
      showChoice: false,
      choiceType: 'map', //显示的数据类型
      titleFontsize: 0  //指明标题大小
    }
  },
  computed: {
    //下拉选择加载不同的属性
    selectTypes() {
      if (!this.allData) {
        return []
      } else {
        return this.allData.type.filter(item => item.key !== this.choiceType)
      }
    },
    //标题
    showTitle() {
      if (!this.allData) {
        return ''
      } else {
        return this.allData[this.choiceType].title
      }
    },
    //设置给标题的样式 大小
    comStyle() {
      return {
        fontSize: this.titleFontsize + 'px'
      }
    },
    marginStyle() {
      return {
        marginLeft: this.titleFontsize + 'px'
      }
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
    init() {
      this.chartInstance = this.$echarts.init(this.$refs.trend, 'chalk')
      const initOption = {
        grid: {
          left: '3%',
          top: '35%',
          right: '4%',
          bottom: '1%',
          containLabel: true //避免坐标轴文字出去
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          left: 20,
          top: '15%',
          icon: 'circle'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false //紧挨边缘
        },
        yAxis: {
          type: 'value'
        }
      }
      this.chartInstance.setOption(initOption)
    },
    async getData() {
      const {data: ret} = await this.$axios.get('../../data/trend.json')
      // console.log(ret)
      this.allData = ret
      this.updateChart()
    },
    updateChart() {

      // 半透明
      const colorArr1 = [
        'rgba(11,168,44,0.5)',
        'rgba(44,110,255,0.5)',
        'rgba(22,242,217,0.5)',
        'rgba(254,33,30,0.5)',
        'rgba(250,105,0,0.5)'
      ]
      // 全透明
      const colorArr2 = [
        'rgba(11,168,44,0)',
        'rgba(44,110,255,0)',
        'rgba(22,242,217,0)',
        'rgba(254,33,30,0)',
        'rgba(250,105,0,0)'
      ]
      //类目轴数据
      const timeArr = this.allData.common.month;
      //y轴数据
      const valueArr = this.allData[this.choiceType].data;
      const seriesArr = valueArr.map((item, index) => {
        return {
          name: item.name,
          type: 'line',
          data: item.data,
          stack: this.choiceType, //堆叠图 是以上一条数据的起点进行累加
          lineStyle: {
            width: 2
          },
          areaStyle: {
            color: {
              type: 'liner',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                {
                  offset: 0, color: colorArr1[index]
                }, {
                  offset: 1, color: colorArr2[index]
                },
              ]
            }
          },
        }
      })
      //图例的数据
      const legenArr = valueArr.map(item => item.name)
      console.log(seriesArr)
      const dataOption = {
        xAxis: {
          data: timeArr
        },
        legend: {
          data: legenArr
        },
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter() {
      this.titleFontsize = this.$refs.trend.offsetWidth / 100 * 3.6 || 69.12
      const adapterOption = {
        legend: {
          itemWidth: this.titleFontsize,
          itemHeight: this.titleFontsize,
          itemGap: this.titleFontsize,
          textStyle: {
            fontSize: this.titleFontsize / 2
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    handleSelect(currentType) {
      this.choiceType = currentType
      this.updateChart()
      this.showChoice = false
    }

  }
}
</script>

<style lang="less" scoped>
.title {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10;
  color: #f6f6f6;

  .title-icon {
    margin-left: 10px;
    cursor: pointer; //选中时是小手
  }

  .select-item {
    margin-left: -26px;

  }

}
.bounce-enter-active {
  animation: bounce-in .8s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s ease;
}
@keyframes bounce-in {
  0% {
    //transform: translateY(0);
    opacity: 0;
  }
  100% {
    //transform: translateY(150px);
    opacity: 1;
  }
}


</style>