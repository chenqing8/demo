// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";// axios http请求库
import $ from "jquery";
window.$ = $;
// import Bus from "./common/js/bus";
require("./common/js/imitate/data");// 此部分引入的是我们所编写的mockjs文档
const bus = new Vue();
axios.defaults.baseURL = "http://mockjs.com/api";// 设置默认请求的url
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.prototype.bus = bus;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>"
});
