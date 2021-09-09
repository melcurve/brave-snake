export const PATTERN_EMPTY = /\S/; // 是否为空
export const PATTERN_ISPHONE = /^1[3456789]\d{9}$/; // 是否为手机号
export const PATTERN_ISVIDEO = /\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)/; // 是否为视频
export const PATTERN_HASCN = /[\u4e00-\u9fa5]/; // 是否包含中文
export const PATTERN_NUMBER = /^[0-9]*$/; // 纯数字
export const PATTERN_DIGIT = /^(([0-9])|([1-9]([0-9]+)))(.[0-9]+)?$/; // 数字和小数点

/**
 * 判断是否有值（包含0）
 * @param value 值
 * @param type 判断类型 0 默认判断 1 是否为数组且数组是否为空 2 是否为对象且对象是否为空
 */
export function valid(value: any, type?: 0 | 1 | 2 | 3): boolean {
  // 普通判断
  if (!value && value !== 0) return false;
  else if (!type) return true;
  // 数组判断
  if (type === 1) return Boolean((value instanceof Array) && value.length);
  // 对象判断
  if (type === 2) return Boolean((value instanceof Object) && Object.keys(value).length > 0);
  return false;
};

/**
 * 深拷贝
 * @param {object} target 需要深拷贝的对象
 * @return 返回对象,如果传入的值不是对象则返回原来的值
 */
export function deepClone(target: any): any {
  let result: any = null;
  if (typeof target === 'object') {
    if (Array.isArray(target)) {
      result = [];
      for (let i in target) {
        result.push(deepClone(target[i]));
      }
    } else if (target === null) {
      result = null;
    } else if (target.constructor === RegExp || target.constructor === Date) {
      result = target;
    } else {
      result = {};
      for (let i in target) {
        result[i] = deepClone(target[i]);
      }
    }
  } else {
    result = target;
  }
  return result;
};

/**
 * 延时
 * @param callback 回调
 * @param timeout 延时，不传则为0
 */
export function delay(callback: any, timeout?: number) {
  let t = setTimeout(() => {
    if (t) clearTimeout(t);
    callback();
  }, timeout || 0);
};

/**
 * 数组分割
 * @param array 需要分割的数组
 * @param groupLength 组大小
 */
export function arrayGroup(array: Array<any>, groupLength: number) {
  var index = 0;
  var newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, index += groupLength));
  }
  return newArray;
};

/**
 * 对象转数组
 */
export function objectToArray(object: any): Array<any> {
  return Object.values(object);
}

/**
 * 获取数字区间的随机数
 * @param min 最小值
 * @param max 最大值
 */
export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 数字补0
 * @param {number} number 数字
 * @param {*} length 返回的长度
 * @return 返回
 */
export function fixNumber(number: any, length?: number) {
  if (!isNaN(number)) {
    if (!length) length = 2;
    let len = number.toString().length;
    while (len < length) {
      number = '0' + number;
      len++;
    }
    return number;
  } else {
    return '';
  }
}

/**
 * 数组排序
 * @param list 数组
 * @param type 1 从大到小 2 从小到大
 */
export function sortArray(list: Array<number>, type: 1 | 2) {
  let arr = deepClone(list);
  arr.forEach((item: any) => {
    item = Number(item);
  });
  arr.sort((value1: number, value2: number) => {
    if (type === 1) {
      return value2 - value1;
    } else {
      return value1 - value2;
    }
  });
  return arr;
}

/**
 * 获取数组中的随机元素
 */
export function randomArrayItem(array: Array<any>) {
  return array[randomNumber(0, array.length - 1)];
};

/**
 * 判断size值(px)
 */
export function getSize(value: string | number): string {
  if (!valid(value)) return '0px';
  else if (isNaN(Number(value))) {
    if (String(value).indexOf('vw') >= 0) return `${document.body.clientWidth * Number(String(value).replace('vw', '')) * 0.01}px`;
    else if (String(value).indexOf('vh') >= 0) return `${document.body.clientHeight * Number(String(value).replace('vh', '')) * 0.01}px`;
    else return String(value);
  } else return `${value}px`;
};

export function inputBoolean(value: any): boolean {
  return Boolean(value || value === '');
};

export function changeClass(element: any, value: any, className: string) {
  if (inputBoolean(value)) element.classList.add(className);
  else element.classList.remove(className);
}

export function isInclude(value: any, include: Array<any>): boolean {
  for (let i = 0; i < include.length; i++) {
    if (value === include[i]) {
      return true;
    }
  }
  return false;
}