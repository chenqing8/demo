/**
 * @file 接口配置
 * @author ChenQing
 * @copyright ChenQing
 * @createDate 2019/05/20
 */
const Mock = require("mockjs"); // 获取mock对象
const Random = Mock.Random; // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = "http://mockjs.com/api"; // 定义默认域名，随便写
const code = 200; // 返回的状态码
export {
  Random,
  domain,
  code
};
