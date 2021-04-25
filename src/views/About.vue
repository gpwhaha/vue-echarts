<template>
  <div class="about">
    <map3/>
    <map4/>
    <map5/>
    <china-map />
    <radar-map/>
    <gauge-map/>
  </div>
</template>

<script>
import map3 from "./echarts/map3";
import map4 from "./echarts/map4";
import map5 from "./echarts/map5";
import chinaMap from "./echarts/chinaMap";
import radarMap from "./echarts/radarMap";
import gaugeMap from "./echarts/gaugeMap";

export default {
  name: "About",
  components: {
    map3,
    map4,
    map5,
    chinaMap,
    radarMap,
    gaugeMap
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
  }
}
</script>

<style scoped>
.about{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>