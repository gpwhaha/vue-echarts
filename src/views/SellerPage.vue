<!--针对于sellerpage 这条路径显示-->
<!--在这个组件中，通过子组件注册的方式，要显示出seller这个组件-->
<template>
  <div class="com-page">
    <seller />
  </div>
</template>

<script>
import Seller from "../components/Seller";
export default {
  name: "SellerPage",
  components:{
    Seller
  },
  data() {
    return {}
  },
  methods:{

  }
}
</script>

<style scoped>

</style>