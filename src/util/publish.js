//发布订阅

export const PubSub = {
  //订阅唯一id
  //频道与回调保存容器
  id:1,
  callbacks:{
    //pay
    //token_1:callback;
  }
}
//订阅频道
PubSub.subscribe = function (channel,callback) {
  //创建唯一编号
  let token = "token_" + this.id++;
  if (this.callbacks[channel]){
    //pay token_1
    //判断 callbacks 属性中是否存在 pay
    this.callbacks[channel][token] = callback;
  }else {
    this.callbacks[channel] ={
      [token]:callback
    }
  }
}
//发布消息
PubSub.publish = function (channel,data) {
  //获取当前频道中的所有回调
  if (this.callbacks[channel]){
    Object.values(this.callbacks[channel]).forEach(callback=>{
      // 执行回调
      callback(data);
    })
  }
}

/**
 * 取消订阅
 * 1。 ，欸有船只，flag为undefined
 * 2.没有传入token字符串
 * 3.msgName字符串
 */

PubSub.off = function (flag) {
  //如果flag为undefined 则清空所有订阅
  if (flag === undefined){
    this.callbacks={};
  }else if (typeof flag === 'string'){
    //判断是否为token开头
    if (flag.indexOf('token_') ===0){
      //如果是 表明是一个订阅id
      let callbackObj = Object.values(this.callbacks).find(obj => obj.hasOwnProperty(flag))
      if (callbackObj){
        delete callbackObj[flag];
      }
    }else {
      //表明是一个频道的名称
      delete  this.callbacks[flag];
    }
  }
}