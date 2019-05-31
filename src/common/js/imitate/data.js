/**
 * @file 获取接口
 * @author ChenQing
 * @copyright ChenQing
 * @createDate 2019/05/20
 */
import {
  domain
} from "./mockConfig";
import {
  postData,
  sellerData,
  goodsData,
  ratingsData
} from "./mockRandom";
const Mock = require("mockjs"); // 获取mock对象

// 定义请求链接，类型，还有返回数据
// 返回文章数据
Mock.mock(`${domain}/posts`, "get", postData);
Mock.mock(`${domain}/sellers`, "get", sellerData);
Mock.mock(`${domain}/goods`, "get", goodsData);
Mock.mock(`${domain}/ratings`, "get", ratingsData);
