<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-06 17:37:10
 * @LastEditTime: 2019-09-06 16:56:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="contorNum">
    <span class="num">
      <transition name="fade">
        <span class="icon delete icon-remove_circle_outline" v-if="food.count>0" @click="remove()"></span>
      </transition>
      <span class="text" v-if="food.count>0">{{food.count}}</span>
      <span class="icon add icon-add_circle" @click="add()"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: "contorNum",
  props: ["food"],
  data() {
    return {
      ids: 0
    };
  },
  components: {},
  computed: {},
  methods: {
    /**
     * @method add
     * @returns
     * @desc 通过传来的商品，没有count的就添加，有的就++
     */
    add() {
      if (!this.food.count) {
        this.$set(this.food, "count", 1);
      } else {
        this.$set(this.food, this.food.count++);
      }
    },
    /**
     * @method remove
     * @returns
     * @desc 通过传来的商品--
     */
    remove() {
      this.$set(this.food, this.food.count--);
      if (this.food.count <= 0) {
        this.$emit("clearShopList");
      }
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
@import "../../common/less/common.less";
.contorNum {
  .num {
    display: flex;
    align-items: center;
    .fade-enter,
    .fade-enter-to {
      opacity: 0;
    }
    .fade-enter-to,
    .fade-leave {
      opacity: 0.6;
      transform: translateX(-5px);
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: all 0.3s ease;
    }
    .icon {
      font-size: 24px;
      color: rgb(0, 160, 220);
      line-height: 24px;
    }
    .text {
      display: inline-block;
      width: 24px;
      font-size: 10px;
      color: rgb(147, 153, 159);
      text-align: center;
    }
  }
}
</style>
