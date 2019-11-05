/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-06 17:37:10
 * @LastEditTime: 2019-09-06 16:56:23
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import vuex from "vuex";
Vue.use(vuex);
export default new vuex.Store({
  state: {
    sellers: {},
    goods: [],
    ratings: [],
    merIsLike: false
  },
  mutations: {
    setSellers(state, data) {
      state.sellers = data;
    },
    setGoods(state, data) {
      state.goods = data;
    },
    setRatings(state, data) {
      state.ratings = data;
    },
    setIsLike(state, data) {
      state.merIsLike = data;
    }
  }
});
