/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-06 17:37:10
 * @LastEditTime: 2019-09-06 17:04:34
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios"; // axios http请求库
import $ from "jquery";
import store from "./common/js/store";
window.$ = $;
require("./common/js/imitate/data"); // 此部分引入的是我们所编写的mockjs文档
const bus = new Vue();
axios.defaults.baseURL = "http://mockjs.com/api"; // 设置默认请求的url
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.prototype.bus = bus;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});
