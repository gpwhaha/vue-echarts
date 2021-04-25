/**
 * 数组分组
 * @param {Array} arr
 * @param {Number} size
 */

export function chunk(arr,size=1) {
  // 声明两个变量
  let result = [];
  let temp = [];
  // 遍历
  arr.forEach(item =>{
    //判断元素长度是否为0
    if (temp.length ===0){
      result.push(temp);
    }
    temp.push(item);
    //判断数组是否装满
    if (temp.length === size){
      temp = [];
    }
  });
  return result;
}