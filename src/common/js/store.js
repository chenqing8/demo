import Vue from "vue";
import vuex from "vuex";
Vue.use(vuex);
export default new vuex.Store({
  state: {
    sellers: {},
    goods: [],
    ratings: [],
    merIsLike:false
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
