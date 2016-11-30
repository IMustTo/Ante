/* eslint-disable */
export const dateFormat = (date, formatStr) => {
  if (date instanceof Date || ((typeof date === 'string') && (date = new Date(Date.parse(date.replace(/-/g, '/')))))) {
    if (!formatStr) formatStr = 'yyyy-MM-dd hh:mm';
    const week = {
      0: '\u65e5',
      1: '\u4e00',
      2: '\u4e8c',
      3: '\u4e09',
      4: '\u56db',
      5: '\u4e94',
      6: '\u516d',
    };
    const o = {
      'M+': date.getMonth() + 1, // 月份
      w: week[date.getDay()], // 周
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(formatStr)) formatStr = formatStr.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    var k = null;
    for (var k in o)
      if (new RegExp('(' + k + ')').test(formatStr)) formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  }
  return formatStr || '';
}

export const transitionEnd = (el, fun) => {
  const arr = ['msTransitionEnd', 'mozTransitionEnd', 'oTransitionEnd', 'webkitTransitionEnd', 'transitionend'];
  const handler = {
    handleEvent() {
      arr.forEach((eventName) => {
        el.removeEventListener(eventName, handler, false);
      });
      fun.apply(el, arguments); // eslint-disable-line
    },
  };
  arr.forEach((eventName) => {
    el.addEventListener(eventName, handler, false);
  });
};