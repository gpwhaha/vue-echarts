<template>
  <div class="com-container">
    <div class="com-chart" ref="trend"></div>
  </div>
</template>

<script>
import debounce from "../util/debounce";
export default {
  name: "common",
  data() {
    return {
      chartInstance: null,
      allData:null
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
      this.chartInstance = this.$echarts.init(this.$refs.trend)
      const initOption = {}
      this.chartInstance.setOption(initOption)
    },
    async getData(){
      this.updateChart()
    },
    updateChart(){
      const dataOption = {}
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter(){
      const adapterOption = {}
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    }

  }
}
</script>

<style scoped>

</style>