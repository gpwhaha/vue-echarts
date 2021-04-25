//数组扁平化 ES6
export let flatten = function (arr) {
  let result = [...arr];
  while (result.some(item => Array.isArray(item))) {
    result = [].concat(...result)
  }
  return result;
}

// 普通 递归实现
export let flatten2 = function (arr) {

  let result = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(flatten2(item));
    } else {
      result = result.concat(item);
    }
  })

  return result;
}



