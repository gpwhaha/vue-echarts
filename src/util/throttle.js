let throttle = function (func, delay = 500) {
  let start = 0;
  return function (...arg) {
    let now = Date.now();
    if (now - start >= delay) {
      func.call(this, arg);
      start = now;
    }
  }
}
// 节流函数
module.exports = throttle
