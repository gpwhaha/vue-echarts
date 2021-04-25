<template>
  <div class="home">
    <map1 class="map1" />
    <map2 class="map2" />
    <pie-map />
    <div>
      <el-upload
        class="upload-demo"
        :action=actions
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="handleAvatarSuccess"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import map1 from "./echarts/map1";
import map2 from "./echarts/map2";
import pieMap from "./echarts/pieMap";
import { flatten, flatten2 } from "../util/arrayFlatten";
import { chunk } from "../util/chunk";
import { difference } from "../util/difference";
import { pull } from "../util/pull";
import { newInstance } from "../util/newInstance";
import { myInstanceof } from "../util/myInstanceof";
import { deepClone2 } from "../util/clone";
// import {clone1,flatten} from "gpw-utils"
// import utils from "gpw-utils"
const utils = require("gpw-utils");

export default {
  name: "home",
  components: {
    map1,
    map2,
    pieMap,
  },
  data() {
    return {
      tableData: [],
      actions: "http://localhost:3001/api/user/uploadOS",
      imageUrl: "",
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  mounted() {
    this.getFlatten();
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log('上传成功，',res)
    },
    getFlatten() {
      const arr = [1, 2, [3, 4, [5, 6, [7, 8]]], 9];
      const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const arr3 = [1, 2, 3, 10, 11];
      let a = flatten(arr);
      let b = chunk(arr2, 4);
      let c = difference(arr2, arr3);
      let d = pull(arr3, 1, 2, 4, 5);
      // console.log(d)
      // console.log(arr3)

      function Person(name, age) {
        this.name = name;
        this.age = age;
      }

      let p = new Person();
      let e = myInstanceof(p, Person);
      let obj = newInstance(Person, "张三", 18);

      let objs = {
        a: 1,
        b: ["e", "f", "g", "j"],
        c: { h: 20 },
      };
      let result = deepClone2(objs);
      console.log(result);
      console.log("gpw", utils);
      // console.log('gpw2',flatten([1,2,3,[4,5,[6,7,[8,[9]]]]]))
      console.log("gpw2", utils.flatten([1, 2, 3, [4, 5, [6, 7, [8, [9]]]]]));
      // console.log('gpw2',gpw.flatten([1,2,3,[4,5,[6,7,[8,[9]]]]]))
    },
  },
};
</script>

<style scoped>
.el-col {
  border-radius: 4px;
  text-align: center;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 36px;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.home {
  display: flex;
  flex-wrap: wrap;
}
</style>
