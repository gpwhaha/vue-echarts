/**
 *删除数组中的元素 并返回要删除元素的数组
 * @param {Array} arr 被删除的数组
 * @param {...any} args 要删除的元素
 */

export function pull(arr, ...args) {
// 声明空数组，保存删掉的元素
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (args.includes(arr[i])) {
      //将要删除的元素保存到result中
      result.push(arr[i])
      //删除当前元素
      arr.splice(i,1)
      //下标自减  避免后一个元素往前 下次循环跳过这个元素
      i--;
    }
  }
  return result;
}

/**
 *
 * @param arr
 * @param {Array}values
 * @returns {[]}
 */
export function pullAll(arr,values){
  return pull(arr,...values)
}