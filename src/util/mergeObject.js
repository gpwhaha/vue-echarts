/**
 * 合并多个对象，返回一个合并后的对象（不改变原对象）
 * @param objs
 * @returns {{}}
 */

export function mergeObject(...objs){
  const result = {};
  objs.forEach(obj => {
    // 获取当前对象的所有属性
    Object.keys(obj).forEach(key=>{
      // 检测result中是否存在key属性
      if (result.hasOwnProperty(key)){
        result[key] = [].concat(result[key])
      }else {
        result[key] = obj[key];
      }
    });
  });
  return result;
}