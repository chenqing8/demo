<template>
  <div class="app">
    <v-header :headerData="headerDataList"></v-header>
    <div class="tab border-1px">
      <div class="tab_item">
        <router-link tag="a" :to="{name:'commodity'}">商品</router-link>
      </div>
      <div class="tab_item">
        <router-link tag="a" :to="{name:'pinglun'}">评论</router-link>
      </div>
      <div class="tab_item">
        <router-link tab="a" :to="{name:'Merchant'}">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/header/header";
export default {
  name: "app",
  data() {
    return {
      name: 154,
      headerDataList: []
    };
  },
  components: {
    "v-header": Header
  },
  computed: {},
  methods: {},
  mounted() {
    this.$http.get("/sellers").then(res => {
      if (res.status === 200) {
        this.headerDataList = res.data.dataList[0];
      } else console.log("/sellers 出错");
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
}
</style>
