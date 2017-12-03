/* 解析url字符串 */
export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let str = url.substr(1);
  let arr = str.split('&');
  arr.forEach((item) => {
    let temp = item.split('=');
    obj[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
  });
  return obj;
}
