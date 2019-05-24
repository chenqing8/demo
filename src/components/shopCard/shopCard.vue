<template>
  <div class="shopCard">
    <!-- 购物车标志 -->
    <div class="outCard">
      <div class="inCard">
        <span class="icon-shopping_cart"></span>
      </div>
    </div>
    <!-- 金额 -->
    <div class="moeny">
      <span class="total">¥0</span>
      <span class="mark">另需配送费¥{{deliveryPrice}}元</span>
    </div>
    <!-- button -->
    <div class="button">¥{{minPrice}}起送</div>
  </div>
</template>

<script>
export default {
  name: "shopCard",
  props: ["deliveryPrice", "minPrice"],
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
.shopCard {
  height: 47px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #141d27;
  display: flex;
  font-size: 0;
  //   购物车标志
  .outCard {
    position: absolute;
    bottom: 4px;
    left: 12px;
    width: 57px;
    height: 57px;
    background-color: #141d27;
    border-radius: 50%;
    display: flex;
    .inCard {
      display: flex;
      margin: auto;
      width: 44px;
      height: 44px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      .icon-shopping_cart {
        margin: auto;
        font-size: 24px;
        color: rgba(255, 255, 255, 0.4);
        line-height: 28px;
      }
    }
  }
  //   moeny
  .moeny {
    flex: 1;
    padding-left: 80px;
    margin: 12px 0;
    margin-right: 12px;
    // margin: auto;
    color: rgba(255, 255, 255, 0.4);
    line-height: 24px;
    .mark {
      font-size: 16px;
      display: inline-block;
      padding-left: 12px;
    }
    .total {
      font-size: 16px;
      font-weight: 700;
      display: inline-block;
      padding-right: 12px;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
  // button
  .button {
    width: 105px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    padding: 11px 8px;
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
  }
}
</style>
