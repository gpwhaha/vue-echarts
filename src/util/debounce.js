 let debounce = function (func, delay = 500) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
      timer = null;
    }, delay)
  }
}
// 防抖函数
module.exports = debounce