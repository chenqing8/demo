<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-06 17:37:09
 * @LastEditTime: 2019-09-06 16:55:09
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app">
    <v-header :headerData="headerDataList"></v-header>
    <div class="tab">
      <div class="tab_item">
        <router-link tag="a" to="/commodity">商品</router-link>
      </div>
      <div class="tab_item">
        <router-link tag="a" to="/Merchant">商家</router-link>
      </div>
      <div class="tab_item">
        <router-link tag="a" to="/pinglun">评论</router-link>
      </div>
    </div>
    <router-view></router-view>
    <div class="footer">
      <v-shopcard
        :minPrice="minPrice"
        :deliveryPrice="deliveryPrice"
        :shopCardList="shopCardList"
        @clear="clear"
      ></v-shopcard>
    </div>
  </div>
</template>

<script>
import shopCard from "@/shopCard/shopCard";
import Header from "@/header/header";
export default {
  name: "app",
  data() {
    return {
      name: 154,
      headerDataList: [],
      goods: [],
      deliveryPrice: 0,
      minPrice: 0,
      totalCol: 24, // 总列数
      labelCol: 0, // label所占列数
      colWidth: 40 // 每单位宽度
    };
  },
  components: {
    "v-shopcard": shopCard,
    "v-header": Header
  },
  computed: {
    /**
     * @method shopCardList
     * @param no
     * @returns 加入购物车的list
     * @desc 把商品列表中有包含count的都push到list里面
     */
    shopCardList() {
      let a = [];
      this.goods.map((item, index) => {
        item.foods.map((item1, index1) => {
          if (item1.count) {
            a.push(item1);
          }
        });
      });
      return a;
    }
  },
  methods: {
    /**
     * @method clear
     * @param no
     * @returns 商品类表中的count都归为0
     * @desc 通过购物车shopCard组件点击clear方法触发的这个来清除goods里面foods.count 的值
     */
    clear() {
      this.goods.map((item, index) => {
        item.foods.map((item1, index1) => {
          if (item1.count) {
            this.$set(item1, (item1.count = 0));
          }
        });
      });
    }
  },
  mounted() {
    this.$http.get("/sellers").then(res => {
      if (res.status === 200) {
        this.headerDataList = res.data.dataList[0];
        this.$store.commit("setSellers", this.headerDataList);
        this.deliveryPrice = this.headerDataList.deliveryPrice;
        this.minPrice = this.headerDataList.minPrice;
      } else console.log("/sellers 出错");
    });
    this.$http.get("/goods").then(res => {
      if (res.status === 200) {
        this.goods = res.data;
        this.$store.commit("setGoods", this.goods);
      }
    });
  }
};
</script>

<style lang="less">
@import "../src/common/less/reset.less";
@import "../src/common/less/font.less";
@import "../src/common/less/common.less";

.app {
  > .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    // .rounded-corners;
    .border-1px(rgba(7, 17, 27, 0.1));
    .tab_item {
      flex: 1;
      text-align: center;
      a {
        color: rgb(77, 85, 93);
        font-size: 14px;
        &.router-link-active,
        &.router-link-exact-active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
