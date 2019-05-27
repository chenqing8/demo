import Vue from "vue";
import Router from "vue-router";
const commodity = () => import("@comp/commodity/commodity.vue");
const Merchant = () => import("@comp/Merchant/Merchant.vue");
const pinglun = () => import("@comp/pinglun/pinglun.vue");

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "app",
      redirect: "commodity",
      meta: "初始路径"
    },
    {
      path: "/commodity",
      name: "commodity",
      component: commodity,
      meta: "商品页"
    },
    {
      path: "/Merchant",
      name: "Merchant",
      component: Merchant,
      meta: "商家页"
    },
    {
      path: "/pinglun",
      name: "pinglun",
      component: pinglun,
      meta: "评论页"
    }
  ]
});
