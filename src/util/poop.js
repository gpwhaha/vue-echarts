
// 事件委托与冒泡
export function addEventListener(el,type,fn,selector) {
  //判断el类型
  if (typeof el === 'string'){
    el = document.querySelector(el);
  }
  // 事件绑定
  //如没有传弟子元素的选择器，则给el元素绑定事件
  if (!selector){
    el.addEventListener(type,fn);
  }else {
    el.addEventListener(type,function (e) {
      //获取点击的目标事件源
      const target = e.target;
      //判断选择器与目标元素是否符合
      if(target.matches(selector)){
        //若符合 则调用回调
        fn.call(target,e);
      }
    })
  }
}

// 使用
// addEventListener('#dom','click',function (e) {
//   // 输出标签文本
//   console.log(this.innerHTML);
// },'li')