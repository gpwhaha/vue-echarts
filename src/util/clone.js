/**
 * 浅拷贝
 * @param target
 * @returns {*[]|*}
 */
export function clone1(target) {
  //类型判断 {} [] null
  if (typeof target === 'object' && target !== null) {
    if (Array.isArray(target)) {
      return [...target]
    } else {
      return {...target}
    }
  } else {
    return target;
  }
}

//es5 浅拷贝
export function clone2(target) {
  //判断
  if (typeof target === 'object' && target !== null) {
    //创建一个容器
    const result = Array.isArray(target) ? [] : {}
    //便利target数据
    for (let key in target) {
      //判断当前对象身上是否包含该属性
      if (target.hasOwnProperty(key)) {
        //将属性设置到result结果数据中
        result[key] = target[key];
      }
    }
    return result;
  } else {
    return target;
  }
}

/**
 * 不能克隆函数
 * 不能循环引用
 * @param target
 * @returns {any}
 */
export function deepClone1(target) {
  //通过数据创建JSON格式的字符串
  let str = JSON.stringify(target);
  //将JSON字符串创建为JS 数据
  let data = JSON.parse(str);
  return data;
}

/**
 * 升级版 但还是不能解决循环引用
 * @param target
 * @returns {*[]|*}
 */
export function deepClone2(target) {
  //检测数据类型
  if (typeof target === 'object' && target !== null) {
    //创建一个容器
    const result = Array.isArray(target) ? [] : {};
    //遍历对象
    for (let key in target) {
      //检测该属性是否为对象本身的属性(不能拷贝原型对象的属性)
      if (target.hasOwnProperty(key)) {
        result[key] = deepClone2(target[key]);
      }
    }
    return result;
  } else {
    return target;
  }
}

/**
 * 解决了循环引用的问题
 * @param target
 * @param map
 * @returns {*[]|any}
 */
export function deepClone3(target, map = new Map()) {
  //克隆数据之前，进行判断，数据之前是否被克隆过
  let cache = map.get(target);
  if (cache) {
    return cache;
  }
  //检测数据类型
  if (typeof target === 'object' && target !== null) {
    //创建一个容器
    const result = Array.isArray(target) ? [] : {};
    //将新结果存入到容器中
    map.set(target, result);
    //遍历对象
    for (let key in target) {
      //检测该属性是否为对象本身的属性(不能拷贝原型对象的属性)
      if (target.hasOwnProperty(key)) {
        result[key] = deepClone3(target[key], map);
      }
    }
    return result;
  } else {
    return target;
  }
}

/**
 * 对上面优化 for in效率低
 * foreach效率高
 * @param target
 * @param map
 * @returns {*[]|any}
 */
export function deepClone4(target, map = new Map()) {
  //克隆数据之前，进行判断，数据之前是否被克隆过
  let cache = map.get(target);
  if (cache) {
    return cache;
  }
  //检测数据类型
  if (typeof target === 'object' && target !== null) {
    //创建一个容器
    let isArray = Array.isArray(target);
    const result = isArray ? [] : {};
    //将新结果存入到容器中
    map.set(target, result);
    //遍历对象
    //如果目标数据为数组
    if (isArray) {
      //foreach 遍历
      target.forEach((item, index) => {
        result[index] = deepClone4(item, map)
      });
    } else {
      //如果是对象,获取所有的键名，然后 forEch 遍历
      Object.keys(target).forEach(key => {
        result[key] = deepClone4(target[key], map);
      })
    }
    return result;
  } else {
    return target;
  }
}